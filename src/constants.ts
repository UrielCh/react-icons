// next released version for @preact-icons/XX
export const nextTag = "1.0.14";
// version of the current @preact-icons/common package, it will be use as dependency in each @preact-icons/XX package
export const reactIconVersion = "1.1.0";
// get version from https://esm.sh/preact, the version number will be prefixed with ^
export const preactVersion = "10.22.1";

export const EXTRA_COMPRESSION = false;
export const NL = "\n";
export const NL2 = `${NL}${NL}`;
export const BQ3 = "```";

export const SVG_ATTRS = [
  "tag",
  "viewBox",
  "attr",
  "child",
  "d",
  "id",
  "dataName",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeWidth",
  "fill",
  "ariaHidden",
  "fillRule",
  "version",
  "x",
  "y",
  "style",
  "baseProfile",
  "enableBackground",
  "stroke",
] as const;

export const debugIcons = new Set(["GrAccessibility", "GrAction", "GrCentos"]);
