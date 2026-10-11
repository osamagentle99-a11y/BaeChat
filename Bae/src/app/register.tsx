import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, Alert, ActivityIndicator } from "react-native";
import { useState } from "react";
import { styles } from "../styles/authStyles";
import { useRouter } from "expo-router";
import api from "../services/api";
import * as SecureStore from "expo-secure-store";

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "All fields required");
      return;
    }
    try {
      setLoading(true);
      const res = await api.post("/auth/register", { username, email, password });
      
      await SecureStore.setItemAsync("token", res.data.token);
      await SecureStore.setItemAsync("user", JSON.stringify(res.data.user || res.data));

      Alert.alert("Account Created ❤️");
      router.replace("/explore");
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      Alert.alert("Failed", err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />
      <View style={styles.content}>
        <Image source={require("../../assets/Baelogo.png")} style={styles.logo} resizeMode="contain" />
        <Text style={styles.heading}>Create your <Text style={styles.headingAccent}>Bae</Text> Account</Text>
        
        <TextInput style={styles.input} placeholder="Username (e.g. Osama)" placeholderTextColor="#625C6D" value={username} onChangeText={setUsername} autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Email address" placeholderTextColor="#625C6D" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#625C6D" secureTextEntry value={password} onChangeText={setPassword} />

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading} activeOpacity={0.8}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create Account</Text>}
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Already have an account? <Text style={styles.registerLink} onPress={() => router.push("/auth")}>Login</Text>
        </Text>
      </View>
    </View>
  );
}