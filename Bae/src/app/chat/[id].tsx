import { View, Text, FlatList, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import { useEffect, useState, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "../../services/api";
import { storage } from "../../services/storage";

// time format - 11:55 PM
const formatTime = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  let hours = d.getHours();
  const mins = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${mins} ${ampm}`;
};

// last seen text
const getLastSeenText = (user: any) => {
  if (user?.isOnline) return "Online";
  if (!user?.lastSeen) return "Offline";
  const diff = Date.now() - new Date(user.lastSeen).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "yesterday" : `${days}d ago`;
};

export default function ChatScreen() {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [otherUser, setOtherUser] = useState<any>({ username: name, isOnline: false });
  const [meId, setMeId] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const load = async () => {
    try {
      const meData = await storage.getItem("user");
      const me = meData ? JSON.parse(meData) : {};
      const myId = String(me._id || me.id || "");
      setMeId(myId);

      const res = await api.get(`/messages/${id}`);
      setMessages(res.data || []);

      const userRes = await api.get(`/users`);
      const users = userRes.data.users || userRes.data || [];
      const found = users.find((u: any) => String(u._id) === String(id));
      if (found) setOtherUser(found);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 3000); // live online + messages
    return () => clearInterval(interval);
  }, [id]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    const msgText = text;
    setText("");
    // optimistic
    setMessages((prev: any) => [...prev, { _id: Date.now().toString(), text: msgText, sender: meId, createdAt: new Date().toISOString(), isMe: true }]);
    try {
      await api.post("/messages", { receiverId: id, text: msgText });
    } catch {}
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <StatusBar barStyle="light-content" />
      
      {/* HEADER - Online / last seen */}
      <View style={{ paddingTop: 45, paddingBottom: 12, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", backgroundColor: "#000", borderBottomWidth: 0.5, borderBottomColor: "#1A1A1A" }}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
          <Text style={{ color: "white", fontSize: 26 }}>←</Text>
        </TouchableOpacity>
        <View style={{ marginLeft: 6, flex: 1 }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>{String(name).toLowerCase()}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 1 }}>
            <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: otherUser.isOnline ? "#22C55E" : "#4B5563", marginRight: 5 }} />
            <Text style={{ color: otherUser.isOnline ? "#22C55E" : "#9CA3AF", fontSize: 12, fontWeight: otherUser.isOnline ? "700" : "400" }}>
              {getLastSeenText(otherUser)}
            </Text>
          </View>
        </View>
      </View>

      {/* MESSAGES - Left grey / Right purple + Time */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item: any) => item._id || String(Math.random())}
        contentContainerStyle={{ padding: 12, paddingBottom: 20 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }: any) => {
          const isMe = String(item.sender) === String(meId) || item.isMe || String(item.senderId) === String(meId) || item.sender === "me";
          return (
            <View style={{ alignItems: isMe ? "flex-end" : "flex-start", marginVertical: 3 }}>
              <View style={{ 
                backgroundColor: isMe ? "#4A2C6B" : "#1C1C1E",
                paddingHorizontal: 14, 
                paddingVertical: 8, 
                borderRadius: 18,
                borderBottomRightRadius: isMe ? 4 : 18,
                borderBottomLeftRadius: isMe ? 18 : 4,
                maxWidth: "78%",
              }}>
                <Text style={{ color: isMe ? "#E8D5F2" : "#E5E7EB", fontSize: 15 }}>{item.text || item.message}</Text>
                <Text style={{ color: isMe ? "#A48BB8" : "#6B7280", fontSize: 10, marginTop: 4, textAlign: "right" }}>
                  {formatTime(item.createdAt || item.timestamp)}
                </Text>
              </View>
            </View>
          );
        }}
      />

      {/* INPUT */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 8, backgroundColor: "#000" }}>
          <View style={{ flex: 1, backgroundColor: "#1C1C1E", borderRadius: 22, paddingHorizontal: 16, height: 44, justifyContent: "center" }}>
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder={`Message ${String(name).toLowerCase()}`}
              placeholderTextColor="#8E8E93"
              style={{ color: "white", fontSize: 16 }}
              onSubmitEditing={sendMessage}
              returnKeyType="send"
            />
          </View>
          <TouchableOpacity onPress={sendMessage} style={{ marginLeft: 10, width: 44, height: 44, borderRadius: 22, backgroundColor: "#4A2C6B", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>↑</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}