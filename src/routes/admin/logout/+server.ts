import { redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/database';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, locals }) => {
  const sessionId = cookies.get('session_id');
  
  if (sessionId) {
    // Delete session from database
    const db = await getDb();
    await db.run('DELETE FROM sessions WHERE id = ?', sessionId);
    
    // Clear cookie
    cookies.delete('session_id', { path: '/' });
  }
  
  throw redirect(303, '/admin/login');
};