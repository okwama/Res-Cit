// pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/utils/connect";
import bcrypt from 'bcrypt';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, phoneNumber } = req.body;

    // Basic validation
    if (!email || !password || !phoneNumber) {
      return res.status(400).json({ message: 'Email, password, and phone number are required.' });
    }

    // Check if user already exists
    const existingUser   = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser  ) {
      return res.status(409).json({ message: 'User  already exists.' });
    }

    // Check if phone number already exists
    const existingPhoneUser  = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (existingPhoneUser ) {
      return res.status(409).json({ message: 'Phone number is already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          phoneNumber, // Store the phone number
        },
      });
      console.log("User  created:", user); // Log the created user

      // Optionally, you can return the user data or a success message
      return res.status(201).json({ user: { email: user.email, phoneNumber: user.phoneNumber } }); // Don't return the password
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }

  // Method not allowed
  return res.status(405).json({ message: 'Method not allowed' });
}