import { useRouter } from "expo-router";
import { Pencil, Trash2 } from "lucide-react-native";
import React, { useContext, useEffect } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { NotesContext } from "./notesContext";
import { getNotes } from "@/lib/Notes_DB/fetch_delete";

export default function NotesList() {
    const { notes, setNotes }  = useContext(NotesContext);
    const router = useRouter();

    // const deleteNote = (id: number) => {
    //     setNotes(notes.filter((n) =>  n.id !== id))
    //     alert("Note has been deleted")
    // }

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
        <View className="flex-1 bg-blue-50 p-4">
            <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-blue-700"> Medical Notes </Text>
            <Button 
                mode="contained" 
                onPress={() => router.push({pathname: "./AddNote"})}
                className="bg-blue-600 rounded-full">
                +
            </Button>
            </View>
            <FlatList 
            data={notes}
            keyExtractor={(note) => note.id}
            renderItem={({item: note}) => (
                <TouchableOpacity 
                activeOpacity={0.7}
                >
                <View className="bg-white rounded-xl shadow-md p-4 mb-4 flex-row">
                    <View className="w-64">
                    <Text className="text-xs text-gray-400 mb-1">
                        {note.date}
                    </Text>
                    <Text className="text-lg font-semibold text-gray-800">
                        {note.title}
                    </Text>
                    <Text className="text-gray-600 mt-1">
                        {note.med_note}
                    </Text>
                    </View>
                    <TouchableOpacity
                    onPress={() =>
                    router.push({pathname:'./AddNote',
                        params:{
                            id: note.userId,
                            title: note.title,
                            date: note.date,
                            med_note: note.med_note
                        },
                    })}
                    >
                        <Pencil className="mr-4"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Trash2 className="ml-4"/>
                    </TouchableOpacity>
                </View>
                </TouchableOpacity>
                )}
                ListEmptyComponent={<Text>No Notes Yet</Text>}
            />
        </View>
    )
}