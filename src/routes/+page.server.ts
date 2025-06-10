import { getDb } from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const db = await getDb();
  const projects = await db.all('SELECT * FROM projects WHERE is_active = 1');
  
  return {
    projects
  };
};