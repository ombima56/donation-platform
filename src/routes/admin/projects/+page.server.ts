import { getDb } from '$lib/server/database';
import { randomUUID } from 'crypto';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  const db = await getDb();
  const projects = await db.all('SELECT * FROM projects ORDER BY created_at DESC');
  
  return {
    projects
  };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get('title')?.toString();
    const description = formData.get('description')?.toString();
    const imageUrl = formData.get('imageUrl')?.toString();
    const targetAmount = Number(formData.get('targetAmount'));
    
    if (!title || !description || !targetAmount) {
      return { success: false, message: 'Missing required fields' };
    }
    
    try {
      const db = await getDb();
      const id = randomUUID();
      
      await db.run(
        `INSERT INTO projects (
          id, title, description, image_url, target_amount, created_at, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          title,
          description,
          imageUrl || null,
          targetAmount,
          new Date().toISOString(),
          1 // Active by default
        ]
      );
      
      return { success: true };
    } catch (error) {
      console.error('Error creating project:', error);
      return { success: false, message: 'Failed to create project' };
    }
  },
  
  toggleActive: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id')?.toString();
    const isActive = formData.get('isActive') === '1';
    
    if (!id) {
      return { success: false, message: 'Project ID is required' };
    }
    
    try {
      const db = await getDb();
      await db.run(
        'UPDATE projects SET is_active = ? WHERE id = ?',
        [isActive ? 0 : 1, id]
      );
      
      return { success: true };
    } catch (error) {
      console.error('Error toggling project status:', error);
      return { success: false, message: 'Failed to update project' };
    }
  }
};