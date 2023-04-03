import site from "config/site";
import { toYear } from "./date";

const calcTime = (d: Date) => [+d, +d, +d, +d].map((v) => v);

export const createClaim = ({
  description = "",
  svg = "",
  contributor = "",
  contributorAddress = "",
}) => {
  const [workTimeStart, workTimeEnd, impactTimeStart, impactTimeEnd] = calcTime(
    new Date()
  ) as [number, number, number, number];

  return {
    name: site.title,
    description,
    external_url: ``,
    version: "0.0.1",
    // external_url: `${global.location.origin}`,
    image: `data:image/svg+xml;base64,${btoa(svg)}`,
    properties: [],
    hypercert: {
      impact_scope: {
        name: "Impact Scope",
        value: ["all"],
        excludes: [],
        display_value: "all",
      },
      work_scope: {
        name: "Work Scope",
        value: ["gratitude"],
        excludes: [],
        display_value: "gratitude",
      },
      impact_timeframe: {
        name: "Impact Timeframe",
        value: [impactTimeStart, impactTimeEnd],
        display_value: `${toYear(impactTimeStart)} → ${toYear(impactTimeEnd)}`,
      },
      work_timeframe: {
        name: "Work Timeframe",
        value: [workTimeStart, workTimeEnd],
        display_value: `${toYear(workTimeStart)} → ${toYear(workTimeEnd)}`,
      },
      rights: {
        name: "Rights",
        value: ["Public Display"],
        excludes: [],
        display_value: "Public Display",
      },
      contributors: {
        name: "Contributors",
        value: [contributorAddress],
        display_value: contributor,
      },
    },
  };
};
