import * as Notifications from "expo-notifications"
import { getUserProfile } from "@/lib/appwrite_queries";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from 'react-native-paper';
import { ProfileContext } from "../../lib/ProfileData_DB/profileContext";
import { LinearGradient } from "expo-linear-gradient";
import '../globals.css'

export default function Index() {
  
  const reminder = require('../../assets/images/reminder.png');
  const medicalRec = require('../../assets/images/medicalrecords.png');
  const medicalassist = require('../../assets/images/medicalassist.png');
  const medicines = require('../../assets/images/medicines.png');
  const profilepic = require('../../assets/images/Zulkifl Profile1.jpg');
  const { profile, setProfile } = useContext(ProfileContext)

  const router = useRouter();

  // const Card = ({ title, icon, href, gradientColors  }: any) => (
  //   <TouchableOpacity
  //     className="w-[48%] mb-4 rounded-2xl overflow-hidden shadow-md"
  //     style={{ elevation: 6 }}
  //     onPress={() => router.push(href)}
  //   >
  //     <LinearGradient
  //     colors={gradientColors}
  //     start={{ x: 0, y: 0 }}
  //     end={{ x: 1, y: 1 }}
  // //     style={{
  // //     position: "absolute",
  // //     inset: 0,
  // //     borderRadius: 16,
  // //     opacity: 0.95,
  // // }}
  // className="p-4 items-center justify-center rounded-2xl h-32"
  //   >
  //     {/* <View className="flex-1 justify-between z-10">
  //       <Image source={icon} style={{ width: 64, height: 64 }} resizeMode="contain" />
  //       <Text className="text-white text-lg font-semibold">{title}</Text>
  //     </View> */}
  //     <Image source={icon} className="w-12 h-12 mb-2" resizeMode="contain" />
  //     <Text
  //       className="text-base font-semibold text-black text-center leading-tight"
  //       numberOfLines={2}
  //       adjustsFontSizeToFit
  //     >
  //       {title}
  //     </Text>
  //   </LinearGradient>
  //   </TouchableOpacity>
  // );

  useEffect(() => {
        const userData = async () => {
          try {
            const data = await getUserProfile()
            console.log(data)
            if(data) {
            setProfile({
              name: data.name || "",
              age: data.age || "",
              gender: data.gender || "",
              email: data.email || ""
            })
          };
          }
          catch(err) {
          console.log(`There was an error fetching the user profile:${err}`)
          }
        };
        userData()
      }, [])

  return (
    // <SafeAreaView className="flex-1 bg-slate-300">
    //   <ScrollView contentContainerClassName="p-3">
    //     <View className="mt-12 justify-center items-center">
    //       <Text className="text-2xl font-semibold text-blue-500">Profile</Text>

    //       <View className="w-[400px] h-[200px] flex-row justify-center m-10 border-2 border-blue-500 rounded-lg">
    //         <View className="m-3 justify-center">
    //           <Text>Name: {profile.name}</Text>
    //           <Text>Age: {profile.age} years</Text>
    //           <Text>Gender: {profile.gender}</Text>
    //         </View>
    //         <Image source={profilepic} className="w-36 h-36 m-12 rounded-full" />
    //       </View>

    //       <View className="flex-row flex-wrap justify-center items-center w-[450px] my-10">
    //         <TouchableOpacity>
    //           <View className="flex-row justify-center items-center bg-blue-500 w-[180px] p-5 rounded-xl m-4">
    //             <Link href="/(reminders)/reminderPage">
    //               <Text className="text-white font-medium text-base">Reminders</Text>
    //             </Link>
    //             <Image source={reminder} className="w-8 h-9 ml-2" resizeMode="contain" />
    //           </View>
    //         </TouchableOpacity>

    //         <View className="flex-row justify-center items-center bg-blue-500 w-[180px] p-5 rounded-xl m-4">
    //           <Link href="/(Records)/NotesPage">
    //             <Text className="text-white font-medium text-base">Medical Records</Text>
    //           </Link>
    //           <Image source={medicalRec} className="w-8 h-9 ml-2" resizeMode="contain" />
    //         </View>

    //         <View className="flex-row justify-center items-center bg-blue-500 w-[180px] p-5 rounded-xl m-4">
    //           <Link href="/(Medicines)/MedicinesPage">
    //             <Text className="text-white font-medium text-base">Medicines</Text>
    //           </Link>
    //           <Image source={medicines} className="w-8 h-9 ml-2" resizeMode="contain" />
    //         </View>

    //         <View className="flex-row justify-center items-center bg-blue-500 w-[180px] p-5 rounded-xl m-4">
    //           <Link href="/(Assistant)/medicalassistant">
    //             <Text className="text-white font-medium text-base">Medical Assistant</Text>
    //           </Link>
    //           <Image source={medicalassist} className="w-8 h-9 ml-2" resizeMode="contain" />
    //         </View>
    //       </View>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>

    // For IOS:
    // <SafeAreaView className="flex-1 bg-sky-50">
    //   <ScrollView 
    //   contentContainerClassName="p-4"
    //   >
    //     {/* Header / Wave area (simplified) */}
    //     <LinearGradient
    //       colors={["#38bdf8", "#2563eb"]}
    //       start={{ x: 0, y: 0 }}
    //       end={{ x: 1, y: 0 }}
    //       style={{
    //         borderRadius: 24,
    //         overflow: "hidden",
    //         padding: 20,
    //         marginBottom: 24,
    //       }}
    //     >
    //     <View className="flex-row justify-between items-center">
    //       <View>
    //         <Text className="text-2xl font-bold text-white">
    //           Hi {profile.name} 👋
    //         </Text>
    //         <Text className="text-sm text-white/90 mt-1">
    //           Here’s your health overview
    //         </Text>
    //       </View>

    //       <Image
    //       style={{width:50, height:50}}
    //       className="rounded-full border-2 border-white"
    //       source={profilepic}
    //       resizeMode="cover"
    //       />
    //     </View>

    //     {/* Glassy profile card */}
    //     <View className="mt-4 bg-white/20 backdrop-blur-md rounded-2xl p-4 flex-row justify-between items-center shadow-sm">
    //       <View>
    //         <View className="flex-row items-center space-x-2">
    //           <Text className="text-white/95 font-medium">Name: </Text>
    //           <Text className="text-white font-semibold">{profile.name}</Text>
    //         </View>
    //         <View className="flex-row items-center space-x-2 mt-2">
    //           <Text className="text-white/95">Age: </Text>
    //           <Text className="text-white">{profile.age} yrs</Text>
    //         </View>
    //         <View className="flex-row items-center space-x-2 mt-2">
    //           <Text className="text-white/95">Gender: </Text>
    //           <Text className="text-white">{profile.gender}</Text>
    //         </View>
    //       </View>

    //       <View className="items-end">
    //         <View className="bg-white/30 rounded-lg px-3 py-1">
    //           <Text className="text-sm font-bold">Health</Text>
    //           <Text className="text-lg font-extrabold">80/100</Text>
    //         </View>
    //         <TouchableOpacity className="mt-3 bg-white/30 rounded-full px-3 py-1">
    //           <Text className="text-sm text-white">Edit</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   </LinearGradient>

    //     {/* 2x2 cards grid */}
    //     <View className="flex-row flex-wrap justify-between">
    //       <Card
    //         title="Reminders"
    //         icon={reminder}
    //         href="/(reminders)/reminderPage"
    //         gradientColors={["#fb7185", "#f43f5e"]}
    //       />
    //       <Card
    //         title="Medical Records"
    //         icon={medicalRec}
    //         href="/(Records)/NotesPage"
    //         gradientColors={["#34d399", "#10b981"]}
    //       />
    //       <Card
    //         title="Medicines Info"
    //         icon={medicines}
    //         href="/(Medicines)/MedicinesPage"
    //         gradientColors={["#38bdf8", "#0ea5e9"]}
    //       />
    //       <Card
    //         title="Medical Assistant"
    //         icon={medicalassist}
    //         href="/(Assistant)/MedicalAssistant"
    //         gradientColors={["#38bdf8", "#0ea5e9"]}
    //       />
    //     </View>

    //     {/* Future stats placeholder */}
    //     <View className="mt-6 bg-white rounded-2xl p-4 shadow-sm">
    //       <Text className="text-gray-700 font-semibold mb-2">Today’s Summary</Text>
    //       <Text className="text-sm text-gray-500">Medicine adherence, reminders done — chart coming soon.</Text>
    //     </View>
    //   </ScrollView>

    //   {/* Floating Assistant FAB */}
    //   <TouchableOpacity
    //     onPress={() => (/* navigate to assistant */ null)}
    //     className="absolute right-5 bottom-28 w-16 h-16 rounded-full justify-center items-center bg-blue-600 shadow-lg"
    //     style={{ elevation: 10 }}
    //   >
    //     <Text className="text-white text-2xl">🤖</Text>
    //   </TouchableOpacity>
    // </SafeAreaView>

    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Gradient */}
        <LinearGradient
          colors={["#38bdf8", "#2563eb"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.greetingText}>
                Hi {profile.name} 👋
              </Text>
              <Text style={styles.subtitle}>
                Here’s your health overview
              </Text>
            </View>

            <Image
              source={profilepic}
              style={styles.profilePic}
              resizeMode="cover"
            />
          </View>

          {/* Glassy Profile Card */}
          <View style={styles.profileCard}>
            <View>
              <Text style={styles.infoText}>Name: <Text style={styles.infoValue}>{profile.name}</Text></Text>
              <Text style={styles.infoText}>Age: <Text style={styles.infoValue}>{profile.age} yrs</Text></Text>
              <Text style={styles.infoText}>Gender: <Text style={styles.infoValue}>{profile.gender}</Text></Text>
            </View>

            <View style={styles.healthSection}>
              <View style={styles.healthBadge}>
                <Text style={styles.healthLabel}>Health</Text>
                <Text style={styles.healthValue}>80/100</Text>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Cards Grid */}
        <View style={styles.cardsGrid}>
          {[
            { title: "Reminders", colors: ["#fb7185", "#f43f5e"], icon: reminder, links: "/(reminders)/reminderPage" },
            { title: "Medical Records", colors: ["#34d399", "#10b981"], icon: medicalRec, links: "/(Records)/NotesPage" },
            { title: "Medicines Info", colors: ["#38bdf8", "#0ea5e9"], icon: medicines, links: "/(Medicines)/MedicinesPage" },
            { title: "Medical Assistant", colors: ["#38bdf8", "#0ea5e9"], icon: medicalassist, links: "/(Assistant)/MedicalAssistant" },
          ].map((card, i) => (
            <LinearGradient
              key={i}
              colors={card.colors as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <TouchableOpacity onPress={() => router.push(card.links as any)}>
              <View style={styles.cardTop}>
                <Image source={card.icon} style={styles.cardIcon} resizeMode="contain" />
              </View>
              <Text style={styles.cardTitle}>{card.title}</Text>
              </TouchableOpacity>
            </LinearGradient>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Today’s Summary</Text>
          <Text style={styles.summaryText}>
            Medicine adherence, reminders done — chart coming soon.
          </Text>
        </View>
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabIcon}>🤖</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff",
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: Platform.OS === "android" ? 120 : 100,
  },
  headerGradient: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    fontSize: 10,
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
  },
  profilePic: {
    width: 58,
    height: 58,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileCard: {
    marginTop: 16,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      },
      default: {},
    })
  },
  infoText: {
    fontSize: 14,
    marginVertical: 2,
  },
  infoValue: {
    fontWeight: "600",
    ...Platform.select({
      ios: {
        fontWeight: "400"
      },
    })
  },
  healthSection: {
    alignItems: "flex-end",
  },
  healthBadge: {
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  healthLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  healthValue: {
    fontSize: 16,
    fontWeight: "800",
  },
  editButton: {
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 6,
  },
  editText: {
    color: "#fff",
    fontSize: 13,
  },
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    height: 120,
    borderRadius: 18,
    padding: 16,
    justifyContent: "space-between",
    marginBottom: 16,
    overflow: "hidden",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  cardIcon: {
    width: 44,
    height: 44,
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  summaryTitle: {
    color: "#1e293b",
    fontWeight: "600",
    marginBottom: 6,
  },
  summaryText: {
    color: "#475569",
    fontSize: 13,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: Platform.OS === "android" ? 120 : 110,
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  fabIcon: {
    fontSize: 24,
    color: "#fff",
  },
});