import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const ProductDetail = ({ route }) => {
  const {
    title = "Product",
    description = "Geen beschrijving beschikbaar.",
    price = 0,
    image = "https://via.placeholder.com/800x800?text=Geen+afbeelding",
    category = "Sport",
  } = route.params ?? {};

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const sizes = ["S", "M", "L", "XL"];
  const numericPrice = Number(price) || 0;

  const increaseQuantity = () => setQuantity(quantity + 1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = numericPrice * quantity;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>€{numericPrice.toFixed(2)}</Text>

        <Text style={styles.sectionTitle}>Beschrijving</Text>
        <Text style={styles.description}>{description}</Text>

        <Text style={styles.sectionTitle}>Kies maat</Text>
        <View style={styles.sizeContainer}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size && styles.selectedSizeButton,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && styles.selectedSizeText,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Aantal</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{quantity}</Text>

          <TouchableOpacity onPress={increaseQuantity} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.totalPrice}>Totaal: €{totalPrice.toFixed(2)}</Text>

        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Toevoegen aan winkelmand</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },

  image: {
    width: "100%",
    height: 380,
    resizeMode: "cover",
  },

  content: {
    padding: 20,
  },

  category: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  price: {
    color: "#00d09c",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 10,
  },

  description: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },

  sizeContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },

  sizeButton: {
    borderWidth: 1,
    borderColor: "#555",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginRight: 10,
  },

  selectedSizeButton: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },

  sizeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  selectedSizeText: {
    color: "#111",
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#00d09c",
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#111",
    fontSize: 22,
    fontWeight: "bold",
  },

  quantityText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
  },

  totalPrice: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 25,
  },

  cartButton: {
    backgroundColor: "#00d09c",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },

  cartButtonText: {
    color: "#111",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetail;
