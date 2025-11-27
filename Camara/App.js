import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const validarLogin = () => {
    const validUser = 'admin';
    const validPass = '1234';
    if (user === validUser && pass === validPass) {
      Alert.alert('Correcto', 'Inicio de sesión exitoso');
      setLoggedIn(true);
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  const cambiarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a las imágenes');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const tomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!loggedIn ? (
        <View style={styles.loginBox}>
          <TextInput
            placeholder="Usuario"
            style={styles.input}
            value={user}
            onChangeText={setUser}
          />
          <TextInput
            placeholder="Contraseña"
            style={styles.input}
            secureTextEntry
            value={pass}
            onChangeText={setPass}
          />
          <TouchableOpacity style={styles.button} onPress={validarLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.profileBox}>
          <Image
            source={
              imageUri
                ? { uri: imageUri }
                : require('./assets/favicon.png')
            }
            style={styles.avatar}
          />

          <TouchableOpacity style={styles.button} onPress={cambiarImagen}>
            <Text style={styles.buttonText}>Elegir desde galería</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: '#2196F3' }]} onPress={tomarFoto}>
            <Text style={styles.buttonText}>Tomar foto</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loginBox: { width: '80%' },
  input: { borderWidth: 1, marginVertical: 8, padding: 10, borderRadius: 5 },
  button: { backgroundColor: 'green', padding: 12, borderRadius: 5, marginTop: 10 },
  buttonText: { color: 'white', textAlign: 'center' },
  profileBox: { alignItems: 'center' },
  avatar: { width: 150, height: 150, borderRadius: 100, marginBottom: 20 },
});
