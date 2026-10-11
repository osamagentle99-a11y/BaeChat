import { View, Text, FlatList, TouchableOpacity, Image, StatusBar, ActivityIndicator, TextInput, AppState, Modal } from "react-native";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import api from "../services/api";
import { storage } from "../services/storage";

type User = {
  _id: string;
  username: string;
  email: string;
  lastMsg?: string;
  isOnline?: boolean;
  lastSeen?: string
};

const getLastSeenText = (user: any) => {
  if (user.isOnline) return "Online";
  if (!user.lastSeen) return "Offline";
  const diff = Date.now() - new Date(user.lastSeen).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return mins + "m ago";
  const hours = Math.floor(mins / 60);
  if (hours < 24) return hours + "h ago";
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  return days + "d ago";
};

export default function ExploreScreen() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [me, setMe] = useState<any>({});
  const appState = useRef(AppState.currentState);

  const setMyStatus = async (online: boolean) => {
    try { await api.put("/auth/status", { isOnline: online }); } catch {}
  };

  const load = async () => {
    try {
      const meData = await storage.getItem("user");
      const meObj = meData? JSON.parse(meData) : {};
      setMe(meObj);
      const myId = String(meObj._id || meObj.id || "");
      const res = await api.get("/users");
      let allUsers = res.data.users || res.data || [];
      allUsers = allUsers.filter((u: any) => String(u._id || u.id || "")!== myId);

      const usersWithLast = await Promise.all(allUsers.map(async (u: any) => {
        try {
          const msgRes = await api.get("/messages/" + u._id);
          const msgs = msgRes.data || [];
          const last = msgs.length > 0? msgs[msgs.length - 1].text : "";
          return {...u, lastMsg: last };
        } catch { return {...u, lastMsg: "" }; }
      }));
      setUsers(usersWithLast);
    } catch (e) { console.log(e); }
    finally { setLoading(false); }
  };

  const handleLogout = async () => {
    try {
      await api.put("/auth/status", { isOnline: false });
      await api.post("/auth/logout");
    } catch {}
    await storage.deleteItem("token");
    await storage.deleteItem("user");
    setShowProfile(false);
    router.replace("/auth");
  };

  useEffect(() => {
    setMyStatus(true);
    load();
    const sub = AppState.addEventListener("change", nextState => {
      if (appState.current.match(/inactive|background/) && nextState === "active") setMyStatus(true);
      else if (nextState.match(/inactive|background/)) setMyStatus(false);
      appState.current = nextState;
    });
    const interval = setInterval(() => load(), 5000);
    return () => { sub.remove(); clearInterval(interval); };
  }, []);

  useFocusEffect(useCallback(() => { load(); }, []));

  if (loading) {
    return <View style={{ flex: 1, backgroundColor: "#0A0710", justifyContent: "center", alignItems: "center" }}><ActivityIndicator color="#8B5CF6" /></View>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0A0710" }}>
      <StatusBar barStyle="light-content" />
      <View style={{ position: "absolute", top: -80, right: -80, width: 250, height: 250, backgroundColor: "#6D28D9", opacity: 0.25, borderRadius: 125 }} />

      {/* HEADER - Logout ki jagah Profile Button */}
      <View style={{ marginTop: 55, paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={require("../../assets/Baelogo.png")} style={{ width: 36, height: 36 }} resizeMode="contain" />
          <Text style={{ color: "white", fontSize: 22, fontWeight: "800", marginLeft: 8 }}>Bae</Text>
        </View>
        <TouchableOpacity onPress={() => setShowProfile(true)} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: "#1A1625", justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#A855F7" }}>
          <Text style={{ color: "#A855F7", fontWeight: "800" }}>{me.username? me.username[0].toUpperCase() : "O"}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={{ color: "white", fontSize: 20 }}>Real Conversations.</Text>
        <Text style={{ color: "#A855F7", fontSize: 20, fontWeight: "800" }}>Stronger Connections.</Text>
      </View>

      <View style={{ margin: 20, backgroundColor: "#1A1625", borderRadius: 12, flexDirection: "row", alignItems: "center", paddingHorizontal: 14, height: 44 }}>
        <Text style={{ color: "#6B7280" }}>Search</Text>
        <TextInput placeholder="Search conversations" placeholderTextColor="#6B7280" style={{ color: "white", marginLeft: 10, flex: 1 }} />
      </View>

      <Text style={{ color: "white", paddingHorizontal: 20, fontSize: 16, fontWeight: "600", marginBottom: 10 }}>Recent chats {users.length}</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 100 }}
        renderItem={({ item }) => {
          const isOnline = item.isOnline;
          return (
            <TouchableOpacity onPress={() => router.push({ pathname: "/chat/[id]" as any, params: { id: item._id, name: item.username } })} style={{ flexDirection: "row", alignItems: "center", paddingVertical: 12 }}>
              <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: isOnline? "#A855F7" : "#2A2340", justifyContent: "center", alignItems: "center", borderWidth: isOnline? 2 : 0, borderColor: "#22C55E" }}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>{item.username[0]?.toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12, borderBottomWidth: 0.5, borderBottomColor: "#1F1D2B", paddingBottom: 12 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ color: "white", fontSize: 15, fontWeight: item.lastMsg? "700" : "600" }}>{item.username}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: isOnline? "#22C55E" : "#4B5563", marginRight: 5 }} />
                    <Text style={{ color: isOnline? "#22C55E" : "#9CA3AF", fontSize: 10, fontWeight: isOnline? "700" : "400" }}>{getLastSeenText(item)}</Text>
                  </View>
                </View>
                <Text style={{ color: item.lastMsg? "#E5E7EB" : "#9CA3AF", fontSize: 13, marginTop: 2 }} numberOfLines={1}>{item.lastMsg || "Tap to start chatting - " + item.email}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* PROFILE MODAL - Click karne pe khulega */}
      <Modal visible={showProfile} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={{ width: "100%", backgroundColor: "#1A1625", borderRadius: 20, padding: 20, borderWidth: 1, borderColor: "#2A2340" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>Profile</Text>
              <TouchableOpacity onPress={() => setShowProfile(false)}><Text style={{ color: "#9CA3AF", fontSize: 18 }}>✕</Text></TouchableOpacity>
            </View>

            <View style={{ alignItems: "center", marginTop: 20 }}>
              <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: "#A855F7", justifyContent: "center", alignItems: "center", borderWidth: 3, borderColor: "#22C55E" }}>
                <Text style={{ color: "white", fontSize: 32, fontWeight: "800" }}>{me.username? me.username[0].toUpperCase() : "O"}</Text>
              </View>
              <Text style={{ color: "white", fontSize: 20, fontWeight: "700", marginTop: 12 }}>{me.username}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#22C55E", marginRight: 6 }} />
                <Text style={{ color: "#22C55E", fontSize: 13 }}>Online</Text>
              </View>
            </View>

            <View style={{ marginTop: 20, backgroundColor: "#0A0710", borderRadius: 12, padding: 14 }}>
              <Text style={{ color: "#9CA3AF", fontSize: 12 }}>USERNAME</Text>
              <Text style={{ color: "white", fontSize: 15, marginTop: 2 }}>{me.username}</Text>
              <View style={{ height: 1, backgroundColor: "#1F1D2B", marginVertical: 10 }} />
              <Text style={{ color: "#9CA3AF", fontSize: 12 }}>EMAIL</Text>
              <Text style={{ color: "white", fontSize: 15, marginTop: 2 }}>{me.email}</Text>
              <View style={{ height: 1, backgroundColor: "#1F1D2B", marginVertical: 10 }} />
              <Text style={{ color: "#9CA3AF", fontSize: 12 }}>USER ID</Text>
              <Text style={{ color: "#6B7280", fontSize: 12, marginTop: 2 }}>{me._id || me.id}</Text>
            </View>

            <TouchableOpacity onPress={handleLogout} style={{ marginTop: 20, backgroundColor: "#2A1A3A", borderRadius: 12, height: 48, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#A855F7" }}>
              <Text style={{ color: "#A855F7", fontWeight: "700" }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}