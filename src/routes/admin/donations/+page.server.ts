import { getDb } from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const db = await getDb();
  
  // Get query parameters for filtering
  const projectId = url.searchParams.get('project');
  const minAmount = url.searchParams.get('min');
  const maxAmount = url.searchParams.get('max');
  const sortBy = url.searchParams.get('sort') || 'date';
  const sortOrder = url.searchParams.get('order') || 'desc';
  
  // Build the query
  let query = `
    SELECT 
      d.id, 
      d.amount, 
      d.donation_date, 
      d.is_anonymous, 
      d.mpesa_receipt_number,
      p.id as project_id, 
      p.title as project_title
    FROM donations d
    JOIN projects p ON d.project_id = p.id
  `;
  
  const queryParams = [];
  const whereConditions = [];
  
  // Add filters
  if (projectId) {
    whereConditions.push('d.project_id = ?');
    queryParams.push(projectId);
  }
  
  if (minAmount) {
    whereConditions.push('d.amount >= ?');
    queryParams.push(parseFloat(minAmount));
  }
  
  if (maxAmount) {
    whereConditions.push('d.amount <= ?');
    queryParams.push(parseFloat(maxAmount));
  }
  
  if (whereConditions.length > 0) {
    query += ' WHERE ' + whereConditions.join(' AND ');
  }
  
  // Add sorting
  if (sortBy === 'amount') {
    query += ` ORDER BY d.amount ${sortOrder === 'asc' ? 'ASC' : 'DESC'}`;
  } else {
    query += ` ORDER BY d.donation_date ${sortOrder === 'asc' ? 'ASC' : 'DESC'}`;
  }
  
  // Execute the query
  const donations = await db.all(query, queryParams);
  
  // Get all projects for the filter dropdown
  const projects = await db.all('SELECT id, title FROM projects ORDER BY title ASC');
  
  // Get summary statistics
  const stats = await db.get('SELECT COUNT(*) as count, SUM(amount) as total FROM donations');
  
  return {
    donations,
    projects,
    stats,
    filters: {
      projectId,
      minAmount,
      maxAmount,
      sortBy,
      sortOrder
    }
  };
};