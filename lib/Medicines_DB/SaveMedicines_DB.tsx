import { ID } from "appwrite"
import { databases, getAccountID } from "../appwrite"

export async function SaveMedicines (name: string, illness: string, dosage: string, time: string, notes: string) {

    const userId = await getAccountID()

    try{
        await databases.createDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DOC_ID!,
        "medicines",
         ID.unique(),
        {
            userID: userId,
            name,
            illness,
            dosage,
            time
        },  
        [
        `read("user:${userId}")`,
        `write("user:${userId}")`
        ],
    )
    console.log("Info saved successfully!")
    }
    catch(error){
        console.log("There was an error saving the Medicinal information:", error)
    }
}