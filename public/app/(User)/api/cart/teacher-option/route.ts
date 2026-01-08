import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  

  const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/booking/teacher-select`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.user.token}`, Accept: 'application/json' },
  }); 
  
  const data = await res.json();
  
 return NextResponse.json(data, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })

}