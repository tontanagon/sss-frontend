import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const session = await auth();  

  

  const res = await fetch(
    `${process.env.API_BASE_URL}/api/user-manager/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
      body: formData,
    }
  );


  const data = await res.json();
  
  return NextResponse.json(data, { status: 201 });
}
