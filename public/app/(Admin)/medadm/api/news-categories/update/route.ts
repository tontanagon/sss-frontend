import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    
    const session = await auth();
    
    
    
    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/news-categories/update`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user.token}`,
        },
        body:formData,
    }); 
    
    const data = await res.json();
    
    return NextResponse.json(data, { status: 201 })

}
