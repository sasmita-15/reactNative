import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet } from 'react-native';
import { useUser } from '../context/userContext';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = () => {
  const { user, login } = useUser();
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
      <View><Image source={{uri: `${avatar}`}} style={styles.profileImage} /></View>
     
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
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      {hasChanges && <Button title="Update Profile" onPress={handleUpdate} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  profileImage: {
    
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  input: {
    fontSize: 20, // Larger text size
    borderBottomWidth: 1, // Optional: Add a bottom border if desired
    borderBottomColor: '#ccc', // Optional: Border color
    width: '80%', // Full width
    paddingVertical: 10, // Padding for some spacing
    color: '#000', // Text color
    fontFamily: 'System', // Use system font
  },
});

export default ProfileScreen;
