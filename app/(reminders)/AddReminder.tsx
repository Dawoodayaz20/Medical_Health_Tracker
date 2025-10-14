import React, { useState, useContext } from "react";
import { RemindersContext } from "./remindersContext";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { Button } from "react-native-paper";
import { ArrowLeft } from "lucide-react-native";
import { saveReminder } from "@/lib/Reminder_DB/SaveReminder";

export default function AddReminder () {
    const { reminder, setReminder } = useContext(RemindersContext);
    const params = useLocalSearchParams();
    const [title, setTitle] = useState<any>(params.title || "")
    const [time, setTime] = useState<any>(params.title || "")
    const [description, setDescription] = useState<any>(params.title || "")
    const router = useRouter();

    const showState = () => console.log(description, time)

    return (
        <View className="flex-1 bg-white px-5 pt-12">
      {/* Header */}
      <View className="flex-row items-center mb-8">
        <TouchableOpacity className="p-2 rounded-full bg-gray-100 mr-3">
          <ArrowLeft onPress={(() => router.back())} size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-800">
          Add Reminder
        </Text>
      </View>

      {/* Input fields */}
      <View className="space-y-4">
        <View>
          <Text className="text-gray-600 mb-1 font-medium">Title</Text>
          <TextInput
            className="bg-gray-100 rounded-2xl p-3 text-base"
            placeholder="Enter reminder title"
            value={title}
            onChangeText={setTitle}
          />
        </View>
      </View>
      <View>
          <Text className="text-gray-600 mb-1 font-medium">Time</Text>
          <TextInput
            className="bg-gray-100 rounded-2xl p-3 text-base"
            placeholder="e.g. 8:30 AM"
            value={time}
            onChangeText={setTime}
          />
        </View>

        <View>
          <Text className="text-gray-600 mb-1 font-medium">Notes</Text>
            <TextInput
                className="bg-gray-100 rounded-2xl p-3 text-base"
                placeholder="Add some notes (optional)"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
            />
        </View>
      
      {/* Save Button */}
        <View className="items-center">
            <Button 
            mode="contained"
            onPress={(() => saveReminder(title, time, description))}
            className="bg-blue-500 text-center py-3 rounded-2xl mt-8 w-40">
                <Text className="text-white text-center text-base font-semibold">
                Save Reminder
                </Text>
            </Button>
        </View>
      </View>
    )
}