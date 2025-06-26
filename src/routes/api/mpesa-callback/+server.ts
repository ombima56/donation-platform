import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/database';

export async function POST({ request }) {
	try {
		const data = await request.json();

		// Extract the callback data
		const { Body } = data;

		if (!Body || !Body.stkCallback) {
			return json({ success: false, error: 'Invalid callback structure' }, { status: 400 });
		}

		const { stkCallback } = Body;

		if (stkCallback.ResultCode === 0) {
			// Payment successful
			const callbackMetadata = stkCallback.CallbackMetadata?.Item;

			if (!callbackMetadata) {
				return json({ success: false, error: 'Missing callback metadata' }, { status: 400 });
			}

			// Extract metadata
			const amount = callbackMetadata.find(
				(item: { Name: string; Value: any }) => item.Name === 'Amount'
			)?.Value;
			const mpesaReceiptNumber = callbackMetadata.find(
				(item: { Name: string; Value: any }) => item.Name === 'MpesaReceiptNumber'
			)?.Value;

			// Extract the project ID from the account reference
			const accountReference = callbackMetadata.find(
				(item: { Name: string; Value: any }) => item.Name === 'AccountReference'
			)?.Value;

			if (!accountReference) {
				return json({ success: false, error: 'Missing account reference' }, { status: 400 });
			}

			const projectId = accountReference.replace('Donation-', '');

			// Update the donation record
			const db = await getDb();

			// Find the pending donation by project ID
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
			return json({ success: false, error: stkCallback.ResultDesc });
		}
	} catch (error) {
		return json({ success: false, error: 'Internal server error' }, { status: 500 });
	}
}
