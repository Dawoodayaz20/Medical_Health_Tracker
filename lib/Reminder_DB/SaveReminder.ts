import { ID } from "appwrite"
import { account, databases, getAccountID } from "../appwrite"
import { Query } from "appwrite";

export async function saveReminder (title: string, description: string, time: string) {

    const userId = await getAccountID()

    try{
        await databases.createDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DOC_ID!,
        "reminders",
        ID.unique(),
        {
            userID: userId,
            title,
            description,
            time,
        },  
        [
        `read("user:${userId}")`,
        `write("user:${userId}")`
        ],
    )
    console.log("Info saved successfully!")
    }
    catch(error){
        console.log("There was an error saving the info:", error)
    }
}

export async function getNotes(): Promise<Note[] | null> {
    try{
        const userID = await getAccountID()
        if (!userID) {
            console.log("The user must be logged in!")
            }

        const response = await databases.listDocuments(
                process.env.EXPO_PUBLIC_APPWRITE_DOC_ID!,
                "medical_notes",
                [Query.equal("userId", userID)]
            );
            return response.documents.map((doc: any) => ({
                id: doc.$id,
                userId: doc.userId,
                title: doc.title,
                date: doc.date,
                med_note: doc.med_note
            }));
        }
    catch(err){
        console.log("Error fetching Notes Data", err)
        return null;
    }
}