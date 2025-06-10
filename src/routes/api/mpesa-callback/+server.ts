import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/database';

export async function POST({ request }) {
  try {
    const data = await request.json();
    
    // Extract the callback data
    const { Body } = data;
    
    if (Body.stkCallback.ResultCode === 0) {
      // Payment successful
      const callbackMetadata = Body.stkCallback.CallbackMetadata.Item;
      
      // Extract metadata
      const amount = callbackMetadata.find(item => item.Name === 'Amount')?.Value;
      const mpesaReceiptNumber = callbackMetadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
      const transactionDate = callbackMetadata.find(item => item.Name === 'TransactionDate')?.Value;
      const phoneNumber = callbackMetadata.find(item => item.Name === 'PhoneNumber')?.Value;
      
      // Extract the project ID from the account reference
      const accountReference = Body.stkCallback.CallbackMetadata.Item.find(item => item.Name === 'AccountReference')?.Value;
      const projectId = accountReference.replace('Donation-', '');
      
      // Update the donation record
      const db = await getDb();
      
      // Find the pending donation by phone number hash and project ID
      const pendingDonation = await db.get(
        `SELECT id FROM donations 
         WHERE project_id = ? AND mpesa_receipt_number IS NULL
         ORDER BY donation_date DESC LIMIT 1`,
        [projectId]
      );
      
      if (pendingDonation) {
        await db.run(
          `UPDATE donations 
           SET mpesa_receipt_number = ?, 
               amount = ? 
           WHERE id = ?`,
          [mpesaReceiptNumber, amount, pendingDonation.id]
        );
      }
      
      return json({ success: true });
    } else {
      // Payment failed
      console.error('M-Pesa payment failed:', Body.stkCallback.ResultDesc);
      return json({ success: false, error: Body.stkCallback.ResultDesc });
    }
  } catch (error) {
    console.error('Error processing M-Pesa callback:', error);
    return json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}