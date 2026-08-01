import { ImageResponse } from "next/og";
import { frauncesTTF, og } from "./og-font";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS ignores `icon.svg` when a page is saved to the home screen and falls
 * back to a screenshot. This is the same mark, rasterised: ink monogram on the
 * paper stock, over the rust rule from the masthead.
 */
export default async function AppleIcon() {
  const fonts = await frauncesTTF("YC");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: og.paper,
          color: og.ink,
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Fraunces",
            fontSize: 86,
            letterSpacing: -3,
          }}
        >
          YC
        </div>
        <div
          style={{
            display: "flex",
            width: 74,
            height: 7,
            marginTop: 14,
            backgroundColor: og.accent,
          }}
        />
      </div>
    ),
    { ...size, fonts },
  );
}
