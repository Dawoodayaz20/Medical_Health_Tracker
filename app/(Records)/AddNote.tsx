import React, { useState, useContext } from "react";
import { NotesContext } from "./notesContext";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { saveNoteToAppwrite } from "@/lib/Notes_DB/SaveNotes";

export default function AddNote () {
    const { notes, setNotes } = useContext(NotesContext);
    const params = useLocalSearchParams()
    const [title, setTitle] = useState<any>(params.title || '')
    const [date, setDate] = useState<any>(params.date ||'')
    const [med_note, setNote] = useState<any>(params.med_note ||'')

    const router = useRouter()

    return(
        // 
        <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {params.id ? "Edit Note" : "New Note"}
          </Text>
          <Button
            mode="contained"
            onPress={() => router.back()}
            onPressIn={() => saveNoteToAppwrite(title, date, med_note)}
            style={styles.saveButton}
            labelStyle={styles.saveButtonLabel}
          >
            {params.id ? "Update" : "Save"}
          </Button>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <TextInput
            label="Title"
            mode="outlined"
            value={title}
            onChangeText={setTitle}
            style={styles.textInput}
          />
          <TextInput
            label="Date"
            mode="outlined"
            value={date}
            onChangeText={setDate}
            placeholder="e.g. 19 Aug 2025"
            style={styles.textInput}
          />
          <TextInput
            label="Medical Note"
            mode="outlined"
            value={med_note}
            onChangeText={setNote}
            multiline
            style={[styles.textInput, styles.noteInput]}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E3A8A",
  },
  saveButton: {
    backgroundColor: "#1E90FF",
    borderRadius: 10,
    elevation: 3,
  },
  saveButtonLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  inputContainer: {
    gap: 16,
  },
  textInput: {
    backgroundColor: "#fff",
  },
  noteInput: {
    minHeight: 120,
    textAlignVertical: "top", // Ensures multiline text starts at the top on Android
  },
});