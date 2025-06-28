import CustomDrawerContent from "@/components/new_UI/CustomDrawerContent";
import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";

export default function Layout() {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          // drawerType: isLargeScreen ? "permanent" : "front",
          drawerActiveTintColor: "#2D9CDB",
          drawerInactiveTintColor: "#4F4F4F",
          drawerLabelStyle: {
            marginLeft: 20,
            fontSize: 16,
          },
          drawerStyle: {
            backgroundColor: "#fff",
            paddingTop: 0,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
            headerRight: () => {
              return <Button>Open</Button>;
            },
          }}
        />
        <Drawer.Screen
          name="device-preparation"
          options={{
            drawerLabel: "Device Preparation",
            title: "Device Preparation",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="build" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="database-test"
          options={{
            drawerLabel: "Database Test",
            title: "Database Test",
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="database" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="primary-screening"
          options={{
            drawerLabel: "Primary Screening",
            title: "Primary Screening",
            drawerIcon: ({ color, size }) => (
              <Feather name="search" size={size} color={color} />
            ),
            headerRight: () => {
              return <Button>Open</Button>;
            },
          }}
        />
        <Drawer.Screen
          name="sync-to-server"
          options={{
            drawerLabel: "Sync To Server",
            title: "Sync To Server",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="cloud-upload-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="mr-tag"
          options={{
            drawerLabel: "MR Tag",
            title: "Detailed Evaluation",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="pricetag-outline" size={size} color={color} />
            ),
          }}
        />

        {/* QR code  */}
        <Drawer.Screen
          name="qr-codes"
          options={{
            drawerLabel: "View QR Codes",
            title: "View QR Code",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="qr-code" size={24} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="remove-school"
          options={{
            drawerLabel: "Remove School",
            title: "Remove School",
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="bank-remove"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="system-update"
          options={{
            drawerLabel: "System Update",
            title: "System Update",
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="update" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="spectacle-booking"
          options={{
            drawerLabel: "Spectacle Booking",
            title: "Spectacle Booking",
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="ticket-confirmation-outline"
                size={24}
                color={color}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="gps-data-collection"
          options={{
            drawerLabel: "GPS Data Collection",
            title: "GEO Location",
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="crosshairs-gps"
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
