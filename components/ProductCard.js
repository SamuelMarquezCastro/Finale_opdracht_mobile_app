import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";


export default function ProductCard({ title, description, price, image, onPress }) {
  const imageSource = image
    ? { uri: image }
    : { uri: "https://via.placeholder.com/300x300?text=Geen+afbeelding" };

  return (
    <View style={styles.card}>

      <Image
        source={imageSource}
        style={styles.image}
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
      <Text style={styles.price}>{price}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Bekijk</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#1f1f1f",
    padding: 15,
    borderRadius: 12,
    width: 160,
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },

  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  },

  description: {
    color: "#bbb",
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },

  price: {
    color: "#00ff9c",
    fontWeight: "bold",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#ff3c38",
    padding: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

});
