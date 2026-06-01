import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const NewsCard = ({ title, image, excerpt, compact = false, onPress }) => {
  const imageSource = image
    ? { uri: image }
    : { uri: "https://via.placeholder.com/600x300?text=Geen+afbeelding" };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={imageSource} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.excerpt} numberOfLines={compact ? 1 : 2}>
          {excerpt}
        </Text>
      </View>
    </TouchableOpacity>
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

  content: {
    padding: 14,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  excerpt: {
    color: "#bbb",
    fontSize: 14,
    lineHeight: 20,
  },
});

export default NewsCard;
