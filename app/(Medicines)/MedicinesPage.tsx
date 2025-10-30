import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Plus, ArrowLeft, Trash2 } from "lucide-react-native";
import { useRouter } from "expo-router";
import { MedicineContext } from "./medicinalContext";
import { fetchMedicines, DeleteMedicine } from "@/lib/Medicines_DB/fetchMedicines_DB";

export default function MedicinesPage() {
    const router = useRouter();
    const { medicine, setMedicine } = useContext(MedicineContext);

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
//     <View className="flex-1 bg-blue-50 p-6 mt-6">
//       {/* Header */}
//       <View className="flex-row justify-between items-center mb-6">
//         <ArrowLeft onPress={(() => router.back())} size={22} color="black" />
//         <Text className="text-xl font-bold text-blue-700">Medicines</Text>
//         <TouchableOpacity
//           onPress={() => router.push("/AddMedicines")}
//           className="bg-blue-600 p-2 rounded-full"
//         >
//           <Plus color="white" size={22} />
//         </TouchableOpacity>
//       </View>

//       {/* List */}
//       <FlatList
//         data={medicine}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//         <TouchableOpacity
//             activeOpacity={0.7}
//             className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-200"
//             >
//             <View className="flex-row justify-between items-start">
//             <View>
//             <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
//             <Text className="text-sm text-gray-500 mt-1">For: {item.illness}</Text>
//             <Text className="text-sm text-gray-500 mt-1">
//                  Dosage: {item.dosage}
//             </Text>
//             <Text className="text-sm text-gray-500 mt-1">{item.detail}</Text>
//             </View>
//             <TouchableOpacity>
//             <Trash2 onPress={(() => DeleteMedicine(item.id))} size={20} color="#ef4444" /> 
//             </TouchableOpacity>
//             </View>
//         </TouchableOpacity>
//         )}
//       />
//     </View>
//     )
// }

    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ArrowLeft onPress={() => router.back()} size={22} color="black" />
        <Text style={styles.headerTitle}>Medicines</Text>
        <TouchableOpacity
          onPress={() => router.push("/AddMedicines")}
          style={styles.addButton}
          activeOpacity={0.8}
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
            style={styles.card}
          >
            <View style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.medicineName}>{item.name}</Text>
                <Text style={styles.medicineDetail}>For: {item.illness}</Text>
                <Text style={styles.medicineDetail}>Dosage: {item.dosage}</Text>
                <Text style={styles.medicineDetail}>{item.detail}</Text>
              </View>
              <TouchableOpacity onPress={() => DeleteMedicine(item.id)}>
                <Trash2 size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF", // light blue background
    padding: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E40AF",
  },
  addButton: {
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 25,
    elevation: 3,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  medicineName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  medicineDetail: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
});