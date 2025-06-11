// lib/mpesa.ts
import crypto from 'crypto';
import { MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_PASSKEY, MPESA_SHORTCODE } from '$env/static/private';

// Generate auth token
export async function getAuthToken() {
  if (!MPESA_CONSUMER_KEY || !MPESA_CONSUMER_SECRET) {
    throw new Error('M-Pesa credentials not found in environment variables');
  }

  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');

  const response = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`
    }
  });

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON response: ${text}`);
  }

  if (!response.ok || !data.access_token) {
    throw new Error(`Authentication failed: ${data.error_description || data.errorMessage || text}`);
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

// Main function to initiate payment
export async function initiateMpesaPayment(amount: number, phoneNumber: string, projectId: string) {
  const token = await getAuthToken();
  const timestamp = getTimestamp();
  const password = generatePassword(timestamp);
  const formattedPhone = phoneNumber.replace(/^(0|\+254)/, '254');

  const requestBody = {
    BusinessShortCode: MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: formattedPhone,
    PartyB: MPESA_SHORTCODE,
    PhoneNumber: formattedPhone,
    CallBackURL: `https://likely-true-panther.ngrok-free.app/callback`,
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

  return responseData;
}

// Optional: hash phone number for privacy
export function hashPhoneNumber(phoneNumber: string) {
  return crypto.createHash('sha256').update(phoneNumber).digest('hex');
}
