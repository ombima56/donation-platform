import { getDb } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' };
    }
    
    const db = await getDb();
    const user = await db.get('SELECT * FROM admin_users WHERE email = ?', email);
    
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    
    if (!passwordMatch) {
      return { success: false, message: 'Invalid email or password' };
    }
    
    // Create session
    const sessionId = randomUUID();
    await db.run(
      'INSERT INTO sessions (id, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)',
      [
        sessionId,
        user.id,
        new Date().toISOString(),
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
      ]
    );
    
    // Set session cookie
    cookies.set('session_id', sessionId, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    
    throw redirect(303, '/admin');
  }
};