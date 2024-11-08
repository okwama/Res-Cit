import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from '@/utils/db'; // Adjust the path according to your structure
import bcrypt from 'bcrypt';

// Named export for POST method
export async function POST(req: Request) {
  const { email, password, phoneNumber } = await req.json();

  // Basic validation
  if (!email || !password || !phoneNumber) {
    return new Response(JSON.stringify({ message: 'Email, password, and phone number are required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const connection = await getConnection();

  try {
    // Check if user already exists
    const [existingUsers]: [any[], any] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);

    if (existingUsers.length > 0) {
      return new Response(JSON.stringify({ message: 'User  already exists.' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if phone number already exists
    const [existingPhoneUsers]: [any[], any] = await connection.execute('SELECT * FROM user WHERE phoneNumber = ?', [phoneNumber]);

    if (existingPhoneUsers.length > 0) {
      return new Response(JSON.stringify({ message: 'Phone number is already in use.' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    await connection.execute('INSERT INTO user (email, password, phoneNumber) VALUES (?, ?, ?)', [email, hashedPassword, phoneNumber]);

    // Return the user data without the password
    return new Response(JSON.stringify({ user: { email, phoneNumber } }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(JSON.stringify({ message: 'Internal server error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    // Use release instead of end to return the connection to the pool
    await connection.release();
  }
}

// You can also define other HTTP methods like GET, PUT, DELETE, etc. as needed