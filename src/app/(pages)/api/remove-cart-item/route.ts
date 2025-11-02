import { getUserToken } from "@/Helpers/getUserToken";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const token = await getUserToken();
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  const response = await fetch(`${process.env.URL_API}/cart/${productId}`, {
    method: "DELETE",
    headers: {
      token: token + "",
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}
