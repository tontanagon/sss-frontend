import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();
  const params = await request.json();

  
  
  const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/approve/product-stock`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.user.token}` },
    body:JSON.stringify({id:params.id})
  });
  
  const data = await res.json();

 return NextResponse.json(data, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })

}
