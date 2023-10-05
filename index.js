import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
console.log("getAppKeys()=", AppRegistry.getAppKeys());

AppRegistry.registerComponent(appName, () => App);
