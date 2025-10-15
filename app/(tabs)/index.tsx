import { getUserProfile } from "@/lib/appwrite_queries";
import { Link } from "expo-router";
import { useContext, useEffect } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from 'react-native-paper';
import { ProfileContext } from "../../lib/ProfileData_DB/profileContext";

export default function Index() {
  
  const reminder = require('../../assets/images/reminder.png');
  const medicalRec = require('../../assets/images/medicalrecords.png');
  const medicalassist = require('../../assets/images/medicalassist.png');
  const medicines = require('../../assets/images/medicines.png');
  const profilepic = require('../../assets/images/Zulkifl Profile1.jpg');
  const { profile, setProfile } = useContext(ProfileContext)

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
    <SafeAreaView style={{ flex: 1 }} className="bg-slate-300">
    <ScrollView contentContainerStyle={{ padding: 10 }}>
    <View style={styles.outerView}>
      <Text style={styles.heading} variant="headlineMedium">
        Profile
      </Text>
      
      <View style={styles.profile}>
        <View style={styles.textview}>
          <Text>Name: {profile.name}</Text>
          <Text>Age: {profile.age} years</Text>
          <Text>Gender: {profile.gender}</Text>
          {/* <Text>Description: CP Child</Text> */}
        </View>
        <View>
          <Image style={styles.profilepic} source={profilepic}></Image>
        </View>
      </View>

    <View style={styles.sections}>
    <TouchableOpacity>
      <View
        style={styles.view}>
          <Link href="/(reminders)/reminderPage"><Text variant="labelLarge">Reminders</Text></Link>
            <Image 
              source={reminder}
              style={[styles.icons, {resizeMode: 'contain'}]} />
      </View>
    </TouchableOpacity>
    
    <View
      style={styles.view}>
        <Link href="/(Records)/NotesPage"><Text variant="labelLarge">Medical Records</Text></Link>
          <Image 
            source={medicalRec}
            style={[styles.icons, {resizeMode: 'contain'}]} />
    </View>
    
    <View
      style={styles.view}>
        <Link href="/(Medicines)/MedicinesPage"><Text variant="labelLarge">Medicines</Text></Link>
          <Image 
            source={medicines}
            style={[styles.icons, {resizeMode: 'contain'}]} />
    </View>
    
    <View
      style={styles.view}>
        <Link href="/(Assistant)/medicalassistant"><Text variant="labelLarge">Medical Assistant</Text></Link>
          <Image 
            source={medicalassist}
            style={[styles.icons, {resizeMode: 'contain'}]} />
    </View>
    </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading:{
    color:'#1E90FF'
  },
  outerView:{
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
        // color:'green',
        // tintColor:'green',
  },
  profile:{
    width:400,
    height:200,
    justifyContent: 'center',
    margin: 40,
    borderColor: '#1E90FF',
    borderWidth: 2,
    borderRadius: 10,
    flexDirection:'row'
  },
  textview:{
    margin: 10,
    justifyContent:'center',
    fontSize: 12
    
  },
  profilepic:{
    width: 100,
    height: 100,
    margin: 50,
    borderRadius: 60
  },
  sections:{
    flexDirection:'row',
    flexWrap:'wrap',
    marginBlock: 40,
    justifyContent: 'center',
    alignItems: "center",
    width:450
  },
  view:{
        cursor: 'pointer',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#1E90FF',
        width:180,
        padding: 20,
        borderRadius: 15,
        margin: 15,
        flexDirection:'row',
      },
  icons:{
    width: 33,
    height: 35,
    margin: 5,
  }
})
// #BAD4DB