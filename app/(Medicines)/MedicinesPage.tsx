import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Plus, ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { MedicineContext } from "./medicinalContext";
import { fetchMedicines } from "@/lib/Medicines_DB/fetchMedicines_DB";

export default function MedicinesPage() {
    const router = useRouter();
    const { medicine, setMedicine } = useContext(MedicineContext);

//   const medicines = [
//     { id: 1, name: "Paracetamol", illness: "Fever" },
//     { id: 2, name: "Amoxicillin", illness: "Infection" },
//     { id: 3, name: "Ibuprofen", illness: "Headache" },
//   ];

    useEffect(() => {
        const fetchMedicine = async() => {
            const medicines = await fetchMedicines()
            if(medicines){
                console.log(medicines)
                setMedicine(medicines)
            };
        };

        fetchMedicine();
    }, [])

  return (
    <View className="flex-1 bg-blue-50 p-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <ArrowLeft onPress={(() => router.back())} size={22} color="black" />
        <Text className="text-2xl font-bold text-blue-700">Medicines</Text>
        <TouchableOpacity
          onPress={() => router.push("/AddMedicines")}
          className="bg-blue-600 p-2 rounded-full"
        >
          <Plus color="white" size={22} />
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={medicine}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-200"
          >
            <Text className="text-lg font-semibold text-gray-800">
              {item.name}
            </Text>
            <Text className="text-lg font-semibold text-gray-800">
              {item.illness}
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              For: {item.dosage}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
    )
}