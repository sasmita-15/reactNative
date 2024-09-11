import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useUser } from "../context/userContext";

const CartPage = () => {

  const {user,accessToken} =useUser();
  // console.log(user)
  
  const userId = user.user._id;
  const [products, setProducts] = useState([]);
  const apiUri = "http://192.168.58.156:8000";
  useEffect(() => {
    
    async function fetchProducts() {
      try {
        const response = await axios.post(apiUri + "/users/cart", {
          userId: userId,
        });
        // console.log(response.data.data.products);
        setProducts(response.data.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [products]);
  const handleRmvToCart = async (product) => {
    //   console.log(`Add to Cart  for product:${product._id} and accessToken: ${accessToken}` );
    await axios.post(apiUri + `/users/remove-to-cart`, {
      userId: userId,
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
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleBuyNow(item)}
        >
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleRmvToCart(item)}
        >
          <Text style={styles.buttonText}>Remove From Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {products.length === 0 ? (
        <Text>No products in cart</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

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
});

export default CartPage;
