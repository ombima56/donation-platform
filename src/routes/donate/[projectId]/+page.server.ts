import { getDb } from '$lib/server/database';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const db = await getDb();
  
  const project = await db.get('SELECT * FROM projects WHERE id = ?', params.projectId);
  
  if (!project) {
    throw error(404, 'Project not found');
  }
  
  return {
    project
  };
};