import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import ActionSheet from "react-native-actionsheet";
import ImageView from "react-native-image-view";
import * as ImagePicker from "react-native-image-picker";
import FastImage from "react-native-fast-image";
import { IQTheme, useTheme } from "../../themes";
import dynamicStyles from "./styles";

const Image = FastImage;

const IQProfilePictureSelector = (props) => {
  const [profilePictureURL, setProfilePictureURL] = useState(
    props.profilePictureURL || ""
  );
  const originalProfilePictureURL = useRef(props.profilePictureURL || "");
  if (originalProfilePictureURL.current !== (props.profilePictureURL || "")) {
    originalProfilePictureURL.current = props.profilePictureURL || "";
    setProfilePictureURL(props.profilePictureURL || "");
  }

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [tappedImage, setTappedImage] = useState([]);
  const actionSheet = useRef(null);

  const theme = useTheme();
  const colorScheme = theme.mode;
  const styles = dynamicStyles(IQTheme, colorScheme);

  const handleProfilePictureClick = (url) => {
    if (url) {
      const isAvatar = url.search("avatar");
      const image = [
        {
          source: {
            uri: url,
          },
        },
      ];
      if (isAvatar === -1) {
        setTappedImage(image);
        setIsImageViewerVisible(true);
      } else {
        showActionSheet();
      }
    } else {
      showActionSheet();
    }
  };

  const onImageError = () => {
    const defaultProfilePhotoURL =
      "https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg";
    setProfilePictureURL(defaultProfilePhotoURL);
  };

  // const getPermissionAsync = async () => {
  //   if (Platform.OS === "ios") {
  //     let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(
  //       false
  //     );

  //     if (permissionResult.granted === false) {
  //       alert("Sorry, we need camera roll permissions to make this work.");
  //     }
  //   }
  // };

  const onPressAddPhotoBtn = async () => {
    const options = {
      title: "Select photo",
      cancelButtonTitle: "Cancel",
      takePhotoButtonTitle: "Take Photo",
      chooseFromLibraryButtonTitle: "Choose from Library",
      maxWidth: 2000,
      maxHeight: 2000,
      useNativeDriver: true,
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    // await getPermissionAsync();

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        const source = response.assets;
        const { uri } = source[0];
        setProfilePictureURL(uri);
        props.setProfilePictureFile(response);
      }
    });
  };

  const closeButton = () => (
    <TouchableOpacity
      style={styles.closeButton}
      onPress={() => setIsImageViewerVisible(false)}
    >
      <Image
        style={styles.closeIcon}
        source={require("../../assets/icons/close.png")}
      />
      {/* <Text>close</Text> */}
    </TouchableOpacity>
  );

  const showActionSheet = (index) => {
    setSelectedPhotoIndex(index);
    actionSheet.current.show();
  };

  const onActionDone = (index) => {
    if (index == 0) {
      onPressAddPhotoBtn();
    }
    if (index == 2) {
      // Remove button
      if (profilePictureURL) {
        setProfilePictureURL(null);
        props.setProfilePictureFile(null);
      }
    }
  };
  const normalisedSource = (source) => {
    const normalisedSource =
      source && typeof source.uri === "string" && !source.uri.split("http")[1]
        ? null
        : source;
    return source && source.uri ? normalisedSource : source;
  };

  return (
    <>
      <View style={styles.imageBlock}>
        <TouchableHighlight
          style={styles.imageContainer}
          onPress={() => handleProfilePictureClick(profilePictureURL)}
        >
          <Image
            style={[styles.image, { opacity: profilePictureURL ? 1 : 0.3 }]}
            source={
              profilePictureURL
                ? { uri: profilePictureURL }
                : require("../../assets/icons/user_avatar.png")
            }
            resizeMode="cover"
            onError={onImageError}
          />
        </TouchableHighlight>

        <TouchableOpacity onPress={showActionSheet} style={styles.addButton}>
          <Image
            style={styles.cameraIcon}
            source={require("../../assets/icons/camera-filled-icon.png")}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ActionSheet
          ref={actionSheet}
          title={"Confirm action"}
          options={["Change Profile Photo", "Cancel", "Remove Profile Photo"]}
          cancelButtonIndex={1}
          destructiveButtonIndex={2}
          useNativeDriver={true}
          onPress={(index) => {
            onActionDone(index);
          }}
        />
        <ImageView
          images={tappedImage}
          isVisible={isImageViewerVisible}
          onClose={() => setIsImageViewerVisible(false)}
          controls={{ close: closeButton }}
          useNativeDriver={true}
        />
      </ScrollView>
    </>
  );
};

export default IQProfilePictureSelector;
