import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();

    const { id } = await params;
    const param = await request.json();

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/booking/return/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${session?.user.token}`, 'Content-Type': 'application/json'
        }
        , body: JSON.stringify({
            item_booking_histories: param.item_booking_histories,
            remark: param.remark
        })
    });

    const data = await res.json();

    return NextResponse.json(data, {
        status: res.status,
        headers: { 'Content-Type': 'application/json' }
    })

}
