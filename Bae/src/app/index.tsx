import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import { styles } from "../styles/welcomeStyles";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background Decorations */}
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />
      <View style={styles.glowThree} />

      {/* Main Content */}
      <View style={styles.content}>

        <Image
          source={require("../../assets/Baelogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.heading}>
          Stay close to{"\n"}
          <Text style={styles.headingAccent}>what matters.</Text>
        </Text>

        <Text style={styles.description}>
          Connect with your people, share moments,
          and keep every conversation close.
        </Text>

      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => router.push("/auth")}
>
        <Text style={styles.buttonText}>
            Get Started
        </Text>

        <Text style={styles.arrow}>
            →
        </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Your conversations. Your people. Your Bae.
        </Text>

      </View>
    </View>
  );
}