import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import axios from 'axios';


const RegisterPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const apiUri = 'http://192.168.58.156:8000';

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    try {
      console.log("req");
      const res = await axios.post(apiUri+"/users/register", {
        username,
        address,
        email,
        password,
      });
      

      if (res.status === 200) {
        Alert.alert('Success', 'registered successful');
        console.log("Registered successfully")
        console.log(res.email)
        navigation.navigate('Login');
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
        <View style={styles.authHeader}>
          <Text style={{ fontSize: 48, fontWeight: "bold", padding: 12 }}>
            Register
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
          <Text
            style={{
              fontSize: 22,
              marginHorizontal: 16,
              fontWeight: "bold",
              paddingTop: 14,
            }}
          >
            User Name
          </Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
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
          <Text
            style={{
              fontSize: 22,
              marginHorizontal: 16,
              fontWeight: "bold",
              paddingTop: 14,
            }}
          >
            Email
          </Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{ fontSize: 22, marginHorizontal: 16, fontWeight: "bold" }}
          >
            Password
          </Text>
          <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Password"
          />
        </View>
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{ fontSize: 22, marginHorizontal: 16, fontWeight: "bold" }}
          >
            Confirm Password
          </Text>
          <TextInput
            style={styles.inputBox}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="confirm Password"
          />
        </View>
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{ fontSize: 22, marginHorizontal: 16, fontWeight: "bold" }}
          >
            Address
          </Text>
          <TextInput
            style={styles.inputBox}
            value={address}
            onChangeText={setAddress}
            placeholder="current address"
          />
        </View>
        <View style={{ width: "100%", padding: 20 }}>
          <Button
            title="Register"
            style={{ borderRadius: 50 }}
            onPress={handleRegister}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{margin: 8, fontSize: 20, color: 'blue'}}>Already have an account? Login</Text>
      </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
    backgroundColor: "rgba(110, 100, 140, 0.3)",
    borderRadius: 18,
    height: 580,
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
  authHeader: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
});

export default RegisterPage;
