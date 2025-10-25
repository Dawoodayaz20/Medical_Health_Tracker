import * as Notifications from "expo-notifications"
import { getUserProfile } from "@/lib/appwrite_queries";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
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

  const Card = ({ title, icon, href, gradientColors  }: any) => (
    <Pressable
      className="w-[44%] h-36 rounded-2xl p-4 justify-between shadow-md active:scale-95 m-2"
      style={{ elevation: 6 }}
      onPress={() => router.push(href)}
    >
      <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
      position: "absolute",
      inset: 0,
      borderRadius: 16,
      opacity: 0.95,
  }}
    />
      <View className="flex-1 justify-between z-10">
        <Image source={icon} style={{ width: 64, height: 64 }} resizeMode="contain" />
        <Text className="text-white text-lg font-semibold">{title}</Text>
      </View>
    </Pressable>
  );

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

    <SafeAreaView className="flex-1 bg-sky-50">
      <ScrollView contentContainerClassName="p-4">
        {/* Header / Wave area (simplified) */}
        <LinearGradient
          colors={["#38bdf8", "#2563eb"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 24,
            overflow: "hidden",
            padding: 20,
            marginBottom: 24,
          }}
        >
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-white">
              Hi {profile.name} 👋
            </Text>
            <Text className="text-sm text-white/90 mt-1">
              Here’s your health overview
            </Text>
          </View>

          <Image
          style={{width:50, height:50}}
          className="rounded-full border-2 border-white"
          source={profilepic}
          resizeMode="cover"
          />
        </View>

        {/* Glassy profile card */}
        <View className="mt-4 bg-white/20 backdrop-blur-md rounded-2xl p-4 flex-row justify-between items-center shadow-sm">
          <View>
            <View className="flex-row items-center space-x-2">
              <Text className="text-white/95 font-medium">Name: </Text>
              <Text className="text-white font-semibold">{profile.name}</Text>
            </View>
            <View className="flex-row items-center space-x-2 mt-2">
              <Text className="text-white/95">Age: </Text>
              <Text className="text-white">{profile.age} yrs</Text>
            </View>
            <View className="flex-row items-center space-x-2 mt-2">
              <Text className="text-white/95">Gender: </Text>
              <Text className="text-white">{profile.gender}</Text>
            </View>
          </View>

          <View className="items-end">
            <View className="bg-white/30 rounded-lg px-3 py-1">
              <Text className="text-sm font-bold">Health</Text>
              <Text className="text-lg font-extrabold">/100</Text>
            </View>
            <TouchableOpacity className="mt-3 bg-white/30 rounded-full px-3 py-1">
              <Text className="text-sm text-white">Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

        {/* 2x2 cards grid */}
        <View className="flex-row flex-wrap justify-between">
          <Card
            title="Reminders"
            icon={reminder}
            href="/(reminders)/reminderPage"
            gradientColors={["#fb7185", "#f43f5e"]}
          />
          <Card
            title="Medical Records"
            icon={medicalRec}
            href="/(Records)/NotesPage"
            gradientColors={["#34d399", "#10b981"]}
          />
          <Card
            title="Medicines Info"
            icon={medicines}
            href="/(Medicines)/MedicinesPage"
            gradientColors={["#38bdf8", "#0ea5e9"]}
          />
          <Card
            title="Medical Assistant"
            icon={medicalassist}
            href="/(Assistant)/MedicalAssistant"
            gradientColors={["#38bdf8", "#0ea5e9"]}
          />
        </View>

        {/* Future stats placeholder */}
        <View className="mt-6 bg-white rounded-2xl p-4 shadow-sm">
          <Text className="text-gray-700 font-semibold mb-2">Today’s Summary</Text>
          <Text className="text-sm text-gray-500">Medicine adherence, reminders done — chart coming soon.</Text>
        </View>
      </ScrollView>

      {/* Floating Assistant FAB */}
      <TouchableOpacity
        onPress={() => (/* navigate to assistant */ null)}
        className="absolute right-6 bottom-8 w-16 h-16 rounded-full justify-center items-center bg-blue-500 shadow-lg"
        style={{ elevation: 10 }}
      >
        <Text className="text-white text-2xl">🤖</Text>
      </TouchableOpacity>
    </SafeAreaView>
    )
  }