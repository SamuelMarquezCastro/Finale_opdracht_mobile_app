import React from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, Image, StyleSheet } from "react-native";

const cleanHtml = (html) =>
  html ? html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";

const CampusDetail = ({ route }) => {
  const {
    title = "Campus",
    image = "https://via.placeholder.com/800x400?text=Geen+afbeelding",
    content = "Geen beschrijving beschikbaar.",
    address = "",
  } = route.params ?? {};

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.address}>{address}</Text>
      <Text style={styles.body}>{cleanHtml(content)}</Text>

      <StatusBar style="light" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },

  content: {
    paddingBottom: 30,
  },

  image: {
    width: "100%",
    height: 260,
    resizeMode: "cover",
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10,
  },

  address: {
    color: "#b7e34a",
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },

  body: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 25,
    marginHorizontal: 20,
  },
});

export default CampusDetail;
