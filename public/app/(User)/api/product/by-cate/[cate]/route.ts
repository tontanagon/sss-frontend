import { fetchWrapper } from '@/lib/fetchwrapper';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(
    request: NextRequest, { params }: { params: Promise<{ cate: string }> }
) {
    const { cate } = await params;
    const search_params = request.nextUrl.searchParams
    const search_text = search_params.get('search_text')
    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/category-page/product/${cate}?search_text=${search_text || ''}`);
    
    const data = await res.json();

    return NextResponse.json(data, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })

}