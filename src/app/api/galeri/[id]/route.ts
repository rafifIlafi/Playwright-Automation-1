import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // wajib di-await
    const { id } = await params;

    console.log("DELETE ID:", id);

    await db.galeri.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Galeri berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting galeri:", error);

    return NextResponse.json(
      {
        error: "Gagal menghapus galeri",
      },
      {
        status: 500,
      }
    );
  }
}