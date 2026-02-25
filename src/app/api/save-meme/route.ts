import { imagekit } from "@/app/lib/image-kit";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as Blob;
    const originalName = formData.get("fileName") as string;

    if (!file || !originalName) {
      return NextResponse.json(
        { error: "Invalid file data" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: originalName,
      folder: "/memes-final",
      useUniqueFileName: true,
    });

    return NextResponse.json({
      success: true,
      fileId: uploadResponse.fileId,
      filePath: uploadResponse.filePath,
    });

  } catch (error) {
    console.error("Save meme error:", error);

    return NextResponse.json(
      { error: "Failed to save meme" },
      { status: 500 }
    );
  }
}