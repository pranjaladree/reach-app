// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { Drawer } from "expo-router/drawer";

// export default function Layout() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Drawer>

//         <Drawer.Screen
//           name="index" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Home",
//             title: "Home",
//           }}
//         />
//         <Drawer.Screen

//           name="device-preparation" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Device Preparation",
//             title: "Device Preparation",
//           }}
//         />
//         <Drawer.Screen
//           name="database-test" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Database Test",
//             title: "Database Test",
//           }}
//         />
//         <Drawer.Screen
//           name="primary-screening" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Primary Screening",
//             title: "Primary Screening",
//           }}
//         />
//         <Drawer.Screen
//           name="sync-to-server" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Sync To Server",
//             title: "Sync To Server",
//           }}
//         />
//         <Drawer.Screen
//           name="mr-tag" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "MR Tag",
//             title: "MR Tag",
//           }}
//         />
//       </Drawer>
//     </GestureHandlerRootView>
//   );
// }

import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import CustomDrawerContent from "@/components/new_UI/CustomDrawerContent";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Redirect } from "expo-router";

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
            headerRight: () => {
              return <Button>Open</Button>;
            },
          }}
        />
        <Drawer.Screen
          name="qr-codes"
          options={{
            drawerLabel: "View QR Code",
            title: "View QR Code",
            drawerIcon: ({ color, size }) => (
              <Feather name="search" size={size} color={color} />
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
