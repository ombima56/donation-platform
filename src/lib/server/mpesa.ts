import crypto from 'crypto';
import { MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_PASSKEY, MPESA_SHORTCODE } from '$env/static/private';

// Generate auth token
async function getAuthToken() {
  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
  
  const response = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`
    }
  });
  
  const data = await response.json();
  return data.access_token;
}

// Generate timestamp
function getTimestamp() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}${hour}${minute}${second}`;
}

// Generate password
function generatePassword(timestamp: string) {
  const data = `${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`;
  return Buffer.from(data).toString('base64');
}

export async function initiateMpesaPayment(amount: number, phoneNumber: string, projectId: string) {
  try {
    const token = await getAuthToken();
    const timestamp = getTimestamp();
    const password = generatePassword(timestamp);
    
    // Format phone number (remove leading 0 or +)
    const formattedPhone = phoneNumber.replace(/^(0|\+254)/, '254');
    
    const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        BusinessShortCode: MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: MPESA_SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: `https://your-domain.com/api/mpesa-callback`,
        AccountReference: `Donation-${projectId}`,
        TransactionDesc: 'Donation'
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('M-Pesa payment error:', error);
    throw new Error('Failed to initiate M-Pesa payment');
  }
}

// Hash phone number for privacy
export function hashPhoneNumber(phoneNumber: string) {
  return crypto.createHash('sha256').update(phoneNumber).digest('hex');
}