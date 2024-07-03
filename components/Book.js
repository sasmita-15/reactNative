import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import axios from "axios";
import { useUser } from "../context/userContext";

export default function Book() {
  const [isBuyNowHovered, setIsBuyNowHovered] = useState(false);
  const [isAddToCartHovered, setIsAddToCartHovered] = useState(false);
  const {user} = useUser();
  const accessToken=user.accessToken;
  const [products, setProducts] = useState([]);
  const apiUri = "http://192.168.34.156:8000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(apiUri + "/users/products/book");
        setProducts(response.data.data.products);
        // console.log(response.data.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const handleBuyNow = async (product) => {

    console.log("Buy Now clicked for product:", product._id);
  };

  const handleAddToCart = async (product) => {
    //   console.log(`Add to Cart  for product:${product._id} and accessToken: ${accessToken}` );
      await axios.post(apiUri + `/users/add-to-cart`,{
        productId: product._id,
        headers: {
            
            Authorization: `Bearer ${accessToken}`,
        },
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <View>
        <Image
          source={{ uri: item.productImage }}
          style={styles.productImage}
        />
      </View>
      <View>
        <Text style={styles.productName}>{item.productname}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>₹{item.price}</Text>
        <Text style={styles.productRatings}>Rating: {item.ratings}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={[styles.button, isBuyNowHovered && styles.buttonHovered]}
          onPress={() => handleBuyNow(item)}
          onPressIn={() => setIsBuyNowHovered(true)}
          onPressOut={() => setIsBuyNowHovered(false)}
          underlayColor="#2980b9"
        >
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.button, isAddToCartHovered && styles.buttonHovered]}
          onPress={() => handleAddToCart(item)}
          onPressIn={() => setIsAddToCartHovered(true)}
          onPressOut={() => setIsAddToCartHovered(false)}
          underlayColor="#27ae60" 
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableHighlight>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productContainer: {
    flex: 1,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 16,
    color: "green",
    marginVertical: 4,
  },
  productRatings: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    flex: 1,
    
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
});
