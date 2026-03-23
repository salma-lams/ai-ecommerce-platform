/**
 * API abstraction layer for connecting Next.js to the FastAPI backend.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function fetchProducts(category?: string) {
  try {
    const url = category ? `${API_URL}/products?category=${category}` : `${API_URL}/products`;
    const res = await fetch(url, { next: { revalidate: 30 } }); // Next.js ISR
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API Error (fetchProducts):", error);
    // Returning explicit empty bounds to prevent Next.js UI crashing when backend is offline
    return [];
  }
}

export async function fetchProductById(id: string) {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, { next: { revalidate: 30 } });
    if (!res.ok) throw new Error("Failed to fetch product");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API Error (fetchProductById):", error);
    return null;
  }
}

export async function fetchAIRecommendations(userId: string) {
  try {
    const res = await fetch(`${API_URL}/ai/recommendations?user_id=${userId}`);
    if (!res.ok) throw new Error("Failed to fetch AI recommendations");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API Error (fetchAIRecommendations):", error);
    return null;
  }
}

export async function createPaymentIntent(items: { product_id: string, quantity: number }[]) {
  try {
    const res = await fetch(`${API_URL}/orders/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items })
    });
    if (!res.ok) throw new Error("Failed to create payment intent");
    return await res.json();
  } catch (error) {
    console.error("API Error (createPaymentIntent):", error);
    return null;
  }
}
