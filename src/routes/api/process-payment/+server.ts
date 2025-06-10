import { json } from '@sveltejs/kit';
import { initiateMpesaPayment, hashPhoneNumber } from '$lib/server/mpesa';
import { getDb } from '$lib/server/database';
import { randomUUID } from 'crypto';

export async function POST({ request }) {
  const { amount, phone, projectId, isAnonymous } = await request.json();
  
  try {
    // Validate input
    if (!amount || amount < 10 || !phone || !projectId) {
      return json({ error: 'Invalid input' }, { status: 400 });
    }
    
    // Initiate M-Pesa payment
    const mpesaResponse = await initiateMpesaPayment(amount, phone, projectId);
    
    if (mpesaResponse.ResponseCode === '0') {
      // Create pending donation record
      const db = await getDb();
      const donationId = randomUUID();
      
      await db.run(
        `INSERT INTO donations (
          id, project_id, amount, mpesa_receipt_number, 
          phone_number_hash, donation_date, is_anonymous
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          donationId,
          projectId,
          amount,
          null, // Receipt number will be updated in callback
          hashPhoneNumber(phone),
          new Date().toISOString(),
          isAnonymous ? 1 : 0
        ]
      );
      
      return json({ 
        success: true, 
        transactionId: donationId,
        checkoutRequestID: mpesaResponse.CheckoutRequestID
      });
    } else {
      return json({ 
        error: 'Payment initiation failed', 
        details: mpesaResponse.ResponseDescription 
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    return json({ error: 'Payment processing failed' }, { status: 500 });
  }
}