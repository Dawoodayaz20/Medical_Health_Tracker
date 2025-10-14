import { Query } from "appwrite";
import { databases, getAccountID } from "./appwrite";


export async function getUserProfile() {
    try{
        const userID = await getAccountID()
        if(userID) {
            const response = await databases.listDocuments({
                databaseId: process.env.EXPO_PUBLIC_APPWRITE_DOC_ID!,
                collectionId: "users",
                queries: [Query.equal("userID", userID)],
        });
            if(response.documents.length > 0){
                return response.documents[0];
            } else {
                return null;
            }
        }
        else{
            console.log("The user is not logged in!")
        }
    }
    catch(error){
        console.log("Error fetching profile data", error)
    }
}

export async function getDocumentID () {
    const userID = await getAccountID()
    
    const response = await databases.listDocuments(
        process.env.EXPO_PUBLIC_APPWRITE_DOC_ID!,
        "users",
        [Query.equal("userID", userID)]
    );
    
    const user$id = response.documents[0].$id
    return user$id
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