import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const session = await auth();

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/sidebar/count-booking-status-admin`, {
        headers: {
            Authorization: `Bearer ${session?.user.token}`,
        },
    });

    const data = await res.json();

    return NextResponse.json(data, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })

}
