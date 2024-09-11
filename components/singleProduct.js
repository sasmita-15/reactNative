import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableHighlight,
  Button,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useUser } from "../context/userContext.jsx";

const { width } = Dimensions.get("window");

export default function ProductDetails({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBuyNowHovered, setIsBuyNowHovered] = useState(false);
  const [isAddToCartHovered, setIsAddToCartHovered] = useState(false);
  const { user } = useUser();
  const accessToken = user.accessToken;
  const apiUri = "http://192.168.58.156:8000";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiUri}/users/singleProduct`, {
            productId: product._id,
            
          });
        setProduct(response.data.data.product);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleBuyNow = async () => {
    console.log("Buy Now clicked for product:", product._id);
    // Implement the logic for "Buy Now"
  };

  const handleAddToCart = async () => {
    await axios.post(
      `${apiUri}/users/add-to-cart`,
      {
        productId: product._id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={styles.productImage} />
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={product.images}
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={styles.imageList}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.productname}</Text>
        <Text style={styles.productPrice}>₹{product.price}</Text>
        <Text style={styles.productRatings}>Rating: {product.ratings}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={[styles.button, isBuyNowHovered && styles.buttonHovered]}
            onPress={handleBuyNow}
            onPressIn={() => setIsBuyNowHovered(true)}
            onPressOut={() => setIsBuyNowHovered(false)}
            underlayColor="#2980b9" // Color when pressed
          >
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, isAddToCartHovered && styles.buttonHovered]}
            onPress={handleAddToCart}
            onPressIn={() => setIsAddToCartHovered(true)}
            onPressOut={() => setIsAddToCartHovered(false)}
            underlayColor="#27ae60" // Color when pressed
          >
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageList: {
    height: 300,
  },
  productImage: {
    width,
    height: 300,
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  productPrice: {
    fontSize: 20,
    color: "green",
    marginVertical: 4,
  },
  productRatings: {
    fontSize: 16,
    color: "#666",
  },
  productDescription: {
    fontSize: 16,
    color: "#666",
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    flex: 1,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
  },
  buttonHovered: {
    backgroundColor: "#2980b9", // Change background color on hover
  },
});
