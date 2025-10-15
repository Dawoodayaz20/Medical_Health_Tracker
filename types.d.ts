type Note = {
    id: string,
    userId: number,
    title: string,
    date: string,
    med_note: string
}

type Profile = {
    name: string,
    age: string,
    gender: string
    email: string
}

type Reminder = {
    userID: string,
    title: string,
    description: string,
    time: number, 
    date: number
}

type Medicines = {
    id: string,
    userID: string,
    name: string,
    illness: string,
    dosage: string,
    notes: string
}