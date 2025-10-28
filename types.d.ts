type Note = {
    id: string,
    userId: number,
    title: string,
    date: string,
    med_note: string
}

type Profile = {
    docId: string
    name: string,
    age: string,
    gender: string
    email: string
}

type Reminder = {
    id: string,
    userID: string,
    title: string,
    time: number, 
    description: string
}

type Medicines = {
    id: string,
    userID: string,
    name: string,
    illness: string,
    dosage: string,
    detail: string
}