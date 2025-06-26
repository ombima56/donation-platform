import { getDb } from '../src/lib/server/database.ts';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

async function seedAdmin() {
	try {
		const db = await getDb();

		// Check if admin user already exists
		const existingAdmin = await db.get('SELECT * FROM admin_users LIMIT 1');

		if (existingAdmin) {
			console.log('Admin user already exists');
			return;
		}

		// Create admin user
		const id = randomUUID();
		const email = 'admin@example.com';
		const password = 'admin123'; // Change this in production!
		const passwordHash = await bcrypt.hash(password, 10);

		await db.run(
			`INSERT INTO admin_users (id, email, password_hash, created_at)
       VALUES (?, ?, ?, ?)`,
			[id, email, passwordHash, new Date().toISOString()]
		);

		console.log(`Admin user created: ${email}`);
		console.log('Please change the password after first login!');
	} catch (error) {
		console.error('Error seeding admin user:', error);
	} finally {
		process.exit(0);
	}
}

seedAdmin();
