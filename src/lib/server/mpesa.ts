// lib/mpesa.ts
import crypto from 'crypto';
import {
	MPESA_CONSUMER_KEY,
	MPESA_CONSUMER_SECRET,
	MPESA_PASSKEY,
	MPESA_SHORTCODE,
	MPESA_CALLBACK_URL
} from '$env/static/private';

// Validate M-Pesa environment variables
function validateMpesaConfig() {
	const errors = [];

	if (!MPESA_CONSUMER_KEY) {
		errors.push('MPESA_CONSUMER_KEY is missing');
	} else if (MPESA_CONSUMER_KEY.length < 20) {
		errors.push('MPESA_CONSUMER_KEY appears to be invalid (too short)');
	}

	if (!MPESA_CONSUMER_SECRET) {
		errors.push('MPESA_CONSUMER_SECRET is missing');
	} else if (MPESA_CONSUMER_SECRET.length < 20) {
		errors.push('MPESA_CONSUMER_SECRET appears to be invalid (too short)');
	}

	if (!MPESA_SHORTCODE) {
		errors.push('MPESA_SHORTCODE is missing');
	} else if (!/^\d{5,7}$/.test(MPESA_SHORTCODE)) {
		errors.push('MPESA_SHORTCODE must be 5-7 digits');
	}

	if (!MPESA_PASSKEY) {
		errors.push('MPESA_PASSKEY is missing');
	} else if (MPESA_PASSKEY.length !== 64) {
		errors.push('MPESA_PASSKEY must be exactly 64 characters');
	}

	if (!MPESA_CALLBACK_URL) {
		errors.push('MPESA_CALLBACK_URL is missing');
	} else if (!MPESA_CALLBACK_URL.startsWith('https://')) {
		errors.push('MPESA_CALLBACK_URL must use HTTPS');
	}

	if (errors.length > 0) {
		console.error('❌ M-Pesa configuration errors:');
		errors.forEach((error) => console.error(`  - ${error}`));
		throw new Error(`M-Pesa configuration invalid: ${errors.join(', ')}`);
	}

	console.log('✅ M-Pesa configuration validated successfully');
}

// Generate auth token
export async function getAuthToken() {
	// Validate configuration first
	validateMpesaConfig();

	const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');

	const response = await fetch(
		'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
		{
			method: 'GET',
			headers: {
				Authorization: `Basic ${auth}`
			}
		}
	);

	const text = await response.text();
	let data;
	try {
		data = JSON.parse(text);
	} catch {
		throw new Error(`Invalid JSON response: ${text}`);
	}

	if (!response.ok || !data.access_token) {
		throw new Error(
			`Authentication failed: ${data.error_description || data.errorMessage || text}`
		);
	}

	return data.access_token;
}

// Timestamp generator
function getTimestamp() {
	const now = new Date();
	return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
}

// Password generator
function generatePassword(timestamp: string) {
	const data = `${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`;
	return Buffer.from(data).toString('base64');
}

// Validate phone number format
function validatePhoneNumber(phoneNumber: string): string {
	// Remove any spaces, dashes, or other non-digit characters except +
	const cleaned = phoneNumber.replace(/[^\d+]/g, '');

	// Convert to 254 format
	let formatted = cleaned;
	if (formatted.startsWith('0')) {
		formatted = '254' + formatted.substring(1);
	} else if (formatted.startsWith('+254')) {
		formatted = formatted.substring(1);
	} else if (!formatted.startsWith('254')) {
		// Assume it's a Kenyan number without country code
		formatted = '254' + formatted;
	}

	// Validate the final format
	if (!/^254[17]\d{8}$/.test(formatted)) {
		throw new Error(
			'Invalid phone number. Must be a valid Kenyan mobile number (07xxxxxxxx or 01xxxxxxxx)'
		);
	}

	return formatted;
}

// Main function to initiate payment
export async function initiateMpesaPayment(amount: number, phoneNumber: string, projectId: string) {
	// Validate inputs
	if (!amount || amount < 1) {
		throw new Error('Amount must be at least KES 1');
	}

	if (amount > 150000) {
		throw new Error('Amount cannot exceed KES 150,000 per transaction');
	}

	const token = await getAuthToken();
	const timestamp = getTimestamp();
	const password = generatePassword(timestamp);
	const formattedPhone = validatePhoneNumber(phoneNumber);

	const requestBody = {
		BusinessShortCode: MPESA_SHORTCODE,
		Password: password,
		Timestamp: timestamp,
		TransactionType: 'CustomerPayBillOnline',
		Amount: amount,
		PartyA: formattedPhone,
		PartyB: MPESA_SHORTCODE,
		PhoneNumber: formattedPhone,
		CallBackURL: MPESA_CALLBACK_URL,
		AccountReference: `Donation-${projectId}`,
		TransactionDesc: 'Donation'
	};

	const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestBody)
	});

	const responseData = await response.json();

	if (!response.ok) {
		throw new Error(`STK Push request failed: ${JSON.stringify(responseData)}`);
	}

	if (responseData.ResponseCode !== '0') {
		throw new Error(`STK Push failed: ${responseData.ResponseDescription}`);
	}

	return responseData;
}

// Hash phone number for privacy
export function hashPhoneNumber(phoneNumber: string) {
	return crypto.createHash('sha256').update(phoneNumber).digest('hex');
}
