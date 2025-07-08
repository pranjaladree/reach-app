import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import { setLoggedOut } from "@/store/slices/user-slice";
import CustomButton from "../utils/CustomButton";
import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = ({
  navigation,
  state,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const drawerItems = [
    {
      label: "Home",
      icon: (color: string) => (
        <Ionicons name="home-outline" size={20} color={color} />
      ),
      route: "index",
    },
    {
      label: "Device Preparation",
      icon: (color: string) => (
        <Ionicons name="cloud-download-outline" size={20} color={color} />
      ),
      route: "device-preparation",
    },
    {
      label: "Database Test",
      icon: (color: string) => (
        <FontAwesome5 name="database" size={20} color={color} />
      ),
      route: "database-test",
    },
    {
      label: "Primary Screening",
      icon: (color: string) => (
        <Feather name="search" size={20} color={color} />
      ),
      route: "primary-screening",
    },
    {
      label: "Detailed Evaluation",
      icon: (color: string) => (
        <Ionicons name="pricetag-outline" size={20} color={color} />
      ),
      route: "mr-tag",
    },
    {
      label: "View QR Code",
      icon: (color: string) => (
        <Ionicons name="qr-code-outline" size={20} color={color} />
      ),
      route: "qr-codes",
    },
    {
      label: "Spectacle Booking",
      icon: (color: string) => (
        <MaterialCommunityIcons
          name="ticket-confirmation-outline"
          size={20}
          color={color}
        />
      ),
      route: "spectacle-booking",
    },
    {
      label: "GPS Data Collection",
      icon: (color: string) => (
        <MaterialCommunityIcons name="crosshairs-gps" size={20} color={color} />
      ),
      route: "gps-data-collection",
    },
    {
      label: "Data Sync",
      icon: (color: string) => (
        <Ionicons name="cloud-upload-outline" size={20} color={color} />
      ),
      route: "sync-to-server",
    },
    {
      label: "Remove School",
      icon: (color: string) => (
        <MaterialCommunityIcons name="bank-remove" size={20} color={color} />
      ),
      route: "remove-school",
    },
    {
      label: "System Update",
      icon: (color: string) => (
        <MaterialCommunityIcons name="update" size={20} color={color} />
      ),
      route: "system-update",
    },
  ];

  const activeRouteName = state.routes[state.index].name;

  const handleLogout = async () => {
    console.log("Logging Out....");
    try {
      dispatch(setLoggedOut());
    } catch (err) {
      console.log(err);
    }
    router.replace("/(auth)/login");
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        {/* <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        /> */}
        <Text style={styles.name}></Text>
        <Text style={styles.email}></Text>
      </View>
      {/* Drawer Items */}
      <View style={{ flex: 1 }}>
        {drawerItems.map((item, index) => {
          const isActive = item.route === activeRouteName;
          const itemColor = isActive ? "#2D9CDB" : "#4F4F4F";
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
        })}
        <View style={{ padding: 10, marginTop: 20 }}>
          <CustomButton title="Logout" onPress={handleLogout} />
        </View>
      </View>
      {/* Logout Button */}
      <View style={styles.versionContainer}>
        <View style={styles.drawerItem}>
          <View style={styles.icon}>
            <Ionicons name="git-branch-outline" size={20} color="#4F4F4F" />
          </View>
          <Text style={styles.label}>V 1.0.6</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  feedbackItem: {
    backgroundColor: "#f2f2f2",
  },
  profileContainer: {
    backgroundColor: "#228ed2",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
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
