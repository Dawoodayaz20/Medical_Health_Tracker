import React from "react";
import { Stack } from "expo-router";

export default function MedicalAgentLayout () {
    return (
    <Stack>
        <Stack.Screen name="medicalassistant" options={
            { title: 'Medical Assistant',
              headerShown:true
            }
            }/>
    </Stack>
)
}