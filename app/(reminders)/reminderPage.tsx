import { useContext, useEffect, useState } from "react"
import { Text, Button } from "react-native-paper"
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { RemindersContext } from "./remindersContext"
import { Plus, ArrowLeft, Trash2, Pencil } from "lucide-react-native"
import { useRouter } from "expo-router"
import { getReminders } from "@/lib/Reminder_DB/SaveReminder"
import { DeleteReminder } from "@/lib/Reminder_DB/fetchReminder"

export default function Reminders() {
    const { reminder, setReminder } = useContext(RemindersContext)
    const router = useRouter()

    useEffect(() => {
      const fetchReminders = async() => {
        const reminders = await getReminders()
        if(reminders){
          console.log(reminders)
          setReminder(reminders)
        }
      };
      fetchReminders();
    }, [])
    
    return (
        <View className="bg-slate-300">
            <View className="flex-1 bg-white px-4 pt-12">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-10">
                <TouchableOpacity className="p-2 rounded-full bg-gray-100">
                <ArrowLeft onPress={(() => router.back())} size={22} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-semibold text-gray-800">Reminders</Text>
                <TouchableOpacity className="p-2 rounded-full bg-blue-500">
                <Plus onPress={(() => router.push({pathname: "./AddReminder"}))} size={22} color="white" />
                </TouchableOpacity>
            </View>
            </View>

            {/* Reminders List */}
      <ScrollView showsVerticalScrollIndicator={false} className="mt-10">
        {reminder.map((item) => (
          <View
            key={item.id}
            className="flex-row justify-between items-center bg-gray-50 px-4 py-3 mb-3 rounded-2xl shadow-sm"
          >
            <Text className="text-base font-semibold text-gray-800">
              {item.title}
            </Text>
            <Text className="text-sm text-gray-500">{item.time}</Text>
            <TouchableOpacity onPress={() =>
                    router.push({pathname:'./AddReminder',
                        params:{
                            id: item.id,
                            title: item.title,
                            time: item.time,
                            description: item.description
                        },
                    })}>
            <Pencil />
            </TouchableOpacity>
            <TouchableOpacity>
            <Trash2 onPress={(() => DeleteReminder(item.id))}/>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>

    )
}
