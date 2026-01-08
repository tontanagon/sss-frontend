import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    request: NextRequest, { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();

    const { id } = await params;

    const req = await request.json();

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/request/packed/${id}`, {
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({
            remark: req.remark, items_change: req.items_change
        })
    });

    const data = await res.json();

    return NextResponse.json(data, {
        status: req.status,
        headers: { 'Content-Type': 'application/json' }
    })

}
