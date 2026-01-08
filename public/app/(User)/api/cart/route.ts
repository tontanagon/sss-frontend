import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const session = await auth();

  

  const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/user-cart/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.user.token}` },
    body: JSON.stringify({cart_items: req.cart_items})
  }); 
  
  const data = await res.json();
  
 return NextResponse.json(data, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })

}