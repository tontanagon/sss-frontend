import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    request: NextRequest, { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();

    const { id } = await params;

    const params_body = await request.json();

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/request/incomplete/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({
            remark: params_body.remark,
            items_change: params_body.items_change,
        })
    });

    const data = await res.json();

    return NextResponse.json(data, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })

}
