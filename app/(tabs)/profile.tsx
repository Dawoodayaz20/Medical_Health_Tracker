import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { ProfileContext } from "../../lib/ProfileData_DB/profileContext";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { saveUserInfo, UpdateUserInfo } from "@/lib/ProfileData_DB/SaveProfile";
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
      try{
        await saveUserInfo(profile.name, profile.age, profile.gender)
      }
      catch(error){
        console.error("There was an error saving the info:", error)
      }
    };

    const updateUserProfile = async () => {
      try{
        await UpdateUserInfo(profile.docId, profile.name, profile.age, profile.gender)
      }
      catch(error){
        console.log("Error:", error);
      };
    };
    

    return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LinearGradient colors={["#E0EAFC", "#CFDEF3"]} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Profile Picture */}
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
              <View>
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: image || "https://via.placeholder.com/150" }}
                    style={styles.image}
                  />
                </View>
                <View style={styles.cameraIcon}>
                  <MaterialCommunityIcons name="camera" size={20} color="#fff" />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Info Section */}
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Personal Information</Text>

            <TextInput
              placeholder="Name"
              placeholderTextColor="#555"
              value={profile.name}
              onChangeText={(text) => setProfile({ ...profile, name: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Age in numbers"
              placeholderTextColor="#555"
              value={profile.age}
              onChangeText={(text) => setProfile({ ...profile, age: text })}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              placeholder="Gender: Male / Female / Other"
              placeholderTextColor="#555"
              value={profile.gender}
              onChangeText={(text) => setProfile({ ...profile, gender: text })}
              style={styles.input}
            />

            {profile.email ? (
              <Button
                mode="contained"
                onPress={updateUserProfile}
                style={[styles.button, { backgroundColor: "#1E90FF" }]}
              >
                Update Info
              </Button>
            ) : (
              <Button
                mode="contained"
                onPress={saveUserProfile}
                style={[styles.button, { backgroundColor: "#1E90FF" }]}
              >
                Save Info
              </Button>
            )}

            <Button
              mode="contained"
              onPress={signOut}
              icon="logout"
              style={[styles.button, { backgroundColor: "black", marginTop: 30 }]}
            >
              Sign Out
            </Button>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scroll: { paddingBottom: 100 },
  imageContainer: { marginTop: 80, alignItems: "center" },
  imageWrapper: {
    borderWidth: 4,
    borderColor: "#1E90FF",
    borderRadius: 100,
    padding: 3,
  },
  image: { width: 144, height: 144, borderRadius: 72 },
  cameraIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#1E90FF",
    padding: 8,
    borderRadius: 20,
  },
  infoContainer: { paddingHorizontal: 24, marginTop: 40 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
  },
  button: {
    marginVertical: 10,
    borderRadius: 12,
  },
});