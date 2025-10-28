import { ID } from "appwrite"
import { account, databases } from "../appwriteConfig"

export async function saveNoteToAppwrite (title: string, date: string, med_note: string) {

    const accountInfo = await account.get()
    const userId = accountInfo.$id

    try{
        await databases.createDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
        "medical_notes",
        ID.unique(),
        {
            userId: userId,
            title,
            date,
            med_note,
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