import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Button,
  Alert ,
} from "react-native";
import axios from 'axios';
import {useUser} from "../context/userContext";

function Login({navigation}) {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  // const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const apiUri = 'http://192.168.34.156:8000';
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("req");
      // console.log(email+ "  "+ password)
      const user = await axios.post(apiUri+"/users/login", {
        email,
        password,
      });
      login(user.data.data.user)
      
      if (user.status === 200) {
        Alert.alert('Success', 'Login successful');
        navigation.navigate('Home',{user});
      }
    } catch (error) {
      console.log(error);
    }
    
  };
  
  const bgImage = {
    uri: "https://i.pinimg.com/236x/56/90/68/56906859732d7afaeaec97c2d042f6cc.jpg",
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.bgimg} />
      <View style={styles.authCard}>
        <View style={styles.inputField}>
        
          <Text style={{fontSize: 48, fontWeight: "bold", padding: 12,}}>
            Login
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: 12,
            flex: 1,
            alignItems: "flex-start",
            
            backgroundColor: "transparent",
          }}
        >
          <Text style={{ fontSize: 22, marginHorizontal: 16, fontWeight: "bold", paddingTop: 14 }}>email</Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={setEmail}
            value={email}
            placeholder="email"
          />
        </View>
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "flex-start",
          }}
        >
          <Text style={{ fontSize: 22, marginHorizontal: 16, fontWeight: "bold", }}>Password</Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={setPassword}
            secureTextEntry
            value={password}
            placeholder="Password"
            
          />
        </View>
        <View
          style={{
            width: "100%",
            height: 20,
            flex: 1,
            alignItems: "flex-start",
            borderColor: "black",
            backgroundColor: "sky",
          }}
        >
          <View style={{ width: "100%", padding: 20 }}>
          <Button
            title="Login"
            style={{ borderRadius: 50 }}
            onPress={handleSubmit}
          />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{margin: 8, fontSize: 20, color: 'blue'}}>Don't have an account? Register</Text>
      </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bgimg: {
    height: "100%",
    width: "100%",
  },
  authCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 18,
    height: 430,
    width: 350,
  },
  inputBox: {
    width: "92%",
    height: 42,
    backgroundColor: "white",
    margin: "auto",
    borderRadius: 8,
    padding: 8,
    fontSize: 20,
  },
  inputField: { backgroundColor: 'rgba(0,0,0,0.5)' , width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems:'center'}

});

export default Login;
