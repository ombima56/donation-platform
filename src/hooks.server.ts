import { getDb } from '$lib/server/database';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Initialize user as null
  event.locals.user = null;
  
  const sessionId = event.cookies.get('session_id');
  
  if (sessionId) {
    const db = await getDb();
    
    // Check if session exists and is not expired
    const session = await db.get(`
      SELECT * FROM sessions 
      WHERE id = ? AND expires_at > datetime('now')
    `, sessionId);
    
    if (session) {
      const user = await db.get('SELECT id, email FROM admin_users WHERE id = ?', session.user_id);
      if (user) {
        event.locals.user = {
          id: user.id,
          email: user.email
        };
      }
    } else {
      // Clear invalid session cookie
      event.cookies.delete('session_id', { path: '/' });
    }
  }
  
  return resolve(event);
};
