import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const CampusCard = ({ title, description, image, onPress }) => {
  const imageSource = image
    ? { uri: image }
    : { uri: "https://via.placeholder.com/600x400?text=Geen+afbeelding" };

  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Bekijk campus</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1c1c1c",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 20,
    width: "100%",
  },

  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    margin: 14,
    marginBottom: 6,
  },

  description: {
    color: "#bbb",
    fontSize: 14,
    lineHeight: 20,
    marginHorizontal: 14,
    marginBottom: 12,
  },

  button: {
    marginHorizontal: 14,
    marginBottom: 14,
  },

  buttonText: {
    color: "#b7e34a",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default CampusCard;
