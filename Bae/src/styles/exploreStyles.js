import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0710",
    overflow: "hidden",
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#0A0710",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    color: "#8F879D",
    fontSize: 14,
    marginTop: 14,
  },

  /* Background */

  glowTop: {
    position: "absolute",
    width: 270,
    height: 270,
    borderRadius: 135,
    backgroundColor: "#6D28D9",
    opacity: 0.22,
    top: -130,
    right: -90,
  },

  glowBottom: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "#A855F7",
    opacity: 0.12,
    bottom: 80,
    left: -130,
  },

  /* Header */

  header: {
    marginTop: 52,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 38,
    height: 38,
  },

  brandName: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
    marginLeft: 8,
    letterSpacing: -0.5,
  },

  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(168, 85, 247, 0.10)",
    borderWidth: 1,
    borderColor: "rgba(168, 85, 247, 0.18)",
  },

  logoutText: {
    color: "#A855F7",
    fontSize: 12,
    fontWeight: "700",
  },

  /* Hero */

  hero: {
    paddingHorizontal: 20,
    marginTop: 24,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "400",
    letterSpacing: -0.8,
  },

  heroAccent: {
    color: "#A855F7",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.8,
    marginTop: 2,
  },

  /* Search */

  searchContainer: {
    height: 56,
    marginHorizontal: 20,
    marginTop: 25,
    paddingHorizontal: 16,
    borderRadius: 17,
    backgroundColor: "#181421",
    borderWidth: 1,
    borderColor: "#211C2C",
    flexDirection: "row",
    alignItems: "center",
  },

  searchIcon: {
    fontSize: 19,
  },

  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    marginLeft: 10,
    paddingVertical: 0,
  },

  clearSearch: {
    color: "#8F879D",
    fontSize: 15,
    paddingLeft: 8,
  },

  /* Section */

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 5,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  chatCount: {
    color: "#7E748A",
    fontSize: 12,
    marginLeft: 8,
  },

  /* List */

  listContent: {
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 105,
  },

  chatItem: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#191621",
  },

  /* Avatar */

  avatarContainer: {
    width: 56,
    height: 56,
    position: "relative",
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#28213D",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#352A50",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },

  onlineDot: {
    position: "absolute",
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#22C55E",
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: "#0A0710",
  },

  /* Chat Content */

  chatContent: {
    flex: 1,
    marginLeft: 13,
  },

  chatTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  username: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
  },

  time: {
    color: "#6F6879",
    fontSize: 11,
  },

  chatBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },

  lastMessage: {
    flex: 1,
    color: "#96909F",
    fontSize: 13,
    marginRight: 8,
  },

  typingText: {
    color: "#22C55E",
    fontWeight: "500",
  },

  unreadBadge: {
    minWidth: 21,
    height: 21,
    paddingHorizontal: 6,
    borderRadius: 11,
    backgroundColor: "#A855F7",
    alignItems: "center",
    justifyContent: "center",
  },

  unreadText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },

  /* Empty */

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 70,
    paddingHorizontal: 30,
  },

  emptyIcon: {
    fontSize: 35,
    marginBottom: 15,
  },

  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },

  emptyText: {
    color: "#777080",
    fontSize: 13,
    textAlign: "center",
    marginTop: 7,
  },

  /* Bottom Navigation */

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 78,
    paddingHorizontal: 8,
    backgroundColor: "#12101A",
    borderTopWidth: 1,
    borderTopColor: "#211D2B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  navIconActive: {
    fontSize: 19,
    marginBottom: 4,
  },

  navIcon: {
    fontSize: 19,
    opacity: 0.55,
    marginBottom: 4,
  },

  navTextActive: {
    color: "#A855F7",
    fontSize: 11,
    fontWeight: "700",
  },

  navText: {
    color: "#6F6879",
    fontSize: 11,
  },
});