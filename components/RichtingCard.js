import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const RichtingCard = ({
  title,
  description,
  image,
  campus,
  opleiding,
  niveau,
}) => {
  return (
    <View style={styles.card}>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <View style={styles.content}>
        <Text style={styles.niveau}>{niveau}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.meta}>{campus}</Text>
        <Text style={styles.meta}>{opleiding}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e1e4dc",
  },

  image: {
    width: "100%",
    height: 170,
    resizeMode: "cover",
  },

  content: {
    padding: 14,
  },

  niveau: {
    color: "#668b18",
    fontWeight: "bold",
    marginBottom: 6,
  },

  title: {
    color: "#171717",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  meta: {
    color: "#555",
    marginBottom: 4,
  },

  description: {
    color: "#666",
    lineHeight: 20,
    marginTop: 8,
  },
});

export default RichtingCard;
