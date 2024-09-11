import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useUser } from '../context/userContext'; // Fix import
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = () => {
  const { user, login } = useUser(); // Fix hook name
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(user.avatar || null);
  const [hasChanges, setHasChanges] = useState(false);

  const pickImage = () => {
    launchImageLibrary({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        setAvatar(response.assets[0].uri);
        setHasChanges(true);
      }
    });
  };

  const handleUpdate = () => {
    // Update the user context with the new details
    login({
      ...user,
      username,
      email,
      address,
      avatar,
      password, // In a real application, handle password change securely
    });
    setHasChanges(false); // Reset the changes flag after updating
  };

  useEffect(() => {
    if (
      username !== user.username ||
      email !== user.email ||
      address !== user.address ||
      avatar !== user.avatar ||
      password !== ''
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [username, email, address, avatar, password, user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: avatar }} style={styles.profileImage} />
        
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      /> */}
      {hasChanges && <Button title="Update Profile" onPress={handleUpdate} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  changePhotoText: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    fontSize: 18,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
});

export default ProfileScreen;
