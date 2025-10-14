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

export async function getReminders(): Promise<Reminder[] | null> {
    try{
        const userID = await getAccountID()
        if (!userID) {
            console.log("The user must be logged in!")
            }

        const response = await databases.listDocuments({
            databaseId: process.env.EXPO_PUBLIC_APPWRITE_DOC_ID!,
            collectionId: "reminders",
            queries: [Query.equal("userID", userID)]
        });
            return response.documents.map((doc: any) => ({
                userID: doc.userID,
                title: doc.title,
                description: doc.description,
                time: doc.time,
                date: doc.date
            }));
        }
    catch(err){
        console.log("Error fetching Notes Data", err)
        return null;
    }
}