import { StyleSheet } from "react-native";
import { scale } from "../helpers/functions";
import colors from "./colors";
import fonts from "./fonts";
import metrics from "./metrics";

const boxShadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
};

const CARD_HEIGHT = scale(200);

export default StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    marginBottom: metrics.baseMargin,
    ...boxShadow,
    height: CARD_HEIGHT,
  },
  itemContainer: {
    backgroundColor: colors.white,
    height: CARD_HEIGHT,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.borderGrey,
  },
  boxShadow,
  headerTitle: {
    ...fonts.large,
    paddingHorizontal: metrics.smallMargin,
    paddingTop: scale(4),
    fontFamily: fonts.poppins.semiBold,
  },
  tabStyle: {
    opacity: 1,
    elevation: 0,
  },
  tab: {
    backgroundColor: colors.white,
    elevation: 0,
  },
  label: {
    marginTop: metrics.smallMargin,
    ...fonts.xSmall,
  },
  indicator: {
    backgroundColor: colors.primary1,
  },
  nav: {
    width: metrics.width,
  },
  smallIcon: {
    height: metrics.smallIcon,
    width: metrics.smallIcon,
  },
  icon: {
    width: metrics.width / 3,
    padding: metrics.mediumMargin,
    textAlign: "center",
  },
  daySeances: {
    borderWidth: 1,
    borderColor: colors.white,
    margin: metrics.xsmallMargin,
    flex: 1,
    justifyContent: "center",

    // flexDirection: "row",
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  smallShadow: {
    shadowColor: colors.dimGray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
