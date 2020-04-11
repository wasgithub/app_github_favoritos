import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import { RectButton} from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialIcons";

import api from '../../services/api'


// import { Container } from './styles';

export default function Main() {

  const [user, setUser] = useState([])
  const [newUser, setNewUser] = useState('')

  const handleAddUser = async () => {
    const response = api.get(`/users/${newUser}`)
    const { name, login, bio, avatar_url} = response

    const data ={
      name,
      login,
      bio,
      avatar_url
    }

    setNewUser([...user, data]);
    setNewUser('')

    Keyboard.dismiss();

  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Adicionar usuário"
          value={newUser}
          onChangeText={text => setNewUser(text)}
          placeholderTextColor={"#999"}
          style={styles.input}
          returnKeyType={"send"}
          onSubmitEditing={handleAddUser} />
        <RectButton style={styles.submitButton} onPress={handleAddUser}>
          <Icon name="add" size={25} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  form: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#C0C0C0",
    paddingBottom: 20
  },
  input: {
    flex: 1,
    backgroundColor: "#eee",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#C0C0C0",
    paddingLeft: 16
  },
  submitButton: {
    backgroundColor: "#7159c3",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    paddingHorizontal: 12
  }
})
