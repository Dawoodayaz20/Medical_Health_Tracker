import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Calendar, Clock, ArrowLeft } from "lucide-react-native";
import { SaveMedicines } from "@/lib/Medicines_DB/SaveMedicines_DB";

export default function AddMedicine() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [illness, setIllness] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");
  const [ notes, setNotes] = useState("");

//   const saveMedicine = async () => {
//     if (!medicine.trim() || !illness.trim()) {
//       alert("Please fill in all required fields.");
//       return;
//     }
//     // Later we'll connect this to Appwrite database
//     console.log({ medicine, illness, dosage, time });
//     router.back();
//   };

  return (
    <View>
    <View className="flex-row p-6 items-center text-center">
    <ArrowLeft onPress={(() => router.back())} size={22} color="black"/>
    <Text className="ml-20 text-center text-2xl font-bold text-blue-700">Add Medicine</Text>
    </View>
    <ScrollView className="flex-1 bg-blue-50 p-6">
      <View className="gap-4 flex">
        <TextInput
          placeholder="Medicine Name"
          value={name}
          onChangeText={setName}
          className="bg-white p-4 rounded-xl border border-gray-200 text-gray-800"
        />

        <TextInput
          placeholder="Illness (e.g. Fever, Headache)"
          value={illness}
          onChangeText={setIllness}
          className="bg-white p-4 rounded-xl border border-gray-200 text-gray-800"
        />

        <TextInput
          placeholder="Dosage (optional)"
          value={dosage}
          onChangeText={setDosage}
          className="bg-white p-4 rounded-xl border border-gray-200 text-gray-800"
        />

        <View className="flex-row items-center bg-white p-4 rounded-xl border border-gray-200">
          <Clock size={18} color="#2563eb" />
          <TextInput
            placeholder="Time (e.g. 8:00 AM)"
            value={time}
            onChangeText={setTime}
            className="ml-2 flex-1 text-gray-800"
          />
        </View>
        
        <TextInput
          placeholder="Notes (optional)"
          value={notes}
          onChangeText={setNotes}
          className="bg-white p-4 rounded-xl border border-gray-200 text-gray-800"
        />
      </View>

      <TouchableOpacity
        onPressIn={(() => SaveMedicines(name, illness, dosage, time, notes))}
        onPress={(() => router.back())}
        className="bg-blue-600 p-4 rounded-xl mt-8 shadow-md"
      >
        <Text className="text-white text-center text-lg font-semibold">Save</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
}
