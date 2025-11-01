import React, { useState, useContext } from "react";
import { RemindersContext } from "./remindersContext";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { Button } from "react-native-paper";
import { ArrowLeft } from "lucide-react-native";
import { saveReminder } from "@/lib/Reminder_DB/SaveReminder";

export default function AddReminder () {
    const { reminder, setReminder } = useContext(RemindersContext);
    const params = useLocalSearchParams();
    const [title, setTitle] = useState<any>(params.title || "")
    const [time, setTime] = useState<any>(params.time || "")
    const [description, setDescription] = useState<any>(params.description || "")
    const router = useRouter();

    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft size={22} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Reminder</Text>
        </View>

        {/* Title */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter reminder title"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Time */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Time</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 8:30 AM"
            value={time}
            onChangeText={setTime}
          />
        </View>

        {/* Notes */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add some notes (optional)"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {
              saveReminder(title, time, description);
              router.back();
            }}
          >
            Save Reminder
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#f3f4f6",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#4b5563",
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    width: "100%",
    paddingVertical: 6,
  },
});