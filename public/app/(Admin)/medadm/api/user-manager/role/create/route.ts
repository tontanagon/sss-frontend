import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const request_data = await request.json();
  const session = await auth();  

  const res = await fetch(
    `${process.env.API_BASE_URL}/api/role-manager/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: request_data.name,
        permissions: request_data.permissions,
      }),
    }
  );

  const data = await res.json();
  
  return NextResponse.json(data, { status: 201 });
}
