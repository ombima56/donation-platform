import { json } from '@sveltejs/kit';
import { initiateMpesaPayment, hashPhoneNumber } from '$lib/server/mpesa';
import { getDb } from '$lib/server/database';
import { randomUUID } from 'crypto';

export async function POST({ request }) {
	try {
		const requestData = await request.json();
		const { amount, phone, projectId, isAnonymous } = requestData;

		// Validate input
		if (!amount) {
			return json({ error: 'Amount is required' }, { status: 400 });
		}

		if (typeof amount !== 'number' || amount < 10) {
			return json({ error: 'Amount must be at least 10' }, { status: 400 });
		}

		if (!phone || typeof phone !== 'string' || phone.trim() === '') {
			return json({ error: 'Valid phone number is required' }, { status: 400 });
		}

		if (!projectId || typeof projectId !== 'string' || projectId.trim() === '') {
			return json({ error: 'Valid project ID is required' }, { status: 400 });
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
			return json(
				{
					error: 'Payment initiation failed',
					details: mpesaResponse.ResponseDescription
				},
				{ status: 400 }
			);
		}
	} catch (error) {
		return json(
			{
				error: 'Payment processing failed',
				details: error instanceof Error ? error.message : 'Unknown error occurred'
			},
			{ status: 500 }
		);
	}
}
