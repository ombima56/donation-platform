import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/database';

export async function GET({ params }) {
  const projectId = params.projectId;
  
  try {
    const db = await getDb();
    
    // Get the sum of all donations for this project
    const result = await db.get(
      'SELECT SUM(amount) as totalAmount FROM donations WHERE project_id = ?',
      [projectId]
    );
    
    // Return the total amount (or 0 if no donations)
    return json({
      totalAmount: result?.totalAmount || 0
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return json({ error: 'Failed to fetch donations' }, { status: 500 });
  }
}