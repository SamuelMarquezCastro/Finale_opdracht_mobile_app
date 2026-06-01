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
  TouchableOpacity,
} from "react-native";

import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";
import CampusCard from "../components/CampusCard";
import { Picker } from "@react-native-picker/picker";

const apiToken =
  "2e8b77f9d96fe249aa8a2fbcda35c56f33d458b2f3680b570ced3632bcd19128";

const productsUrl =
  "https://api.webflow.com/v2/sites/6a1b498850c42c92a376634e/products";
const blogsUrl =
  "https://api.webflow.com/v2/collections/6a1b5077d9dab01e9054f1a1/items";
const campussenUrl =
  "https://api.webflow.com/v2/collections/6a1b4ace78c306601d5c476f/items";
const opleidingenUrl =
  "https://api.webflow.com/v2/collections/6a1b4b459165c2dad250f542/items";

const categoryNamesBlogs = {
  "": "Alle categorieën",
  "22e6c656444b40674181cac0b8de0ef7": "Activiteit",
  "6875845ff787112248a028818b549c9d": "Schoolnieuws",
  bc756b09c087e7cc5ab0ee7097497dfc: "Campus",
  d218cb58c75cc8892196e210e9ca40ff: "Groei",
};

const stripHtml = (html) =>
  html ? html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [campussen, setCampussen] = useState([]);
  const [opleidingen, setOpleidingen] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductCategory, setSelectedProductCategory] = useState("");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState("");
  const [selectedOpleiding, setSelectedOpleiding] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");
  const [blogSortOption, setBlogSortOption] = useState("date-desc");
  const [showBlogs, setShowBlogs] = useState(true);

  useEffect(() => {
    fetch(productsUrl, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          (data.items || []).map((item) => ({
            id: item.product.id,
            title: item.product.fieldData.name,
            description:
              item.product.fieldData.description ||
              "Geen beschrijving beschikbaar.",
            price: Number(item.skus[0]?.fieldData?.price?.value ?? 0) / 100,
            image:
              item.product.fieldData?.["main-image"]?.url ||
              item.skus[0]?.fieldData?.["main-image"]?.url ||
              null,
            category:
              item.product.fieldData?.category?.[0] || "Geen categorie",
          })),
        );
      })
      .catch((error) => {
        console.log("Product fetch error:", error);
        setProducts([]);
      });
  }, []);

  useEffect(() => {
    fetch(blogsUrl, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBlogs(
          (data.items || []).map((item) => ({
            id: item.id,
            title: item.fieldData.name,
            intro: item.fieldData.intro || "Geen intro beschikbaar.",
            image: item.fieldData.image?.url || null,
            date: new Date(item.fieldData.datum).toLocaleDateString("nl-BE"),
            dateRaw: item.fieldData.datum,
            category:
              categoryNamesBlogs[item.fieldData.categories] ||
              "Onbekende categorie",
            content:
              stripHtml(item.fieldData.inhoud) || "Geen inhoud beschikbaar.",
          })),
        );
      })
      .catch((error) => {
        console.log("Blog fetch error:", error);
        setBlogs([]);
      });
  }, []);

  useEffect(() => {
    fetch(campussenUrl, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCampussen(
          (data.items || []).map((item) => ({
            id: item.id,
            title: item.fieldData.name,
            address: item.fieldData.adres,
            image: item.fieldData.afbeelding?.url || null,
            content: item.fieldData.beschrijving,
            opleidingen: item.fieldData.opleidingen || [],
          })),
        );
      })
      .catch((error) => {
        console.log("Campussen fetch error:", error);
        setCampussen([]);
      });
  }, []);

  useEffect(() => {
    fetch(opleidingenUrl, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOpleidingen(
          (data.items || []).map((item) => ({
            id: item.id,
            name: item.fieldData.name,
          })),
        );
      })
      .catch((error) => {
        console.log("Opleidingen fetch error:", error);
        setOpleidingen([]);
      });
  }, []);

  const productCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter(
    (product) =>
      (selectedProductCategory === "" ||
        product.category === selectedProductCategory) &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "name-asc") return a.title.localeCompare(b.title);
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedBlogCategory === "" ||
        blog.category === selectedBlogCategory),
  );

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (blogSortOption === "date-desc") {
      return new Date(b.dateRaw) - new Date(a.dateRaw);
    }
    if (blogSortOption === "date-asc") {
      return new Date(a.dateRaw) - new Date(b.dateRaw);
    }
    if (blogSortOption === "name-asc") return a.title.localeCompare(b.title);
    if (blogSortOption === "name-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  const filteredCampussen = campussen.filter(
    (campus) =>
      campus.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedOpleiding === "" ||
        campus.opleidingen.includes(selectedOpleiding)),
  );

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedProductCategory("");
    setSelectedBlogCategory("");
    setSelectedOpleiding("");
    setSortOption("price-asc");
    setBlogSortOption("date-desc");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Busleyden Atheneum</Text>

      <TextInput
        placeholder="Zoek producten, nieuws of campussen..."
        placeholderTextColor="#666"
        style={styles.search}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.controlsCard}>
        <Text style={styles.controlLabel}>Productcategorie</Text>
        <Picker
          selectedValue={selectedProductCategory}
          onValueChange={setSelectedProductCategory}
          style={styles.picker}
        >
          <Picker.Item label="Alle categorieën" value="" />
          {productCategories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>

        <Text style={styles.controlLabel}>Producten sorteren</Text>
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

        <Text style={styles.controlLabel}>Studiezoeker</Text>
        <Picker
          selectedValue={selectedOpleiding}
          onValueChange={setSelectedOpleiding}
          style={styles.picker}
        >
          <Picker.Item label="Alle opleidingen" value="" />
          {opleidingen.map((opleiding) => (
            <Picker.Item
              key={opleiding.id}
              label={opleiding.name}
              value={opleiding.id}
            />
          ))}
        </Picker>

        <Button title="Reset filters" color="#7aaa25" onPress={resetFilters} />
      </View>

      <Text style={styles.sectionTitle}>Producten</Text>

      <View style={styles.grid}>
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            image={product.image}
            onPress={() => navigation.navigate("Details", product)}
          />
        ))}
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.sectionTitle}>Nieuws</Text>
        <View style={styles.switchControl}>
          <Text style={styles.switchLabel}>Toon nieuws</Text>
          <Switch value={showBlogs} onValueChange={setShowBlogs} />
        </View>
      </View>

      {showBlogs && (
        <>
          <View style={styles.controlsCard}>
            <Text style={styles.controlLabel}>Nieuwscategorie</Text>
            <Picker
              selectedValue={selectedBlogCategory}
              onValueChange={setSelectedBlogCategory}
              style={styles.picker}
            >
              <Picker.Item label="Alle categorieën" value="" />
              <Picker.Item label="Activiteit" value="Activiteit" />
              <Picker.Item label="Schoolnieuws" value="Schoolnieuws" />
              <Picker.Item label="Campus" value="Campus" />
              <Picker.Item label="Groei" value="Groei" />
            </Picker>

            <Text style={styles.controlLabel}>Nieuws sorteren</Text>
            <Picker
              selectedValue={blogSortOption}
              onValueChange={setBlogSortOption}
              style={styles.picker}
            >
              <Picker.Item label="Nieuwste eerst" value="date-desc" />
              <Picker.Item label="Oudste eerst" value="date-asc" />
              <Picker.Item label="Naam: A-Z" value="name-asc" />
              <Picker.Item label="Naam: Z-A" value="name-desc" />
            </Picker>
          </View>

          {sortedBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              image={blog.image}
              excerpt={blog.intro}
              onPress={() => navigation.navigate("BlogDetail", blog)}
            />
          ))}
        </>
      )}

      <Text style={styles.sectionTitle}>Campussen</Text>

      {filteredCampussen.map((campus) => (
        <CampusCard
          key={campus.id}
          title={campus.title}
          description={campus.address}
          image={campus.image}
          onPress={() => navigation.navigate("CampusDetail", campus)}
        />
      ))}

      <TouchableOpacity
        style={styles.gameButton}
        onPress={() => navigation.navigate("SchoolGame")}
      >
        <Text style={styles.gameButtonText}>Speel de School Game</Text>
      </TouchableOpacity>

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

  gameButton: {
    backgroundColor: "#7aaa25",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 40,
  },

  gameButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default HomeScreen;
