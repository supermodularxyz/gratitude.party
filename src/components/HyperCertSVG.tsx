import { useEffect, useState } from "react";
import { generateSVG } from "utils/svg";

type SVGProps = {
  contributor: string;
  reason: string;
  date: number;
};

export const HyperCertSVG = ({ contributor, reason, date }: SVGProps) => {
  const [svg, setSvg] = useState("");
  useEffect(() => {
    generateSVG({ contributor, reason, date }).then((svg) =>
      setSvg(
        svg.replace(
          `<svg width="550" height="850" `,
          `<svg width="100%" height="100%" `
        )
      )
    );
  }, []);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
};
