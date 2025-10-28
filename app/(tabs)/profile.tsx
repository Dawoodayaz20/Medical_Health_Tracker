import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import * as ImagePicker from 'expo-image-picker';
import { storage } from "@/lib/appwriteConfig";
import React, { useContext, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { ProfileContext } from "../../lib/ProfileData_DB/profileContext";
import '../globals.css'
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { saveUserInfo, UpdateUserInfo, uploadProfileImage } from "@/lib/ProfileData_DB/SaveProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
    const {signOut} = useAuth();

    const [image, setImage] = useState<string>('');
    const { profile, setProfile } = useContext(ProfileContext);
    
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(!permissionResult.granted){
            alert("Permission to access gallery is required!")
            return;
        }
        

        //Open gallery
        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
    });

    if(!result.canceled) {
        // setImage(result.assets[0].uri);
        try {
        await AsyncStorage.setItem("profileImage", result.assets[0].uri);
        console.log("Image saved locally!");
      } catch (error) {
        console.error("Error saving image locally:", error);
      }
    }
    };

    useEffect(() => {
        const loadProfileImage = async () => {
          try {
            const uri = await AsyncStorage.getItem("profileImage");
            if (uri) setImage(uri);
          } catch (error) {
            console.error("Error loading profile image:", error);
          }
        };

        loadProfileImage();
        }, [])

    const saveUserProfile = async () => {
      const fileId = await uploadProfileImage(image);
      await saveUserInfo(profile.name, profile.age, profile.gender, fileId ?? "")
    };

    const updateUserProfile = async () => {
      try{
        const fileId = await uploadProfileImage(image);
        await UpdateUserInfo(profile.docId, profile.name, profile.age, profile.gender, fileId ?? "")
      }
      catch(error){
        console.log("Error:", error);
      };
    };
    

    return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <LinearGradient colors={["#E0EAFC", "#CFDEF3"]} className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Profile Picture */}
          <View className="mt-20 items-center">
            <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
              <View className="relative">
                <View className="rounded-full p-1 border-4 border-blue-500">
                  <Image
                    source={{ uri: image || "https://via.placeholder.com/150" }}
                    className="w-36 h-36 rounded-full"
                  />
                </View>

                {/* Camera Icon Overlay */}
                <View className="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full">
                  <MaterialCommunityIcons name="camera" size={20} color="#fff" />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

          {/* Personal Info Section */}
          <View className="px-6 mt-10">
            <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Personal Information
            </Text>

            <TextInput
              placeholder="Name"
              placeholderTextColor="#555"
              value={profile.name}
              onChangeText={(text) => setProfile({ ...profile, name: text })}
              className="w-full p-3 border border-gray-300 rounded-2xl mb-4 bg-white"
            />
            <TextInput
              placeholder="Age in numbers"
              placeholderTextColor="#555"
              value={profile.age}
              onChangeText={(text) => setProfile({ ...profile, age: text })}
              keyboardType="numeric"
              className="w-full p-3 border border-gray-300 rounded-2xl mb-4 bg-white"
            />
            <TextInput
              placeholder="Gender: Male / Female / Other"
              placeholderTextColor="#555"
              value={profile.gender}
              onChangeText={(text) => setProfile({ ...profile, gender: text })}
              className="w-full p-3 border border-gray-300 rounded-2xl mb-4 bg-white"
            />

            {/* <Text className="text-base text-gray-600 mb-6 text-center">
              Email: {profile.email || "Not available"}
            </Text> */}

            {
            profile.email
              ?
            <Button
              mode="contained"
              onPress={() => updateUserProfile() }
              style={{ backgroundColor: "#1E90FF", marginVertical: 10 }}
            >
              Update Info
            </Button>
              :
            <Button
              mode="contained"
              onPress={() => saveUserProfile() }
              style={{ backgroundColor: "#1E90FF", marginVertical: 10 }}
            >
              Save Info
            </Button>
            }

            <Button
              mode="contained"
              onPress={signOut}
              style={{ backgroundColor: "black", marginTop: 30 }}
              icon="logout"
            >
              Sign Out
            </Button>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}