import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";


export default function ProductCard({
  title,
  description,
  price,
  image,
  category,
  onPress,
}) {
  const imageSource = image
    ? { uri: image }
    : { uri: "https://via.placeholder.com/300x300?text=Geen+afbeelding" };

  return (
    <View style={styles.card}>

      <Image
        source={imageSource}
        style={styles.image}
      />

      <Text style={styles.category}>{category}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
      <Text style={styles.price}>€{Number(price).toFixed(2)}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Bekijk</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    width: 160,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e1e4dc",
  },

  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },

  title: {
    color: "#171717",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  },

  category: {
    color: "#668b18",
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 6,
    textTransform: "uppercase",
  },

  description: {
    color: "#666",
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },

  price: {
    color: "#668b18",
    fontWeight: "bold",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#b7e34a",
    padding: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: "#171717",
    textAlign: "center",
    fontWeight: "bold",
  },

});
