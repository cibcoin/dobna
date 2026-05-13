// سرویس مستقل برای ارسال به بله
// supabase/functions/bale-bot/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const BALE_BOT_TOKEN = Deno.env.get('BALE_BOT_TOKEN') || '';
const BALE_ADMIN_ID = Deno.env.get('BALE_ADMIN_ID') || '';

serve(async (req) => {
    const { title, message } = await req.json();
    
    const response = await fetch('https://api.bale.ai/v1/bots/sendMessage', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${BALE_BOT_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: BALE_ADMIN_ID,
            text: `*${title}*\n\n${message}`,
            parse_mode: 'Markdown',
        }),
    });
    
    const result = await response.json();
    return new Response(JSON.stringify(result), { status: 200 });
});
// سرویس مستقل برای ارسال به بله
// supabase/functions/bale-bot/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const BALE_BOT_TOKEN = Deno.env.get('BALE_BOT_TOKEN') || '';
const BALE_ADMIN_ID = Deno.env.get('BALE_ADMIN_ID') || '';

serve(async (req) => {
    const { title, message } = await req.json();
    
    const response = await fetch('https://api.bale.ai/v1/bots/sendMessage', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${BALE_BOT_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: BALE_ADMIN_ID,
            text: `*${title}*\n\n${message}`,
            parse_mode: 'Markdown',
        }),
    });
    
    const result = await response.json();
    return new Response(JSON.stringify(result), { status: 200 });
});