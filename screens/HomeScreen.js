import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Switch,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import ProductCard from "../components/ProductCard";
import NewsCard from "../components/NewsCard";
import CampusCard from "../components/CampusCard";
import { Picker } from "@react-native-picker/picker";

const apiToken =
  "2e8b77f9d96fe249aa8a2fbcda35c56f33d458b2f3680b570ced3632bcd19128";

const productsUrl =
  "https://api.webflow.com/v2/sites/6a1b498850c42c92a376634e/products";
const productCategoriesUrl =
  "https://api.webflow.com/v2/collections/6a1b5129b3db0157961c6077/items";
const blogsUrl =
  "https://api.webflow.com/v2/collections/6a1b5077d9dab01e9054f1a1/items";
const campussenUrl =
  "https://api.webflow.com/v2/collections/6a1b4ace78c306601d5c476f/items";
const opleidingenUrl =
  "https://api.webflow.com/v2/collections/6a1b4b459165c2dad250f542/items";
const richtingenUrl =
  "https://api.webflow.com/v2/collections/6a1db85ef1448301de9c9728/items";

const categoryNamesBlogs = {
  "": "Alle categorieën",
  "22e6c656444b40674181cac0b8de0ef7": "Activiteit",
  "6875845ff787112248a028818b549c9d": "Schoolnieuws",
  bc756b09c087e7cc5ab0ee7097497dfc: "Campus",
  d218cb58c75cc8892196e210e9ca40ff: "Groei",
};

const niveauNames = {
  "": "Alle graden",
  "96b704dadf2092bb9d7a616aa38513f1": "1ste graad",
  df4a1e4cca1265140b84f40f87e2384c: "2de graad",
  "491fb3a5ce2320cc12bc176051653e46": "3de jaar",
  "665f8fd27288ddc43b2d3f5c6fc96389": "7de jaar",
};

