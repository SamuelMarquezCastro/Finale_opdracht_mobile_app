import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

const NewsDetailsScreen = ({ route }) => {
  const {
    title = "Nieuws",
    image = "https://via.placeholder.com/800x400?text=Geen+afbeelding",
    content = "Geen inhoud beschikbaar.",
    author = "Busleyden Atheneum",
    date = "",
  } = route.params ?? {};

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.meta}>
          Door {author} • {date}
        </Text>

        <Text style={styles.sectionTitle}>Artikel</Text>
        <Text style={styles.text}>{content}</Text>
      </View>

      <StatusBar style="light" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f0",
  },

  image: {
    width: "100%",
    height: 260,
    resizeMode: "cover",
  },

  content: {
    padding: 20,
  },

  title: {
    color: "#171717",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  meta: {
    color: "#668b18",
    fontSize: 14,
    marginBottom: 20,
  },

  sectionTitle: {
    color: "#171717",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },

  text: {
    color: "#555",
    fontSize: 16,
    lineHeight: 26,
  },
});

export default NewsDetailsScreen;
