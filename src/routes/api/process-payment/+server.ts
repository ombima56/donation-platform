import { json } from '@sveltejs/kit';
import { initiateMpesaPayment, hashPhoneNumber } from '$lib/server/mpesa';
import { getDb } from '$lib/server/database';
import { randomUUID } from 'crypto';

export async function POST({ request }) {
  try {
    const requestData = await request.json();
    console.log('Received payment request data:', requestData);
    
    const { amount, phone, projectId, isAnonymous } = requestData;
    
    // Log each field for debugging
    console.log('Amount:', amount, 'Type:', typeof amount);
    console.log('Phone:', phone, 'Type:', typeof phone);
    console.log('ProjectId:', projectId, 'Type:', typeof projectId);
    console.log('IsAnonymous:', isAnonymous, 'Type:', typeof isAnonymous);
    
    // Validate input with detailed error messages
    if (!amount) {
      console.log('Validation failed: Amount is missing');
      return json({ error: 'Amount is required' }, { status: 400 });
    }
    
    if (typeof amount !== 'number' || amount < 10) {
      console.log('Validation failed: Amount is invalid or less than 10');
      return json({ error: 'Amount must be at least 10' }, { status: 400 });
    }
    
    if (!phone || typeof phone !== 'string' || phone.trim() === '') {
      console.log('Validation failed: Phone number is invalid');
      return json({ error: 'Valid phone number is required' }, { status: 400 });
    }
    
    if (!projectId || typeof projectId !== 'string' || projectId.trim() === '') {
      console.log('Validation failed: Project ID is invalid');
      return json({ error: 'Valid project ID is required' }, { status: 400 });
    }
    
    console.log('All validations passed, initiating M-Pesa payment...');
    
    // Initiate M-Pesa payment
    const mpesaResponse = await initiateMpesaPayment(amount, phone, projectId);
    console.log('M-Pesa response:', mpesaResponse);
    
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
      
      console.log('Donation record created successfully');
      
      return json({ 
        success: true, 
        transactionId: donationId,
        checkoutRequestID: mpesaResponse.CheckoutRequestID
      });
    } else {
      console.log('M-Pesa payment initiation failed:', mpesaResponse);
      return json({ 
        error: 'Payment initiation failed', 
        details: mpesaResponse.ResponseDescription 
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    return json({ 
      error: 'Payment processing failed', 
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}
