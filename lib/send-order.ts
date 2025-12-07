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

async function sendToTelegram(order: OrderPayload): Promise<void> {
  const response = await fetch("/api/telegram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Telegram API error: ${errorData.error}`)
  }
}

export async function sendOrder(payload: OrderPayload): Promise<{ success: boolean; error?: string }> {
  try {
    await fetch("/api/sheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Google Sheets error:", err);
    return { success: false, error: "Failed to submit order" };
  }

  try {
    await sendToTelegram(payload);
  } catch (error) {
    console.error("[Telegram] Failed to send notification:", error);
  }

  return { success: true };
}
