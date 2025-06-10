import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  // Skip auth check for login page
  if (url.pathname === '/admin/login') {
    return {};
  }
  
  // Check if user is authenticated
  if (!locals.user) {
    throw redirect(303, '/admin/login');
  }
  
  return {
    user: locals.user
  };
};
