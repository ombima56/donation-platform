import { getDb } from '$lib/server/database';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const db = await getDb();
  
  const project = await db.get('SELECT * FROM projects WHERE id = ?', params.id);
  
  if (!project) {
    throw error(404, 'Project not found');
  }
  
  const donations = await db.all(
    'SELECT amount, donation_date FROM donations WHERE project_id = ?',
    params.id
  );
  
  const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);
  
  return {
    project,
    donations,
    totalDonated
  };
};