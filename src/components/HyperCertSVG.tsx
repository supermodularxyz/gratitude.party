import { useEffect, useState } from "react";
import { generateSVG } from "utils/svg";

type SVGProps = {
  text: string;
  bgColor?: string;
  textColor?: string;
};

const width = 900;
const height = 500;

export const HyperCertSVG = (props: SVGProps) => {
  const [svg, setSvg] = useState("");
  useEffect(() => {
    generateSVG({ ...props, width, height })
      .then((svg) =>
        setSvg(
          svg.replace(
            `<svg width="${width}" height="${height}" `,
            `<svg width="100%" height="100%" `
          )
        )
      )
      .catch(console.log);
  }, []);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
};
