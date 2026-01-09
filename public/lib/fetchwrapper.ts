import { auth, signOut } from "@/auth";
import { NextResponse } from "next/server";

export async function fetchWrapper(url: string, options: RequestInit = {}) {
  // const session = await auth();

  const res = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
  });

  // ถ้า token หมดอายุ หรือไม่ได้ login
  // if (res.status === 401) {
  //   await signOut();
  // }

  // ถ้าไม่มีPermission
  // if (res.status === 403) {
  //   return NextResponse.json({ error: "Forbidden" }, { status: res.status });
  // }

  return res;
}
