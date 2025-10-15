import { ID } from "appwrite"
import { account, databases, getAccountID } from "../appwrite"
import { Query } from "appwrite";

export async function fetchMedicines(): Promise<Medicines[] | null> {
    try{
        const userID = await getAccountID()
        if (!userID) {
            console.log("The user must be logged in!")
            }

        const response = await databases.listDocuments({
            databaseId: process.env.EXPO_PUBLIC_APPWRITE_DOC_ID!,
            collectionId: "medicines",
            queries: [Query.equal("userID", userID)]
        });
            return response.documents.map((doc: any) => ({
                id: doc.$id,
                userID: doc.userID,
                name: doc.name,
                dosage: doc.dosage,
                illness: doc.illness,
                time: doc.time,
                notes: doc.notes
            }));
        }
    catch(err){
        console.log("Error fetching Notes Data", err)
        return null;
    }
}