import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";

export async function GET(request: NextRequest) {
    const session = await auth();

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/example`, {
        headers: { Authorization: `Bearer ${session?.user.token}` }
    });
    const profile = await res.json();

    return new Response(JSON.stringify(session), {
        // status: res.status,
        headers: { 'Content-Type': 'application/json' }
    });
}
