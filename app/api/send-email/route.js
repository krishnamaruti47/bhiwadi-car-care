import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, phone, carModel, service } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'Service@krishnamaruti.co.in', // Sending to yourself
      subject: `🚗 New Booking: ${name} (${service})`,
      text: `
        NEW LEAD ALERT!
        
        Name: ${name}
        Phone: ${phone}
        Car: ${carModel}
        Service Interested: ${service}
        
        Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
        
        (This person clicked "Continue to WhatsApp". Check if they sent a message. If not, CALL THEM!)
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}