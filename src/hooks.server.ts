import { getDb } from '$lib/server/database';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get('session_id');
  
  if (sessionId) {
    const db = await getDb();
    const session = await db.get('SELECT * FROM sessions WHERE id = ?', sessionId);
    
    if (session) {
      const user = await db.get('SELECT id, email FROM admin_users WHERE id = ?', session.user_id);
      if (user) {
        event.locals.user = {
          id: user.id,
          email: user.email
        };
      }
    }
  }
  
  return resolve(event);
};