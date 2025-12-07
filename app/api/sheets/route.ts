export async function POST(req: Request) {
    try {
      const body = await req.json();
  
      const res = await fetch(process.env.SHEETS_ENDPOINT!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
  
      const text = await res.text();
  
      return new Response(JSON.stringify({ ok: true, data: text }), { status: 200 });
    } catch (e) {
      return new Response(JSON.stringify({ ok: false, error: String(e) }), { status: 500 });
    }
  }
  