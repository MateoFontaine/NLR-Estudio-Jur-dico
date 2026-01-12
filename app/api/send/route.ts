import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { nombre, telefono, rama, consulta, metodoContacto } = data;

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
      },
    });

    // --- DISEÑO DEL EMAIL ---
    const htmlTemplate = `
      <div style="background-color: #f1f5f9; padding: 40px 20px; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <div style="background-color: #172554; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">NLR</h1>
            <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 3px;">Novelli & Lubrano</p>
          </div>

          <div style="padding: 30px; color: #334155;">
            <h2 style="color: #172554; margin-top: 0; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
              Nueva Consulta Web
            </h2>
            
            <div style="margin-top: 20px;">
              <p style="margin: 10px 0;"><strong> Nombre:</strong> ${nombre}</p>
              <p style="margin: 10px 0;"><strong> Teléfono:</strong> ${telefono}</p>
              <p style="margin: 10px 0;"><strong> Rama:</strong> <span style="background-color: #eff6ff; color: #1e40af; padding: 2px 8px; border-radius: 4px; font-size: 14px;">${rama}</span></p>
              <p style="margin: 10px 0;"><strong> Preferencia:</strong> ${metodoContacto}</p>
            </div>

            <div style="background-color: #f8fafc; border-left: 4px solid #172554; padding: 15px; margin-top: 20px; font-style: italic;">
              "${consulta}"
            </div>
          </div>

          <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">Este mensaje fue enviado automáticamente desde <strong>nlrestudiojuridico.com.ar</strong></p>
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Web NLR" <${process.env.ZOHO_EMAIL}>`,
      to: 'contacto@nlrestudiojuridico.com.ar',
      subject: `⚖️ ${rama}: ${nombre}`, // Le agregué un emoji al asunto para que destaque
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Enviado con éxito' }, { status: 200 });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json({ message: 'Error al enviar' }, { status: 500 });
  }
}