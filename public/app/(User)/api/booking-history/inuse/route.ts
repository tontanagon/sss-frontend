import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const session = await auth();

    const params = await request.json();

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/booking/return`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user.token}`, 'Content-Type': 'application/json'
        }
        , body: JSON.stringify({
            id: params.id,
            item_booking_histories: params.item_booking_histories,
            remark: params.remark
        })
    });

    const data = await res.json();

    return NextResponse.json(data, {
        status: res.status,
        headers: { 'Content-Type': 'application/json' }
    })

}
