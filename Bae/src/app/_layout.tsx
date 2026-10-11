import { Stack } from "expo-router";
import { usePresence } from "../hooks/usePresence";

export default function Layout() {
  usePresence(); // bas yehi kaam hai iska

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="explore" />
      <Stack.Screen name="chat/[id]" />
      <Stack.Screen name="auth" />
    </Stack>
  );
}