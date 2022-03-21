const colors = {
  black: "#2b2b2b",
  white: "#FFFFFF",
  indigo: "#181F38",
  grayOne: "#F7F7F7",
  grayTwo: "#E5E5E5",
  grayThree: "#707070",
  grayFour: "#5a5a5a",
  pointColorYello: "#ffc114",
  pointColorCarrot: "#ff5248",
  pointColorMint: "#19cdca",
  pointColorBlue: "#4e80e1",
  lightblue: "#C5E2EE",
  footerColor: "#313131",
  mainColor: "#E7286A",
  waringColor: "#ff0000",
  starColor: "#fd4",
} as const;

const deviceSizeUnits = {
  mobileM: "375px",
  mobileL: "450px",
  tablet: "768px",
  tabletL: "1024px",
} as const;

const theme = {
  colors,
  deviceSizeUnits,
};

export type ThemeType = typeof theme;

export default theme;
