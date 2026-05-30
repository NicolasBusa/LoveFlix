import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
  }

  // Handle the checkout.session.completed and async_payment_succeeded events
  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object as any;

    // For async payments (like Boleto/Pix), checkout.session.completed might fire when unpaid.
    // We only want to provision the site if payment is actually paid.
    if (session.payment_status !== 'paid') {
      console.log(`Checkout ${session.id} not paid yet (status: ${session.payment_status}). Waiting for async_payment_succeeded.`);
      return NextResponse.json({ received: true, status: 'pending' }, { status: 200 });
    }

    const clientEmail = session.customer_details?.email;
    const checkoutId = session.id;
    const requestedSubdomain = session.metadata?.subdomain || `casal-${Math.floor(Math.random() * 100000)}`;
    
    // Generate password and access token
    const password = Math.random().toString(36).slice(-8);
    const crypto = require('crypto');
    const accessToken = crypto.randomBytes(32).toString('hex');

    // Update the existing draft site to 'active' status with credentials
    const { error: updateError } = await supabaseAdmin
      .from('sites')
      .update({
        status: 'active',
        password: password,
        access_token: accessToken,
        stripe_session_id: checkoutId,
      })
      .eq('site_id', requestedSubdomain);

    if (updateError) {
      console.error('Error updating site:', updateError);
      // If no draft was found, try to find by slug as fallback
      const { error: fallbackError } = await supabaseAdmin
        .from('sites')
        .update({
          status: 'active',
          password: password,
          access_token: accessToken,
          stripe_session_id: checkoutId,
        })
        .eq('slug', requestedSubdomain);
      
      if (fallbackError) {
        console.error('Fallback update also failed:', fallbackError);
        return NextResponse.json({ error: 'Database Error' }, { status: 500 });
      }
    }

    // Send Email to the client
    if (clientEmail && process.env.RESEND_API_KEY) {
      try {
        const { Resend } = require('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        const domain = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const accessUrl = `${domain}/sites/${requestedSubdomain}?token=${accessToken}`;
        
        await resend.emails.send({
          from: 'LoveFlix <sucesso@loveflix.com.br>',
          to: clientEmail,
          subject: 'Sua Surpresa Romântica está Pronta! ❤️',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
              <h1 style="color: #E85D75;">Pagamento Confirmado!</h1>
              <p>Sua Surpresa Romântica foi criada com sucesso.</p>
              <p><strong>Acesse o seu site exclusivo aqui:</strong> <br/><a href="${accessUrl}" style="color: #E85D75;">${accessUrl}</a></p>
              <p>A senha de proteção ao seu site é: <strong>${password}</strong></p>
              <p style="font-size: 0.9em; color: #666; margin-top: 20px;">
                Guarde este link e esta senha com carinho. Você pode enviar apenas o link para a pessoa amada (a senha será solicitada).
              </p>
              <br/>
              <p>Com amor,<br/>Equipe LoveFlix</p>
            </div>
          `
        });
        console.log(`Email sent to ${clientEmail}`);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }
    } else {
      console.log(`Site provisioned! Subdomain: ${requestedSubdomain}. Password: ${password}. (Email not sent: no client email or Resend API key)`);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
