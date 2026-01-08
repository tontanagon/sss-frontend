import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  const params = request.nextUrl.searchParams;

  const id = params.get('id');
  
  
  
  const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/request/print/preview?id=${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.user.token}` },
  });
  
  const data = await res.json();

 return NextResponse.json(data, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })

}
