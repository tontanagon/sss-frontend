import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.formData();
  const session = await auth();

  

  const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/booking/save-booking`, {
    method: "POST",
    headers: { Authorization: `Bearer ${session?.user.token}` },
    body: req
  });
  
  const data = await res.json();

  return NextResponse.json(data, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' }
  })

}