import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const image = formData.get("image");

  if (!image) {
    return NextResponse.json({ error: "No image" }, { status: 400 });
  }

  // DEMO VIDEO – stabil și funcțional
  const demoVideo =
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

  return NextResponse.json({
    video: demoVideo,
  });
}
