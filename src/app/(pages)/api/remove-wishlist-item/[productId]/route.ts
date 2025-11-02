import { getUserToken } from "@/Helpers/getUserToken";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ productId: string }> } // ✅ لاحظ Promise هنا
) {
  try {
    const { productId } = await context.params; // ✅ لازم await

    const token = await getUserToken();

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          token: token + "",
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in remove-wishlist-item:", error);
    return NextResponse.json(
      { status: "fail", message: "Server error" },
      { status: 500 }
    );
  }
}
