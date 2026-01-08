import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    request: NextRequest
) {
    const session = await auth();
    const req = await request.json();

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/request/confirm-pack-list`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`, Accept: 'application/json',

        },
        body: JSON.stringify({
            id_check: req.id_check,
            isConfirmList: true,
        })
    });

    const data = await res.json();

    return NextResponse.json(data, {
        status: req.status,
        headers: { 'Content-Type': 'application/json' }
    })

}
