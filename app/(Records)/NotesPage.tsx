import { useRouter } from "expo-router";
import { Pencil, Trash2, ArrowLeft, Plus } from "lucide-react-native";
import React, { useContext, useEffect } from "react";
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { NotesContext } from "./notesContext";
import { getNotes } from "@/lib/Notes_DB/fetch_delete";

export default function NotesList() {
    const { notes, setNotes }  = useContext(NotesContext);
    const router = useRouter();

    useEffect(() => {
        const fetchNotes = async () => {
            const notesData = await getNotes()
            if(notesData){
                    console.log(notesData)
                    setNotes(notesData);
            }
            else {
                console.log("There was an error fetching the notes!")
            }
        }
        fetchNotes()
    }, [])

    return(

    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ArrowLeft onPress={() => router.back()} size={22} color="black" />
        <Text style={styles.headerTitle}>Medical Notes</Text>
        <TouchableOpacity
          onPress={() => router.push("/AddNote")}
          style={styles.addButton}
          activeOpacity={0.8}
        >
          <Plus color="white" size={22} />
        </TouchableOpacity>
      </View>

      {/* Notes List */}
      <FlatList
        data={notes}
        keyExtractor={(note) => note.id}
        renderItem={({ item: note }) => (
          <TouchableOpacity activeOpacity={0.7}>
            <View style={styles.noteCard}>
              <View style={styles.noteContent}>
                <Text style={styles.noteDate}>{note.date}</Text>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <Text style={styles.noteText}>{note.med_note}</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "./AddNote",
                      params: {
                        id: note.userId,
                        title: note.title,
                        date: note.date,
                        med_note: note.med_note,
                      },
                    })
                  }
                >
                  <Pencil size={20} color="#1E90FF" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 16 }}>
                  <Trash2 size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No Notes Yet</Text>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF",
    padding: 16,
    paddingTop: 40,
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
  noteCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    elevation: 2,
  },
  noteContent: {
    flex: 1,
    maxWidth: "80%",
  },
  noteDate: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  noteText: {
    fontSize: 14,
    color: "#4B5563",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 40,
    fontSize: 16,
  },
});