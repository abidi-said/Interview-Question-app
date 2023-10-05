import { scale } from "../helpers/functions";
import colors from "./colors";

const getStyle = (fontSize) => ({
  fontFamily: "Poppins-Regular",
  fontSize: scale(fontSize),
  //color: colors.black,
  textAlign: "left",
});
const getStyleBold = (fontSize) => ({
  fontFamily: "Poppins-Medium",
  fontSize: scale(fontSize),
  fontWeight: "bold",
  textAlign: "left",
});
const getStyleTitle = (fontSize) => ({
  fontFamily: "Poppins-Regular",
  fontSize: scale(fontSize),
  color: colors.grey2,
  textAlign: "left",
});
const poppins = {
  bold: "Poppins-Bold",
  semiBold: "Poppins-SemiBold",
  medium: "Poppins-Medium",
  light: "Poppins-Light",
  regular: "Poppins-Regular",
};
export default {
  h1: getStyle(22),
  h2: getStyle(21),
  h3: getStyle(20),
  h4: getStyle(19),
  h5: getStyle(18),
  h6: getStyle(17),
  hTitle: getStyleTitle(17),
  large: getStyle(16),
  medium: getStyle(15),
  small: getStyle(14),
  xSmall: getStyle(13),
  tiny: getStyle(11),
  superTiny: getStyle(9),
  poppins,
  bold: getStyleBold(15),
};
