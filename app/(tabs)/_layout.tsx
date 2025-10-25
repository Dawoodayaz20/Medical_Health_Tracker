// import { Tabs } from "expo-router";
// import {StyleSheet} from "react-native";
// import { MaterialCommunityIcons } from '@expo/vector-icons'
// import '../globals.css'

// export default function TabsLayout() {
//   return (
//     <Tabs screenOptions={
//       { tabBarActiveTintColor : "#1E90FF",
//         tabBarActiveBackgroundColor: "",
//         tabBarInactiveTintColor:'#696969',
//         headerStyle: {backgroundColor: "#1E90FF"},
//         headerShadowVisible: true,
//         tabBarStyle: {
//           backgroundColor: "",
//           borderTopWidth: 0,
//           elevation: 0,
//           shadowOpacity: 0
//         },        
//       }}
//     >
//       {/* #013679 */}
//       <Tabs.Screen name="index" options={{ 
//         title: "Home",
//         headerStyle: styles.headerStyle,
//         headerTintColor: "#fff",
//         headerTitleAlign:'center',
//         tabBarIcon: ({ color, focused }) => (
//         <MaterialCommunityIcons 
//         name="home" 
//         size={12}
//         />)
//         }}/>
//       <Tabs.Screen name="profile" options={{ 
//         title: "Profile",
//         headerStyle: styles.headerStyle,
//         headerTintColor: "#fff",
//         headerTitleAlign:'center',
//         tabBarIcon: ({ color, focused }) => (
//         <MaterialCommunityIcons 
//         name="account" 
//         size={12}
//         />),
//         }}/>
//     </Tabs>
//   );
// }

// const styles = StyleSheet.create ({
//   headerStyle:{
//       backgroundColor: "#1E90FF",
//   }
// })

import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1E90FF",
        tabBarInactiveTintColor: "#9ca3af",
        headerBackground: () => (
          <LinearGradient
            colors={["#38bdf8", "#2563eb"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        ),
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleStyle: { fontWeight: "bold" },
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={focused ? 28 : 22}
              style={focused ? styles.activeIcon : null}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={focused ? 28 : 22}
              style={focused ? styles.activeIcon : null}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
    height: 60,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  activeIcon: {
    transform: [{ scale: 1.1 }],
  },
});
