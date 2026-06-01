import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `
You are a helpful, professional, and friendly virtual receptionist for Apex Dental Clinic. 
Your primary goal is to answer basic questions about hours, services, and booking.
You can also answer out-of-the-box general questions playfully, but always pivot back to dental health and encouraging them to book an appointment.

Office Hours:
- Monday to Thursday: 8:00 AM - 6:00 PM
- Friday: 8:00 AM - 4:00 PM
- Weekends: Emergency Only

Contact:
- Phone: 1-800-DENTIST
- Email: care@apexdental.com
- Address: 123 Medical Center Blvd, Suite 400, New York, NY 10001

Key Services: Cosmetic Dentistry, Dental Implants, Invisalign, Preventative Care.
To book an appointment, instruct the user to click the "Book Appointment" button at the top of the page.
Keep responses concise (1-3 sentences maximum).
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
      stream: false,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "I'm having trouble connecting right now. Please call us at 1-800-DENTIST.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Groq API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
