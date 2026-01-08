import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  const params = request.nextUrl.searchParams;

  const limit = params.get('limit');
  const search_status = params.get('search_status');
  const search_text = params.get('search_text');

  
  
  const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/booking/history/borrow?limit=${limit}&search_status=${search_status}&search_text=${search_text}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.user.token}` },
  });
  
  const data = await res.json();

 return NextResponse.json(data, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })

}
