import React, { useCallback } from "react";
import { View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { IQDrawerMenu } from "../ui";
import { IQTouchableIcon } from "../truly-native";
import { icons, IQTheme, useTheme } from "../themes";
import { authManager } from "../helpers/api";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const HomeStack = createNativeStackNavigator();
const AboutStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const MainTabScreen = () => {
  const theme = useTheme();
  const colorScheme = theme.mode;
  const colorSet = IQTheme.colors[colorScheme];
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colorSet.primaryForeground,
        inactiveTintColor: colorSet.grey9,
      }}
      initialRouteName="Home"
      screenOptions={{
        cardStyle: {
          backgroundColor: colorSet.primaryBackground,
        },

        title: null,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeStackScreen}
        options={{
          tabBarColor: colorSet.primaryBackground,
          tabBarLabel: "Home",
          labelStyle: {
            fontSize: 12,
            margin: 0,
            padding: 0,
          },

          tabBarIcon: ({ focused, tintColor }) => (
            <Icon
              name={focused ? "ios-home" : "ios-home-outline"}
              focused={focused}
              color={focused ? colorSet.primaryForeground : colorSet.grey9}
              size={26}
              tintColor={{ tintColor }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="About Us"
        component={AboutStackScreen}
        options={{
          tabBarColor: "white",
          tabBarLabel: "About",
          tabBarIcon: ({ focused, tintColor }) => (
            <Icon
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              focused={focused}
              color={focused ? colorSet.primaryForeground : colorSet.grey9}
              size={26}
              tintColor={{ tintColor }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStackScreen = ({ navigation }) => {
  const theme = useTheme();
  const colorScheme = theme.mode;
  const colorSet = IQTheme.colors[colorScheme];
  return (
    <HomeStack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colorSet.primaryBackground,
        },
        title: null,
        headerShown: false,
        elevation: 0,
        headerShadowVisible: false,
        shadowOpacity: 0,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const AboutStackScreen = ({ navigation }) => {
  const theme = useTheme();
  const colorScheme = theme.mode;
  const colorSet = IQTheme.colors[colorScheme];
  return (
    <AboutStack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colorSet.primaryBackground,
        },
        headerShown: false,
      }}
    >
      <AboutStack.Screen name="About" component={AboutScreen} />
    </AboutStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const MyDrawer = (props) => {
  const theme = useTheme();
  const colorScheme = theme.mode;
  const colorSet = IQTheme.colors[colorScheme];
  const navigation = useNavigation();

  const onLogout = useCallback(() => {
    authManager?.logout();
    props.navigation.reset({
      index: 0,
      routes: [
        {
          name: "LoadScreen",
        },
      ],
    });
  }, []);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <IMDrawerMenu {...props} />}
      screenOptions={{
        cardStyle: {
          backgroundColor: colorSet.primaryBackground,
        },
        title: null,
        headerShown: true,
        elevation: 0,
        headerShadowVisible: false,
        shadowOpacity: 0,
        headerStyle: {
          backgroundColor: colorSet.primaryBackground,
        },
        headerRight: () => (
          <View>
            <IQTouchableIcon
              imageStyle={{ tintColor: colorSet.primaryForeground }}
              iconSource={icons.logout}
              onPress={onLogout}
            />
          </View>
        ),
        headerLeft: () => (
          <View>
            <IQTouchableIcon
              imageStyle={{ tintColor: colorSet.primaryForeground }}
              iconSource={icons.drawer}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          </View>
        ),
      }}
    >
      <Drawer.Screen name={"MainTabScreen"} component={MainTabScreen} />
    </Drawer.Navigator>
  );
};
export default MyDrawer;
