import { getDb } from '$lib/server/database';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const transactionId = url.searchParams.get('txn');
  
  if (!transactionId) {
    throw error(400, 'Transaction ID is required');
  }
  
  const db = await getDb();
  
  const donation = await db.get(`
    SELECT d.*, p.title as project_title 
    FROM donations d
    JOIN projects p ON d.project_id = p.id
    WHERE d.id = ?
  `, transactionId);
  
  if (!donation) {
    throw error(404, 'Donation not found');
  }
  
  return {
    donation
  };
};