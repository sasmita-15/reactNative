import React, {useState} from "react";
import { Text, View, StyleSheet } from "react-native";

function Product() {
  const fetchData = async () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const result = await response.json();
      
      setData(result);
    } catch (error) {
      console.error(error);
    }
    const renderItem = ({ item }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.price}</Text>
      </View>
    );
    console.log(result);
    return (
      <View style={{width: '100%', height:'100%'}}>
        <View style={styles.container}>
            <FlatList
              data={data}
              
              renderItem={renderItem}
            />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 100,
    width: 100,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  body: {
    fontSize: 16,
  },
});

export default Product;
