import { type NextRequest, NextResponse } from "next/server"
import type { OrderPayload } from "@/types/product"

function formatTelegramMessage(order: OrderPayload): string {
  return `🛍 *Yangi buyurtma!*

*Mahsulot:*
\`${order.productName}\`
\`ID: ${order.productId}\`

*Narxi:* \`${order.price.toLocaleString()} ${order.currency}\`

*Variant:*
\`Rang: ${order.selectedColorLabel}\`
\`O'lcham: ${order.selectedSize} sm (${order.selectedSizeAgeLabel})\`
\`Til: ${order.language}\`

*Mijoz:*
\`Ism: ${order.customerName}\`
\`Telefon: ${order.customerPhone}\`
\`Tuman: ${order.customerDistrict}\`
\`Manzil: ${order.customerAddress}\`
${order.comment ? `\`Izoh: ${order.comment}\`` : ""}

*Rasm:*
${order.currentImageUrl}

_Vaqt: ${order.timestamp}_`
}

export async function POST(request: NextRequest) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHANNEL_ID

    if (!token || !chatId) {
      console.warn("[Telegram] Credentials not configured, skipping notification")
      return NextResponse.json({ success: true, skipped: true })
    }

    const order: OrderPayload = await request.json()
    const message = formatTelegramMessage(order)
    const url = `https://api.telegram.org/bot${token}/sendMessage`

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
        disable_web_page_preview: false,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("[Telegram] API error:", errorData)
      return NextResponse.json({ success: false, error: errorData }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Telegram] Failed to send notification:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
