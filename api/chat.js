"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const groq = new groq_sdk_1.default({
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
async function handler(req, res) {
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
            ...history.map((msg) => ({
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
    }
    catch (error) {
        console.error('Groq API Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
