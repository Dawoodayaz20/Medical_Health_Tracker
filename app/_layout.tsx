import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import ProfileContextProvider from "../lib/ProfileData_DB/profileContext";
import NotesProvider from "./(Records)/notesContext";
import RemindersContextProvider from "./(reminders)/remindersContext";
import './globals.css';

function RouteGuard({children} : { children: React.ReactNode }){

    // const [isSignUp, setisSignUp] = useState<boolean>(false)
    const {user, isLoadingUser} = useAuth();
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
      const inAuthGroup = segments[0] === "auth"
      if(!user && !inAuthGroup && !isLoadingUser) {
        router.replace("/auth");
      }
      else if(user && inAuthGroup && isLoadingUser){
        router.replace("/");
      }
    }, [user, segments]);

    return <>{children}</>
}

export default function RootLayout() {
  return (
            <AuthProvider>
            <ProfileContextProvider>
            <NotesProvider>
            <RemindersContextProvider>  
            <RouteGuard>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
                <Stack.Screen name="(reminders)" options={{ headerShown: false }}/>
                <Stack.Screen name="(Records)" options={{ headerShown: true, title:'' }}/>
                <Stack.Screen name="(Assistant)" options={{ headerShown:false }}/>
              </Stack>
            </RouteGuard>
            </RemindersContextProvider>
            </NotesProvider>
            </ProfileContextProvider>
            </AuthProvider>  
  );
}
