import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../db';
import { appointments } from '../db/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const allAppointments = await db.select().from(appointments);
      return res.status(200).json(allAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, email, phone, date, time, service, notes } = req.body;
      const newAppointment = await db.insert(appointments).values({
        name,
        email,
        phone,
        date: new Date(date),
        time,
        service,
        notes,
      }).returning();
      return res.status(201).json(newAppointment[0]);
    } catch (error) {
      console.error('Error creating appointment:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
