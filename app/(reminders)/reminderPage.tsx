import { useContext, useEffect, useState, useCallback } from "react"
import { View, StyleSheet, TouchableOpacity, ScrollView, Text, FlatList } from "react-native"
import { RemindersContext } from "./remindersContext"
import { Plus, ArrowLeft, Trash2, Pencil } from "lucide-react-native"
import { useRouter, useFocusEffect } from "expo-router"
import { getReminders, DeleteReminder } from "@/lib/Reminder_DB/fetch_Delete"

export default function Reminders() {
    const { reminder, setReminder } = useContext(RemindersContext)
    const router = useRouter()

    // useEffect(() => {
    //   const fetchReminders = async() => {
    //     const reminders = await getReminders()
    //     if(reminders){
    //       console.log(reminders)
    //       setReminder(reminders)
    //     }
    //   };
    //   fetchReminders();
    // }, [])

    useFocusEffect(
      useCallback(() => {
        const fetchReminders = async() => {
        try
        {
          const reminders = await getReminders()
        if(reminders){
          console.log(reminders)
          setReminder(reminders)
        }
        }
        catch(error) {
            console.log("There was an error fetching the notes", error)
        }
      }
      fetchReminders();
    }, [])
    );
    
    return (
      <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <ArrowLeft size={22} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Medical Reminders</Text>

        <TouchableOpacity
          style={[styles.iconButton, styles.addButton]}
          onPress={() => router.push({ pathname: "./AddReminder" })}
        >
          <Plus size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Reminders List */}
      <FlatList
        data={reminder}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reminderCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.reminderTitle}>{item.title}</Text>
              <Text style={styles.reminderTime}>{item.time}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "./AddReminder",
                    params: {
                      id: item.id,
                      title: item.title,
                      time: item.time,
                      description: item.description,
                    },
                  })
                }
              >
                <Pencil />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => DeleteReminder(item.id)}>
                <Trash2 />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  iconButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#F3F4F6",
  },
  addButton: {
    backgroundColor: "#3B82F6",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D4ED8",
  },
  reminderCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  reminderTime: {
    fontSize: 14,
    color: "#6B7280",
  },
  actions: {
    flexDirection: "row",
    gap: 16,
    marginLeft: 10,
  },
});