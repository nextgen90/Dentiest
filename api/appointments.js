"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const allAppointments = await db_1.db.select().from(schema_1.appointments);
            return res.status(200).json(allAppointments);
        }
        catch (error) {
            console.error('Error fetching appointments:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    if (req.method === 'POST') {
        try {
            const { name, email, phone, date, time, service, notes } = req.body;
            const newAppointment = await db_1.db.insert(schema_1.appointments).values({
                name,
                email,
                phone,
                date: new Date(date),
                time,
                service,
                notes,
            }).returning();
            return res.status(201).json(newAppointment[0]);
        }
        catch (error) {
            console.error('Error creating appointment:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    return res.status(405).json({ error: 'Method Not Allowed' });
}
