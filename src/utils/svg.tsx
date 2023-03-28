import satori from "satori";

export const generateSVG = ({
  text = "",
  bgColor = "#FFF3D4",
  textColor = "#FF3C3C",
  borderRadius = 32,
  width = 100,
  height = 100,
}) =>
  fetch("/inter-latin-ext-400-normal.woff")
    .then((res) => res.arrayBuffer())
    .then((data) =>
      satori(
        <div
          style={{
            background: bgColor,
            display: "flex",
            height: "100%",
            width: "100%",
            color: "white",
            borderWidth: 2,
            borderColor: textColor,
            borderRadius,
          }}
        >
          <div style={{ display: "flex", position: "relative" }}>
            <img
              src="/svgPatterns/pattern-1.svg"
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
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                fontSize: 24,
                padding: 40,
                height: 200,
                width: 600,
                color: textColor,
                background: bgColor,
                borderWidth: 2,
                borderColor: textColor,
                borderRadius,
              }}
            >
              {text}
            </div>
          </div>
        </div>,
        {
          width,
          height,
          fonts: [
            {
              name: "Inter",
              data,
              weight: 400,
              style: "normal",
            },
          ],
        }
      )
    );
