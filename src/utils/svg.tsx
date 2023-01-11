import satori from "satori";
import { format } from "date-fns";

export const generateSVG = ({
  contributor = "",
  reason = "",
  date = Date.now(),
}) =>
  fetch("/inter-latin-ext-400-normal.woff")
    .then((res) => res.arrayBuffer())
    .then((data) =>
      satori(
        <div
          style={{
            background: "#3730a3",
            display: "flex",
            height: "100%",
            width: "100%",
            color: "white",
          }}
        >
          <div style={{ display: "flex", position: "relative" }}>
            <img src="/svgPatterns/pattern-1.svg" style={{ zIndex: 10 }} />
            <div
              style={{
                position: "absolute",
                bottom: -46,
                left: 14,
                fontSize: 32,
                color: "#c7d2fe",
              }}
            >
              gratitude.party
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 16,
              bottom: 0,
              position: "absolute",
            }}
          >
            <div style={{ fontSize: 20 }}>{contributor}</div>
            <div style={{ fontSize: 30, marginBottom: 4 }}>{reason}</div>
            <div style={{ fontSize: 20 }}>
              {format(new Date(date), "yyyy-MM-dd")}
            </div>
          </div>
        </div>,
        {
          width: 550,
          height: 850,
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
