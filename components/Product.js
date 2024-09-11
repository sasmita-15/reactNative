import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";

function Product({route}) {
  const apiUri = 'http://192.168.58.156:8000';
  
  useEffect(()=> {
    // console.log(route)
    // user=route.params.user
  },[])
  
  const [username,setUsername] = useState("")
  // const { name } = route.params;
  // console.log(user)

  // setUsername(user)
  const fetchData = async () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
    try {
      const response = await fetch(apiUri+"/users/products/food");
      const result = await response.json();
      
      setData(result);
    } catch (error) {
      console.error(error);
    }
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
