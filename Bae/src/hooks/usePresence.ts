import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import api from "../services/api";

export const usePresence = () => {
  const appState = useRef(AppState.currentState);

  const setOnline = async (online: boolean) => {
    try {
      await api.put("/users/status", { isOnline: online });
      console.log(online ? "🟢 Online" : "⚫ Offline - last seen updated");
    } catch (e) {}
  };

  useEffect(() => {
    // App khulte hi online
    setOnline(true);

    const subscription = AppState.addEventListener("change", (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        // User wapas aya app me
        setOnline(true);
      } else if (nextAppState.match(/inactive|background/)) {
        // User app se gaya (home button, dusri app)
        setOnline(false);
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
      setOnline(false); // App band hote hi offline
    };
  }, []);
};