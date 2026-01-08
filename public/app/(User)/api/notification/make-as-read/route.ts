import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  const params = request.nextUrl.searchParams;
  const uuid = params.get('uuid');
  
  

  const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/noti/make-as-read?uuid=${uuid}`, {
    headers: { Authorization: `Bearer ${session?.user.token}` },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
