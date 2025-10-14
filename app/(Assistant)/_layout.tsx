import React from "react";
import { Stack } from "expo-router";

export default function MedicalAgentLayout () {
    return (
    <Stack>
        <Stack.Screen name="medicalAssistant" options={{ title: 'Medical Assistant'}}/>
    </Stack>
)
}