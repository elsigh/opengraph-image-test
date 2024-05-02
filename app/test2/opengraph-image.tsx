import fs from "fs";
import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export async function loadAssets(): Promise<
  { name: string; data: ArrayBuffer; weight: 400; style: "normal" }[]
> {
  const fontPath = `${process.cwd()}/public/fonts/Roboto-Regular.ttf`;
  console.debug("🎨 loadAssets", { fontPath });
  const roboto = fs.readFileSync(fontPath).buffer;
  console.debug("🎨 loadAssets", { roboto });
  return [
    {
      name: "roboto",
      data: roboto,
      weight: 400,
      style: "normal",
    },
  ];
}

export default async function Image({ params }: { params: {} }) {
  let song = {
    title: "Song Title",
    artist: "Artist Name",
    chordPro: "test",
  };
  const fonts = await loadAssets();

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "white",
          color: "black",
          padding: 20,
          whiteSpace: "pre-wrap",
        }}
      >
        <div>{song.title}</div>
        <div>{song.artist}</div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}
