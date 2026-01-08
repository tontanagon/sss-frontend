import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest, { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    
    const { id } = await params;

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/tags/get/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.user.token}`,
        }
    });
    
    const data = await res.json();
    
    return NextResponse.json(data, {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    })

}
