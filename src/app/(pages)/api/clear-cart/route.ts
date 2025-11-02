import { getUserToken } from "@/Helpers/getUserToken";
import { NextResponse } from "next/server";

export async function DELETE() {
  const token = await getUserToken();

  const response = await fetch(`${process.env.URL_API}/cart`, {
    method: "DELETE",
    headers: {
      token: token + "",
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}
