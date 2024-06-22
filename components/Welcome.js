import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const Welcome = () => {
  return (
    <View style={styles.container}>
    <ImageBackground 
      source={{uri: 'https://www.goodmorninggodimages.in/wp-content/uploads/2024/03/Suprabhat-Jai-Shree-Jagannath-Fabalous-Image.png'}} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Jay Jagannath</Text>
        <Text style={styles.subtitle}>Explore the divine and serene</Text>
      </View>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    margin: 0,
    padding: 0,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default Welcome;
