import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { searchSponsoredProducts, getAllProducts, getProductById } from "./utils/searchApi"; // Use correct relative path

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await searchSponsoredProducts("phone"); // Fetch sponsored products
        setProducts(results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        Outwit Shop Products
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text style={{ fontSize: 18 }}>{item.name}</Text>
              <Text style={{ color: "gray" }}>{item.price}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
