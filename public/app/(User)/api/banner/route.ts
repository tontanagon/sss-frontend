import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/home-page/banner`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  
  const data = await res.json();

 return NextResponse.json(data, {
        status: res.status,
        headers: { 'Content-Type': 'application/json' }
    })

}
