import satori from "satori";

import { config } from "components/HyperCertSVG";
import { content } from "components/GreenPillForm";
export const generateSVG = ({
  contributor = "",
  reason = "",
  color = ["red", "red"],
  shape = "1",
  borderRadius = 32,
  width = config.width,
  height = config.height,
}) => {
  const [background, textColor] = color;
  return fetch("/Monaco.ttf")
    .then((res) => res.arrayBuffer())
    .then((data) =>
      satori(
        <div
          style={{
            background,
            borderColor: textColor,
            borderWidth: 2,
            borderRadius,
            display: "flex",
            height: "100%",
            width: "100%",
            color: "white",
          }}
        >
          <div style={{ display: "flex", position: "relative" }}>
            <img
              src={`/svgPatterns/pattern-${shape}.svg`}
              style={{ zIndex: 10, width: "100%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",

              height: "100%",
              width: "100%",
              position: "absolute",
            }}
          >
            <div
              style={{
                color: textColor,
                background,
                borderColor: textColor,
                borderWidth: 2,
                borderRadius,
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                alignItems: "center",
                fontSize: 24,
                padding: 40,
                height: 200,
                width: 600,
                lineHeight: "180%",
              }}
            >
              <span>{content.intro}</span>
              <span style={{ fontSize: contributor.length > 40 ? 22 : 24 }}>
                {contributor}
              </span>
              <span>for {reason}</span>
            </div>
          </div>
        </div>,
        {
          width,
          height,
          fonts: [
            {
              name: "Monaco",
              data,
              weight: 400,
              style: "normal",
            },
          ],
        }
      )
    );
};
