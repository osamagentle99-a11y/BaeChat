import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080510",
    paddingHorizontal: 24,
    overflow: "hidden",
  },

  // Decorative purple glow
  glowOne: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#5B00FF",
    opacity: 0.18,
    top: -100,
    right: -100,
  },

  glowTwo: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#9D4EDD",
    opacity: 0.12,
    bottom: 100,
    left: -130,
  },

  glowThree: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#6C2BD9",
    opacity: 0.14,
    top: "42%",
    right: -70,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },

  logo: {
    width: "100%",
    height: 150,
    marginBottom: 35,
  },

  heading: {
    width: "100%",
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 36,
    lineHeight: 43,
    fontWeight: "800",
    letterSpacing: -1,
    marginBottom: 18,
  },

  headingAccent: {
    color: "#A855F7",
  },

  description: {
    width: "90%",
    textAlign: "center",
    color: "#A8A2B3",
    fontSize: 16,
    lineHeight: 25,
  },

  bottomSection: {
    paddingBottom: 35,
  },

  button: {
    height: 62,
    width: "100%",
    borderRadius: 31,
    backgroundColor: "#7C3AED",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    boxShadow: "0px 8px 18px rgba(124, 58, 237, 0.4)",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "300",
    marginLeft: 12,
    marginTop: -2,
  },

  footerText: {
    textAlign: "center",
    color: "#625C6D",
    fontSize: 12,
    letterSpacing: 0.3,
  },
});