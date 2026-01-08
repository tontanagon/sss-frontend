import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const params = await request.json();
    const session = await auth();

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/types/delete/${params.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" , Authorization: `Bearer ${session?.user.token}`  },
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' }
    });
}