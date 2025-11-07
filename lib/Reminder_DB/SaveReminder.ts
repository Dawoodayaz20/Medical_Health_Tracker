import { ID, Query } from "appwrite";
import { databases, getAccountID } from "../appwriteConfig";

export async function saveReminder (title: string, description: string, reminderId: any, hour: number, minute: number) {
    const userId = await getAccountID()

    try{
        await databases.createDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
        "reminders",
         ID.unique(),
        {
            userID: userId,
            title,
            description,
            reminderId,
            hour,
            minute
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

export async function UpdateReminder(
    docId: string,
    title:string, 
    time: string, 
    description: string, 
    ) 
    {
        const userAccount = await getAccountID()
        if(userAccount){
            try{
                await databases.updateDocument(
                process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
                "reminders",
                docId,
                {
                    userID: userAccount,
                    title,
                    time,
                    description
                },  
                [
                `read("user:${userAccount}")`,
                `write("user:${userAccount}")`
                ],
                )
            }
        catch(error){
            console.log("There was an error saving the info:", error)
        }
        }
        else{
            alert("User must be logged in to save info!")
        }
}