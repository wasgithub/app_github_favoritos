import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Keyboard, Image, Text, FlatList, Alert } from 'react-native';
import { RectButton} from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialIcons";

import api from '../../services/api'


// import { Container } from './styles';

export default function Main(props) {

  const [user, setUser] = useState([])
  const [newUser, setNewUser] = useState('')

  const handleAddUser = async () => {
    const response = await api.get(`/users/${newUser}`)
    const { name, login, bio, avatar_url } = response.data;

    let data ={
      name,
      login,
      bio,
      avatar_url
    }

    setUser([...user, data]);
    setNewUser('')
    console.tron.log(user)

    Keyboard.dismiss();

  }

  const handleProfile = () => {
    props.navigation.navigate("User")
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
          keyboardType={"email-address"}
          onSubmitEditing={handleAddUser} />
        <RectButton style={styles.submitButton} onPress={handleAddUser}>
          <Icon name="add" size={25} color="#FFF" />
        </RectButton>
      </View>
      <FlatList
        style={styles.list}
        data={user}
        showsVerticalScrollIndicator={false}
        keyExtractor={user => user.login}
        renderItem={({ item }) => {
          return(
            <View style={styles.user}>
              <Image source={{uri: item.avatar_url}} style={styles.avatar_url}/>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.bio}>{item.bio}</Text>
              <RectButton style={styles.perfilButton} onPress={handleProfile}>
                <Text style={styles.perfilButtonText}>Ver Perfil</Text>
              </RectButton>
            </View>
          )

        }}/>
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
  },
  list: {
    marginTop: 20
  },
  user: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  avatar_url: {
    height: 84,
    width: 84,
    borderRadius: 41,
    backgroundColor: "#eee"
  },
  name: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center"
  },
  bio: {
    textAlign: "center",
    fontSize: 13,
    lineHeight: 18,
    color: "#999",
    marginTop: 8
  },
  perfilButton: {
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: "#7159c1",
    height: 42,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center"
  },
  perfilButtonText: {
    color: "#fff",
    fontSize: 14,
    textTransform: "uppercase"
  }
})
