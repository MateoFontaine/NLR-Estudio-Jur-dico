import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Desestructuramos los datos que vienen del formulario
    const { nombre, telefono, rama, consulta, metodoContacto } = data;

    // Configuración del transporte (Zoho)
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
      },
    });

    // Configuración del mensaje
    const mailOptions = {
      from: `"Web Estudio" <${process.env.ZOHO_EMAIL}>`,
      to: 'contacto@nlrestudiojuridico.com.ar', // A donde querés que llegue
      subject: `Nueva Consulta: ${rama} - ${nombre}`,
      html: `
        <h3>Nueva Consulta Web</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Rama:</strong> ${rama}</p>
        <p><strong>Preferencia:</strong> ${metodoContacto}</p>
        <hr/>
        <p><strong>Mensaje:</strong><br/>${consulta}</p>
      `,
    };

    // Enviar
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Enviado con éxito' }, { status: 200 });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json({ message: 'Error al enviar' }, { status: 500 });
  }
}