const stripHtml = (html) =>
  html ? html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [campussen, setCampussen] = useState([]);
  const [opleidingen, setOpleidingen] = useState([]);
  const [richtingen, setRichtingen] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductCategory, setSelectedProductCategory] = useState("");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState("");
  const [selectedOpleiding, setSelectedOpleiding] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");
  const [selectedNiveau, setSelectedNiveau] = useState("");
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
            category: item.product.fieldData?.category?.[0] || "",
          })),
        );
      })
      .catch((error) => {
        console.log("Product fetch error:", error);
        setProducts([]);
      });
  }, []);

  useEffect(() => {
    fetch(productCategoriesUrl, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProductCategories(
          (data.items || []).map((item) => ({
            id: item.id,
            name: item.fieldData.name,
          })),
        );
      })
      .catch((error) => {
        console.log("Product categories fetch error:", error);
        setProductCategories([]);
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

  useEffect(() => {
    fetch(richtingenUrl, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRichtingen(
          (data.items || []).map((item) => ({
            id: item.id,
            title: item.fieldData.name,
            description: stripHtml(item.fieldData.beschrijving),
            image: item.fieldData.image?.url || null,
            campus: item.fieldData.campus || "",
            opleidingen: item.fieldData.opleidingen || [],
            niveau: item.fieldData.niveau || "",
          })),
        );
      })
      .catch((error) => {
        console.log("Richtingen fetch error:", error);
        setRichtingen([]);
      });
  }, []);

  const getProductCategoryName = (categoryId) => {
    const productCategory = productCategories.find(
      (category) => category.id === categoryId,
    );

    return productCategory?.name || categoryId || "Geen categorie";
  };

  const visibleProductCategories =
    productCategories.length > 0
      ? productCategories
      : [...new Set(products.map((product) => product.category))]
          .filter((category) => category !== "")
          .map((category) => ({
            id: category,
            name: category,
          }));

  const getCampusName = (campusId) => {
    const campus = campussen.find((item) => item.id === campusId);

    return campus?.title || "Campus onbekend";
  };

  const getOpleidingNames = (opleidingIds) =>
    opleidingIds
      .map((opleidingId) => {
        const opleiding = opleidingen.find((item) => item.id === opleidingId);

        return opleiding?.name;
      })
      .filter(Boolean)
      .join(", ");

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

  const filteredRichtingen = richtingen.filter(
    (richting) =>
      richting.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedOpleiding === "" ||
        richting.opleidingen.includes(selectedOpleiding)) &&
      (selectedCampus === "" || richting.campus === selectedCampus) &&
      (selectedNiveau === "" || richting.niveau === selectedNiveau),
  );

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedProductCategory("");
    setSelectedBlogCategory("");
    setSelectedOpleiding("");
    setSelectedCampus("");
    setSelectedNiveau("");
    setSortOption("price-asc");
    setBlogSortOption("date-desc");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Text style={styles.badge}>BA Mechelen</Text>
        <Text style={styles.title}>Vind jouw plek, kies jouw pad</Text>
        <Text style={styles.subtitle}>
          Ontdek producten, nieuws, campussen en studierichtingen van
          Busleyden Atheneum.
        </Text>
      </View>

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
          {visibleProductCategories.map((category) => (
            <Picker.Item
              key={category.id}
              label={category.name}
              value={category.id}
            />
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

        <Picker
          selectedValue={selectedCampus}
          onValueChange={setSelectedCampus}
          style={styles.picker}
        >
          <Picker.Item label="Alle campussen" value="" />
          {campussen.map((campus) => (
            <Picker.Item
              key={campus.id}
              label={campus.title}
              value={campus.id}
            />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedNiveau}
          onValueChange={setSelectedNiveau}
          style={styles.picker}
        >
          {Object.entries(niveauNames).map(([id, name]) => (
            <Picker.Item key={id || "all"} label={name} value={id} />
          ))}
        </Picker>

        <Text style={styles.studyCount}>
          {filteredRichtingen.length} richtingen gevonden
        </Text>

        <Button title="Reset filters" color="#7aaa25" onPress={resetFilters} />
      </View>

      <Text style={styles.sectionTitle}>Studiezoeker</Text>

      {filteredRichtingen.map((richting) => (
        <View key={richting.id} style={styles.richtingCard}>
          {richting.image && (
            <Image source={{ uri: richting.image }} style={styles.richtingImage} />
          )}
          <View style={styles.richtingContent}>
            <Text style={styles.richtingNiveau}>
              {niveauNames[richting.niveau] || "Niveau onbekend"}
            </Text>
            <Text style={styles.richtingTitle}>{richting.title}</Text>
            <Text style={styles.richtingMeta}>
              {getCampusName(richting.campus)}
            </Text>
            <Text style={styles.richtingMeta}>
              {getOpleidingNames(richting.opleidingen)}
            </Text>
            <Text style={styles.richtingText} numberOfLines={3}>
              {richting.description}
            </Text>
          </View>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Producten</Text>

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
                ...product,
                category: getProductCategoryName(product.category),
              })
            }
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
            <NewsCard
              key={blog.id}
              title={blog.title}
              image={blog.image}
              excerpt={blog.intro}
              onPress={() => navigation.navigate("NewsDetails", blog)}
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
    backgroundColor: "#f4f5f0",
    padding: 20,
    paddingTop: 24,
    flex: 1,
  },

  hero: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 22,
    marginBottom: 20,
  },

  badge: {
    color: "#b7e34a",
    fontWeight: "bold",
    marginBottom: 12,
    textTransform: "uppercase",
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    color: "#d8d8d8",
    fontSize: 15,
    lineHeight: 22,
  },

  search: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e1e4dc",
  },

  controlsCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e1e4dc",
  },

  controlLabel: {
    color: "#171717",
    fontWeight: "bold",
    marginBottom: 6,
  },

  picker: {
    backgroundColor: "#f8f9f5",
    marginBottom: 20,
  },

  sectionTitle: {
    color: "#171717",
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
    color: "#555",
    marginRight: 8,
  },

  gameButton: {
    backgroundColor: "#171717",
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

  studyCount: {
    color: "#668b18",
    fontWeight: "bold",
    marginBottom: 15,
  },

  richtingCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e1e4dc",
  },

  richtingImage: {
    width: "100%",
    height: 170,
    resizeMode: "cover",
  },

  richtingContent: {
    padding: 14,
  },

  richtingNiveau: {
    color: "#668b18",
    fontWeight: "bold",
    marginBottom: 6,
  },

  richtingTitle: {
    color: "#171717",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  richtingMeta: {
    color: "#555",
    marginBottom: 4,
  },

  richtingText: {
    color: "#666",
    lineHeight: 20,
    marginTop: 8,
  },
});

export default HomeScreen;
