import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Switch,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";
import { Picker } from "@react-native-picker/picker";

const categoryNames = {
  "": "alle categorieën",
  "699f04d48786422f5c2b343a": "Tshirt",
  "699ef99797a5763ef1998039": "Blogs",
};

const apiToken = "326809b6a1dd0d44ae83c6adacd81c9dee1bcb46deefa3ef83b9c6009d878362";
const productsUrl = "https://api.webflow.com/v2/sites/698c7fb73c82c1b0af609e04/products";
const blogsUrl = "https://api.webflow.com/v2/collections/699ef90b409ea29bfc51f28a/items";

const stripHtml = (html) =>
  html
    ? html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
    : "";

const HomeScreen = ({ navigation }) => {
  const [compactBlogs, setCompactBlogs] = useState(false);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");

  const fetchBlogs = () => {
    fetch(`${blogsUrl}?cache=${Date.now()}`, {
      headers: {
        authorization: apiToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const apiBlogs = data.items.map((item) => ({
          id: item.id,
          title: item.fieldData.name,
          excerpt:
            item.fieldData["post-summary"] ||
            "Geen korte beschrijving beschikbaar.",
          image:
            item.fieldData["thumbnail-image"]?.url ||
            item.fieldData["main-image"]?.url ||
            null,
          content:
            stripHtml(item.fieldData["post-body"]) ||
            item.fieldData["post-summary"] ||
            "Geen inhoud beschikbaar.",
          author: "SportWear Store",
          date: new Date(item.createdOn).toLocaleDateString("nl-BE"),
        }));

        setBlogs(apiBlogs);
      })
      .catch((error) => {
        console.log("Blog fetch error:", error);
        setBlogs([]);
      });
  };


  useEffect(() => {
    fetch(productsUrl, {
      headers: {
        authorization: apiToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          data.items.map((item) => ({
            id: item.product.id,
            title: item.product.fieldData.name,
            subtitle: item.product.fieldData.description,
            price: Number(item.skus[0]?.fieldData?.price?.value ?? 0) / 100,
            image:
              item.product.fieldData?.["main-image"]?.url ||
              item.skus[0]?.fieldData?.["main-image"]?.url ||
              null,
            category:
              categoryNames[item.product.fieldData?.category?.[0]] ||
              "Onbekende categorie",
            description:
              item.product.fieldData?.description ||
              "Geen beschrijving beschikbaar.",
          })),
        );
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      });
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "" || product.category === selectedCategory) &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );


  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") {
      return a.price - b.price;
    }
    if (sortOption === "price-desc") {
      return b.price - a.price;
    }
    if (sortOption === "name-asc") {
      return a.title.localeCompare(b.title);
    }
    if (sortOption === "name-desc") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  }
  );  

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortOption("price-asc");
  };


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>SportWear Store</Text>

      <TextInput
        placeholder="Zoek sportkleding..."
        placeholderTextColor="#666"
        style={styles.search}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.controlsCard}>
        <Text style={styles.controlLabel}>Categorie</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={setSelectedCategory}
        style={styles.picker}
      >
        <Picker.Item label="Alle categorieën" value="" />
        <Picker.Item label="Tshirt" value="Tshirt" />
        <Picker.Item label="Blogs" value="Blogs" />
      </Picker>

        <Text style={styles.controlLabel}>Sorteren</Text>
      <Picker
        selectedValue={sortOption}
        onValueChange={setSortOption}
        style={styles.picker}
      >
        <Picker.Item label="Prijs: Laag naar Hoog" value="price-asc" />  
        <Picker.Item label="Prijs: Hoog naar Laag" value="price-desc" />
        <Picker.Item label="Naam: A-Z" value="name-asc" /> 
        <Picker.Item label="Naam: Z-A" value="name-desc" />
      </Picker>

        <Button title="Reset filters" color="#ff3c38" onPress={resetFilters} />
      </View>

      <Text style={styles.sectionTitle}>Populaire producten</Text>

      <View style={styles.grid}>
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            image={product.image}
            onPress={() =>
              navigation.navigate("Details", {
                title: product.title,
                description: product.description,
                price: product.price,
                image: product.image,
                category: product.category,
              })
            }
          />
        ))}
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.sectionTitle}>Blogs</Text>
        <View style={styles.switchControl}>
          <Text style={styles.switchLabel}>Compact</Text>
          <Switch value={compactBlogs} onValueChange={setCompactBlogs} />
        </View>
      </View>

      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          image={blog.image}
          excerpt={blog.excerpt}
          compact={compactBlogs}
          onPress={() =>
            navigation.navigate("BlogDetail", {
              title: blog.title,
              image: blog.image,
              author: blog.author,
              date: blog.date,
              content: blog.content,
            })
          }
        />
      ))}

      <StatusBar style="light" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111",
    padding: 20,
    paddingTop: 60,
    flex: 1,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  search: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },

  controlsCard: {
    backgroundColor: "#1f1f1f",
    borderRadius: 14,
    padding: 12,
    marginBottom: 20,
  },

  controlLabel: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 6,
  },

  picker: {
    backgroundColor: "white",
    marginBottom: 20,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  switchControl: {
    flexDirection: "row",
    alignItems: "center",
  },

  switchLabel: {
    color: "#ccc",
    marginRight: 8,
  },
});

export default HomeScreen;
