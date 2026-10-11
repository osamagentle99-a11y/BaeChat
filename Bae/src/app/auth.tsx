import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  ActivityIndicator
} from "react-native";
import { useState } from "react";
import { styles } from "../styles/authStyles";
import { useRouter } from "expo-router";
import api from "../services/api";
import * as SecureStore from "expo-secure-store";

export default function AuthScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password required");
      return;
    }
    try {
      setLoading(true);
      // ⚠️ Tumhara backend route check karna - /auth/login hai ya /users/login?
      const res = await api.post("/auth/login", { email, password });
      
      // token save karo
      await SecureStore.setItemAsync("token", res.data.token);
      await SecureStore.setItemAsync("user", JSON.stringify(res.data.user || res.data));

      Alert.alert("Welcome back ❤️");
      router.replace("/explore"); // login ke baad explore pe jayega

    } catch (err: any) {
      console.log(err.response?.data || err.message);
      Alert.alert("Login Failed", err.response?.data?.message || "Check your IP and server");
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
        <Image
          source={require("../../assets/Baelogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.heading}>
          Welcome to <Text style={styles.headingAccent}>Bae</Text>
        </Text>
        <Text style={styles.subtitle}>
          Connect with your people and keep{"\n"}every conversation close.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor="#625C6D"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#625C6D"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Don't have an account?{" "}
          <Text style={styles.registerLink} onPress={() => router.push("/register")}>
            Create account
          </Text>
        </Text>
      </View>
    </View>
  );
}