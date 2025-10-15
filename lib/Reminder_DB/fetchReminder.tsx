import { account, databases, getAccountID } from "../appwrite"

export async function DeleteReminder(documentId: string) {
    try {
        await databases.deleteDocument(
            process.env.EXPO_PUBLIC_APPWRITE_DOC_ID!,
            "reminders",
            documentId
        );
        console.log("Reminder deleted successfully!");
    } catch (error) {
        console.log("Error deleting reminder:", error);
    }
}