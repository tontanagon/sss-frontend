import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const search_text = params.get('search_text') || '';
  const page = params.get('page') || 1;
  const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/home-page/product?page=${page}&search_text=${search_text}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data, { status: 200 });
}