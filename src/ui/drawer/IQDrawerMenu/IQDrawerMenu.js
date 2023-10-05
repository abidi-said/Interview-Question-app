import React from "react";
import { View, Text, Image } from "react-native";
import dynamicStyles from "./styles";
import IQMenuButton from "../IQMenuButton/IQMenuButton";
import { icons, IQTheme, useTheme } from "../../../themes";
import { useAuth } from "../../../hooks/useAuth";
import tokenManager from "../../../helpers/Token";

const IQDrawerMenu = (props) => {
  const { navigation } = props;

  const theme = useTheme();
  const colorScheme = theme.mode;
  const styles = dynamicStyles(IQTheme, colorScheme);

  const authManager = useAuth();
  const { getId } = tokenManager;
  const currentUser = getId();

  const defaultProfilePhotoURL =
    "https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg";

  const actionLowerMenu = (action) => {
    if (action == "logout") {
      authManager?.logout();
      navigation.navigate("LoadScreen");
      return;
    }
    return;
  };
  const menuItems = [
    {
      title: "Profile",
      icon: icons.home_android,
      menuItemStyle: null,
      navigationPath: "MainStack",
    },
    {
      title: "Settings",
      icon: icons.bell,
      menuItemStyle: null,
      navigationPath: "MainStack",
    },
  ];
  const menuItemsSettings = [
    {
      title: "Privacy",
      icon: icons.logout,
      menuItemStyle: null,
      action: "logout",
    },
    {
      title: "Privacy",
      icon: icons.inscription,
      menuItemStyle: null,
      action: "",
    },
  ];
  const mappingMenuItems = menuItems.map((menuItem, index) => (
    <IQMenuButton
      title={menuItem.title}
      source={menuItem.icon}
      containerStyle={props.menuItemStyle}
      key={index}
      onPress={() => {
        navigation.navigate(menuItem.navigationPath);
      }}
    />
  ));

  const mappingMenuSettings = menuItemsSettings.map(
    (menuItemsSetting, index) => (
      <IQMenuButton
        key={index}
        title={menuItemsSetting.title}
        source={menuItemsSetting.icon}
        containerStyle={props.menuItemStyle}
        onPress={() => {
          actionLowerMenu(menuItemsSetting.action);
        }}
      />
    )
  );

  const lowerMenu =
    menuItemsSettings.length == 0 ? null : (
      <View>
        <View style={styles.line} />
        {mappingMenuSettings}
      </View>
    );
  return (
    <View style={styles.content}>
      <View style={[styles.header, props.headerStyle]}>
        <Image
          style={styles.imageContainer}
          source={{
            uri:
              currentUser.image ||
              currentUser.photoURI ||
              currentUser.profilePictureURL ||
              defaultProfilePhotoURL,
          }}
        />
        <Text style={[styles.info, props.nameStyle]}>
          {currentUser.firstName} {currentUser.lastName}
        </Text>
        <Text style={[styles.email, props.emailStyle]}>
          {currentUser.email}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={[styles.container, props.forceMenuItemsStyle]}>
          {mappingMenuItems}
          {lowerMenu}
        </View>
        <View style={styles.footer}>
          <Text style={styles.textFooter}>InterviewQ</Text>
        </View>
      </View>
    </View>
  );
};
export default IQDrawerMenu;
