import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF6F1",
          borderRadius: "50%",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1C10 1 11.5 2.6 11.5 4.7C11.5 6.2 10.7 7.4 9.4 7.9C10.9 8.4 12 9.9 12 11.7C12 13.9 10.2 15.5 8 15.5C5.8 15.5 4 13.9 4 11.7C4 9.9 5.1 8.4 6.6 7.9C5.3 7.4 4.5 6.2 4.5 4.7C4.5 2.6 6 1 8 1Z"
            stroke="#4A3359"
            strokeWidth="1.1"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
