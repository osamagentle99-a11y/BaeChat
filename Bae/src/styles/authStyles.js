import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080510",
    paddingHorizontal: 24,
  },

  glowOne: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#7C3AED",
    opacity: 0.16,
    top: -100,
    right: -100,
  },

  glowTwo: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#A855F7",
    opacity: 0.1,
    bottom: -80,
    left: -90,
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  logo: {
    width: 130,
    height: 80,
    alignSelf: "center",
    marginBottom: 35,
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },

  headingAccent: {
    color: "#A855F7",
  },

  subtitle: {
    color: "#91899F",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 23,
    marginBottom: 35,
  },

  input: {
    height: 58,
    borderRadius: 16,
    backgroundColor: "#151020",
    borderWidth: 1,
    borderColor: "#292038",
    paddingHorizontal: 18,
    color: "#FFFFFF",
    fontSize: 15,
    marginBottom: 14,
  },

  button: {
    height: 58,
    borderRadius: 29,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    boxShadow: "0px 8px 18px rgba(124, 58, 237, 0.35)",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  registerText: {
    color: "#91899F",
    textAlign: "center",
    fontSize: 14,
    marginTop: 25,
  },

  registerLink: {
    color: "#A855F7",
    fontWeight: "700",
  },
});