import { saveUserInfo } from "@/lib/appwrite_DB";
import { useAuth } from "@/lib/auth-context";
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { ProfileContext } from "../../lib/ProfileData_DB/profileContext";

export default function LoginScreen() {
    const {signOut} = useAuth();

    const [image, setImage] = useState<string | null>(null);
    const { profile, setProfile } = useContext(ProfileContext);

    
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(!permissionResult.granted){
            alert("Permission to access gallery is required!")
            return;
        }

        //Open gallery
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
    });

    if(!result.canceled) {
        setImage(result.assets[0].uri);
    }
    };

    return(
    <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <TouchableOpacity>
        <View style={styles.outerView}>
        {image && <Image source={{ uri: image }} style={styles.profilePic} />}
        <Button style={styles.button} onPress={pickImage} icon={'camera'} labelStyle={{ color: '#fff' }}>
          Pick Profile Picture
        </Button>
        </View>
      </TouchableOpacity>

      {/* Personal Info Section */}
      <Text style={styles.sectionTitle}>Personal Info</Text>
      <TextInput
        placeholder="Name"
        value={profile.name}
        onChangeText={(text) => setProfile({ ...profile, name: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Age in numbers"
        value={profile.age}
        onChangeText={(text) => setProfile({ ...profile, age: text })}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Gender: Male / Female or Other"
        value={profile.gender}
        onChangeText={(text) => setProfile({ ...profile, gender: text })}
        style={styles.input}
      />
      
      <Text style={styles.input}>
        Email: {profile.email}
      </Text>

      {profile.email
      ?
        <Button style={styles.button} onPress={(() => saveUserInfo(
          profile.name, 
          profile.age, 
          profile.gender, 
          ))}>{"Update Info"}</Button>
      :
        <Button style={styles.button} onPress={(() => saveUserInfo(
          profile.name, 
          profile.age, 
          profile.gender, 
        ))}>{"Save Info"}</Button>}

      <Button style={styles.signOut} onPress={signOut} icon={"logout"}>{" "}
                Sign Out {" "}</Button>

    </ScrollView>
    </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    outerView:{
        marginTop: 80,
        justifyContent: "center",
        alignItems: "center",
    },
    button:{
        margin: 50,
        backgroundColor: '#1E90FF',
    },
    signOut:{
        marginTop: 50,
        backgroundColor:"black"
    },
    container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "90%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
  }
});