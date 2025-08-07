import { Colors } from "@/constants/Colors";
import { findUserById } from "@/database/database";
import { setLoggedOut, setUser, userSlice } from "@/store/slices/user-slice";
import { RootState } from "@/store/store";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useSQLiteContext } from "expo-sqlite";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { ScrollView } from "react-native-gesture-handler";
import { getProfile } from "@/http/profile-http";

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = ({
  navigation,
  state,
}) => {
  const dispatch = useDispatch();
  const [firstLetter, setFirstLetter] = useState("");
  const [secondLetter, setSecondLetter] = useState("");
  const designation = useSelector(
    (state: RootState) => state.userSlice.designation
  );
  const fullName = useSelector((state: RootState) => state.userSlice.fullName);
  const router = useRouter();
  const userId = useSelector((state: RootState) => state.userSlice.userId);

  // const userDetails = useSelector((state: RootState) => state.userSlice);
  // console.log("USER DEATILS", userDetails);

  // const { designation, fullName, userId } = useSelector(
  //   (state: RootState) => state.userSlice
  // );
  // console.log("NAME", fullName);
  // console.log("Designation", designation);
  // console.log("userId", userId);

  // const [offlineUserInfo, setOfflineUserInfo] = React.useState<any>(true);
  // const [loading, setLoading] = React.useState<any>(true);

  const db = useSQLiteContext();
  const [isOnline, setIsOnline] = useState(false);

  // const loginOfflineHandler = async () => {
  //   try {
  //     const userInfo = await AsyncStorage.getItem("OfflineUserInfo");
  //     console.log("Offline", userInfo);
  //     if (userInfo) {
  //       const parsedData = JSON.parse(userInfo);
  //       console.log("parsedData", parsedData);
  //       setOfflineUserInfo(parsedData);
  //     }
  //   } catch (e) {
  //     console.log("Error from CDC offline handler", e);
  //   }
  // };

  const getProfileHandler = async () => {
    if (userId) {
      if (!isOnline) {
      } else {
        const response: any = await db.getFirstAsync(
          `SELECT * FROM users WHERE id="${userId}"`
        );
        console.log("res AAA", response);
        if (response) {
          let fullName;
          if (response.firstName) {
            fullName = response.firstName;
          }
          if (response.middleName) {
            fullName += " " + response.middleName;
          }
          if (response.lastName) {
            fullName += " " + response.lastName;
          }

          dispatch(
            setUser({
              fullName: fullName,
              designation: response.designation,
            })
          );
        }
      }
    }
    // if (isOnline && userId) {
    //   try {
    //     const token = await AsyncStorage.getItem("token");
    //     if (token) {
    //       const profileResponse = await getProfile(token);
    //       console.log(profileResponse);
    //       if (!(await profileResponse).isError) {
    //         const responseData = (await profileResponse).data;
    //         dispatch(
    //           setUser({
    //             userId: responseData.id,
    //             designation: responseData.designation,
    //             fullName: responseData.fullName,
    //           })
    //         );
    //         await AsyncStorage.setItem(
    //           "OfflineUserInfo",
    //           JSON.stringify({
    //             userId: responseData.id,
    //             designation: responseData.designation,
    //             fullName: responseData.fullName,
    //           })
    //         );
    //       }
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
  };

  // const checkInternetHandler = async () => {
  //   NetInfo.fetch().then(async (state) => {
  //     console.log("Is connected?", state.isConnected);
  //     if (state.isConnected && userId) {
  //       try {
  //         const token = await AsyncStorage.getItem("token");
  //         if (token) {
  //           const profileResponse = await getProfile(token);
  //           console.log(profileResponse);
  //           if (!(await profileResponse).isError) {
  //             const responseData = (await profileResponse).data;
  //             dispatch(
  //               setUser({
  //                 userId: responseData.id,
  //                 designation: responseData.designation,
  //                 fullName: responseData.fullName,
  //               })
  //             );
  //             await AsyncStorage.setItem(
  //               "OfflineUserInfo",
  //               JSON.stringify({
  //                 userId: responseData.id,
  //                 designation: responseData.designation,
  //                 fullName: responseData.fullName,
  //               })
  //             );
  //           }
  //         }
  //       } catch (e) {
  //         console.log(e);
  //       }
  //       setIsOnline(true);
  //     } else {
  //       setIsOnline(false);
  //       loginOfflineHandler();
  //       console.log("This is running from offline");
  //     }
  //   });
  // };

  // const displayName = fullName || offlineUserInfo.fullName || "";
  // const displayDesignation = designation || offlineUserInfo.designation || "";

  // const data = displayName?.trim().split(" ");
  // const firstInitial = data[0]?.charAt(0).toUpperCase();
  // const secondInitial = data[2]?.charAt(0).toUpperCase();

  // useFocusEffect(
  //   useCallback(() => {
  //     checkInternetHandler();
  //     // getUsers();
  //     return () => {
  //       console.log("Screen unfocused");
  //     };
  //   }, [])
  // );

  useEffect(() => {
    getProfileHandler();
  }, [isOnline]);

  useEffect(() => {
    if (fullName) {
      let arr = fullName.split(" ");
      const firstInitial = arr[0]?.charAt(0).toUpperCase();
      const secondInitial = arr[arr.length - 1]?.charAt(0).toUpperCase();
      setFirstLetter(firstInitial);
      setSecondLetter(secondInitial);
    }
  }, [fullName]);

  useFocusEffect(
    useCallback(() => {
      // Subscribe to connection changes
      const unsubscribe = NetInfo.addEventListener((state) => {
        if (state.isInternetReachable) {
          setIsOnline(true);
        } else {
          setIsOnline(false);
        }
      });

      // Clean up on unmount
      return () => unsubscribe();
    }, [])
  );

  const drawerItems = [
    {
      label: "Home",
      icon: (color: string) => (
        <Ionicons name="home-outline" size={20} color={color} />
      ),
      route: "index",
      isNetRequired: false,
    },
    {
      label: "Device Preparation",
      icon: (color: string) => (
        <Ionicons name="cloud-download-outline" size={20} color={color} />
      ),
      route: "device-preparation",
      isNetRequired: true,
    },
    // {
    //   label: "Database Test",
    //   icon: (color: string) => (
    //     <FontAwesome5 name="database" size={20} color={color} />
    //   ),
    //   route: "database-test",
    //   isNetRequired: false,
    // },
    {
      label: "Primary Screening",
      icon: (color: string) => (
        <Feather name="search" size={20} color={color} />
      ),
      route: "primary-screening",
      isNetRequired: false,
    },
    {
      label: "Detailed Evaluation",
      icon: (color: string) => (
        <Ionicons name="recording-outline" size={20} color={color} />
      ),
      route: "mr-tag",
      isNetRequired: false,
    },
    {
      label: "Spectacle Booking",
      icon: (color: string) => (
        <Ionicons name="recording-outline" size={20} color={color} />
      ),
      route: "spectacle-booking",
      isNetRequired: false,
    },
    {
      label: "View QR Code",
      icon: (color: string) => (
        <Ionicons name="qr-code-outline" size={20} color={color} />
      ),
      route: "qr-codes",
      isNetRequired: false,
    },
    {
      label: "GPS Data Collection",
      icon: (color: string) => (
        <MaterialCommunityIcons name="crosshairs-gps" size={20} color={color} />
      ),
      route: "gps-data-collection",
      isNetRequired: false,
    },
    {
      label: "Data Sync",
      icon: (color: string) => (
        <Ionicons name="cloud-upload-outline" size={20} color={color} />
      ),
      route: "sync-to-server",
      isNetRequired: true,
    },
    {
      label: "Remove School",
      icon: (color: string) => (
        <MaterialCommunityIcons name="bank-remove" size={20} color={color} />
      ),
      route: "remove-school",
      isNetRequired: false,
    },
    {
      label: "System Update",
      icon: (color: string) => (
        <MaterialCommunityIcons name="update" size={20} color={color} />
      ),
      route: "system-update",
      isNetRequired: true,
    },
  ];

  const activeRouteName = state.routes[state.index].name;

  const handleLogout = async () => {
    console.log("Logging Out....");
    try {
      dispatch(setLoggedOut());

      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("expiry");
      await AsyncStorage.removeItem("OfflineUserInfo");
      console.log(
        "from logged out",
        await AsyncStorage.getItem("OfflineUserInfo")
      );
    } catch (err) {
      console.log(err);
    }
    router.replace("/(auth)/login");
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.avatar_container}>
          <Text style={styles.avatar}>
            {/* {firstLetter}
            {lastLetter} */}
            {firstLetter}
            {secondLetter}
          </Text>
        </View>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.email}>{designation}</Text>
      </View>
      {/* Drawer Items */}
      <ScrollView style={{ flex: 1 }}>
        {drawerItems.map((item, index) => {
          const isActive = item.route === activeRouteName;
          const itemColor = isActive ? "#2D9CDB" : "#4F4F4F";
          if (isOnline) {
            return (
              <Pressable
                key={index}
                onPress={() => navigation.navigate(item.route)}
                style={({ hovered, pressed }) => [
                  styles.drawerItem,
                  isActive && styles.activeItem,
                  (hovered || pressed) && styles.feedbackItem,
                ]}
              >
                <View style={styles.icon}>{item.icon(itemColor)}</View>
                <Text style={[styles.label, { color: itemColor }]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          } else {
            if (!item.isNetRequired) {
              return (
                <Pressable
                  key={index}
                  onPress={() => navigation.navigate(item.route)}
                  style={({ hovered, pressed }) => [
                    styles.drawerItem,
                    isActive && styles.activeItem,
                    (hovered || pressed) && styles.feedbackItem,
                  ]}
                >
                  <View style={styles.icon}>{item.icon(itemColor)}</View>
                  <Text style={[styles.label, { color: itemColor }]}>
                    {item.label}
                  </Text>
                </Pressable>
              );
            }
          }
        })}
        <View style={{ padding: 10 }}>
          <Pressable onPress={handleLogout}>
            <View style={{ flexDirection: "row", marginLeft: 10 }}>
              <Ionicons name="log-out" size={25} color={Colors.primary} />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  color: Colors.primary,
                  fontWeight: "600",
                }}
              >
                Log Out
              </Text>
            </View>
          </Pressable>
          <View
            style={{ borderWidth: 0.25, borderColor: "#edebe4", marginTop: 20 }}
          ></View>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              paddingLeft: 10,
            }}
          >
            <View style={styles.icon}>
              <Ionicons name="git-branch-outline" size={20} color="#4F4F4F" />
            </View>
            <Text style={styles.label}>Version 1.1.6</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  feedbackItem: {
    backgroundColor: "#f2f2f2",
  },
  profileContainer: {
    backgroundColor: Colors.primary,
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  avatar_container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  email: {
    fontSize: 13,
    color: "#ccc",
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  icon: {
    width: 24,
    alignItems: "center",
    marginRight: 16,
  },
  label: {
    fontSize: 16,
    color: "#636363",
    fontWeight: "500",
  },
  activeItem: {
    backgroundColor: "#E8F6FD",
  },
  hoverItem: {
    backgroundColor: "#F2F2F2",
  },
  versionContainer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 10,
  },
});
