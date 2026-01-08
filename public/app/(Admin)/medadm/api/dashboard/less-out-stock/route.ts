import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = await auth();

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/dashboard/less-out-stock`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.user.token}` },
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status })

}