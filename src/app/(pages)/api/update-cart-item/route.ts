import { getUserToken } from "@/Helpers/getUserToken";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const token = await getUserToken();
  const body = await req.json();
  const { productId, count } = body;

  const response = await fetch(`${process.env.URL_API}/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token + "",
    },
    body: JSON.stringify({ count }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
