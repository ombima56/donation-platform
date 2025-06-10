import { getDb } from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const db = await getDb();
  
  // Get summary statistics
  const totalProjects = await db.get('SELECT COUNT(*) as count FROM projects');
  const activeProjects = await db.get('SELECT COUNT(*) as count FROM projects WHERE is_active = 1');
  const totalDonations = await db.get('SELECT COUNT(*) as count FROM donations');
  const totalAmount = await db.get('SELECT SUM(amount) as total FROM donations');
  
  // Get recent donations
  const recentDonations = await db.all(`
    SELECT d.id, d.amount, d.donation_date, d.is_anonymous, p.title as project_title
    FROM donations d
    JOIN projects p ON d.project_id = p.id
    ORDER BY d.donation_date DESC
    LIMIT 5
  `);
  
  return {
    stats: {
      totalProjects: totalProjects.count,
      activeProjects: activeProjects.count,
      totalDonations: totalDonations.count,
      totalAmount: totalAmount.total || 0
    },
    recentDonations
  };
};