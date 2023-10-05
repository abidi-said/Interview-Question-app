import appConfig from "./app";
import debugConfig from "./debug";

// eslint-disable-next-line no-undef
export default __DEV__ ? debugConfig : appConfig;
