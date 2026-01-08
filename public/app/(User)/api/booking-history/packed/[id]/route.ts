import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
    request: NextRequest, { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();

    const { id } = await params;

    const formData = await request.json();

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/booking/pickup/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json' ,
            Authorization: `Bearer ${session?.user.token}`,
    },
        body: JSON.stringify({ remark: formData.remark })
    });

const data = await res.json();

return NextResponse.json(data, {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
})

}
