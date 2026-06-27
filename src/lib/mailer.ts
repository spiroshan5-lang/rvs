import nodemailer from 'nodemailer';
import { escapeHtml } from './validation';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendInquiryEmail(data: {
  name: string;
  email: string;
  phone: string;
  budget: string;
  service: string;
  location: string;
  message: string;
  submittedAt: string;
}) {
  // Sanitize ALL user inputs before inserting into HTML
  const safe = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    phone: escapeHtml(data.phone),
    budget: escapeHtml(data.budget),
    service: escapeHtml(data.service),
    location: escapeHtml(data.location),
    message: escapeHtml(data.message),
    submittedAt: escapeHtml(data.submittedAt),
  };

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #faf8f4; border: 1px solid #e8dcc8; border-radius: 12px; overflow: hidden;">
      <div style="background: #1a1208; padding: 28px 32px;">
        <h1 style="color: #c9a86a; margin: 0; font-size: 22px; font-weight: 400; letter-spacing: 2px;">RVS CRAFT INTERIORS</h1>
        <p style="color: #8a7a5a; margin: 6px 0 0; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">New Client Inquiry</p>
      </div>
      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dcc8; width: 130px;">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #9a8a6a;">Full Name</span>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dcc8;">
              <strong style="color: #1a1208; font-size: 15px;">${safe.name}</strong>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dcc8;">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #9a8a6a;">Email</span>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dcc8;">
              <a href="mailto:${safe.email}" style="color: #c9a86a; text-decoration: none;">${safe.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dcc8;">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #9a8a6a;">Phone</span>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dcc8;">
              <a href="tel:${safe.phone}" style="color: #1a1208;">${safe.phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dcc8;">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #9a8a6a;">Location</span>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dcc8; color: #1a1208;">${safe.location}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dcc8;">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #9a8a6a;">Service</span>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dcc8; color: #1a1208; font-size: 14px;">
              ${safe.service}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dcc8;">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #9a8a6a;">Budget</span>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dcc8;">
              <span style="background: #c9a86a20; color: #8a6a2a; padding: 3px 10px; border-radius: 20px; font-size: 13px; border: 1px solid #c9a86a50;">${safe.budget}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dcc8;">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #9a8a6a;">Submitted</span>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dcc8; color: #6a5a4a; font-size: 13px;">${new Date(data.submittedAt).toLocaleString('en-IN')}</td>
          </tr>
        </table>
        <div style="margin-top: 24px;">
          <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #9a8a6a; margin-bottom: 10px;">Message</p>
          <div style="background: #fff; border: 1px solid #e8dcc8; border-left: 3px solid #c9a86a; border-radius: 6px; padding: 16px; color: #2a1e0e; font-size: 14px; line-height: 1.7;">
            ${safe.message}
          </div>
        </div>
        <div style="margin-top: 28px; text-align: center;">
          <a href="mailto:${safe.email}?subject=Re: Your Interior Design Inquiry - RVS Craft Interiors"
             style="display: inline-block; background: #c9a86a; color: #0B0B0B; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">
            Reply to ${safe.name}
          </a>
        </div>
      </div>
      <div style="background: #f0ebe0; padding: 16px 32px; text-align: center;">
        <p style="color: #9a8a6a; font-size: 11px; margin: 0; letter-spacing: 1px;">RVS Craft Interiors &middot; rvscraftinteriors.com</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"RVS Craft Interiors" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL || 'spiroshan5@gmail.com',
    subject: 'New ' + safe.service + ' Inquiry from ' + safe.name + ' - ' + safe.budget + ' Budget',
    html,
    replyTo: data.email,
  });
}
