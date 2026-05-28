import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "#0C0B09",
          border: "1.5px solid #C8A84B",
        }}
      >
        <span
          style={{
            color: "#C8A84B",
            fontSize: 18,
            fontWeight: 800,
            fontFamily: "serif",
            lineHeight: 1,
          }}
        >
          K
        </span>
      </div>
    ),
    { ...size }
  );
}
