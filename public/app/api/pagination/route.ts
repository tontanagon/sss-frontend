import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();
  const req = await request.json();
  
  const res = await fetchWrapper(`${req.nextPage}&limit=${req.query.pagination ?? ''}&search_status=${req.query.search_status ?? ''}&search_text=${req.query.search_text ?? ''}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.user?.token}` },
  });

  const data = await res.json();

 return NextResponse.json(data, {
        status: res.status,
        headers: { 'Content-Type': 'application/json' }
    })

}
