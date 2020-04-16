import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Keyboard, Image, Text, FlatList, Alert, ActivityIndicator } from 'react-native';
import { RectButton} from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api'


// import { Container } from './styles';

export default function Main(props) {

  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [newUser, setNewUser] = useState('')

  useEffect( () => {
    setUserStorage();
  },[])

  useEffect(() => {
    AsyncStorage.setItem('user', JSON.stringify(user))
  },[user])

  const setUserStorage = async () =>  {
    const users = await AsyncStorage.getItem('user');
    console.log("users", users)

    if(users) {
      console.tron.log(users)
      setUser(JSON.parse(users));
    }
  }

  const handleAddUser = async () => {
    try {
      setLoading(true);
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
    } catch (error) {
      console.tron.log(error)
    } finally {
      setLoading(false);
      Keyboard.dismiss();
    }

  }

  const handleProfile = (user) => {
    props.navigation.navigate("User", { user })
  }

  const handleDelete = item => {
    const AuxUser = user.filter(use => {
      return use.login != item.login
    })
    setUser(AuxUser)
    AsyncStorage.setItem('user', JSON.stringify(AuxUser))

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
        <RectButton
          style={[styles.submitButton, {opacity: loading ? .7 : 1 }]}
          onPress={handleAddUser}>
          {
            loading
              ? <ActivityIndicator color="#FFF" />
              : <Icon name="add" size={25} color="#FFF" />
          }
        </RectButton>
      </View>
      <FlatList
        style={styles.list}
        data={user}
        showsVerticalScrollIndicator={false}
        keyExtractor={user => user.login}
        renderItem={({ item, index }) => {
          return(
            <View style={styles.user}>
              <RectButton style={styles.buttonDelete} onPress={() => handleDelete(item)}>
                <Icon name="delete" size={25} color={"red"} />
              </RectButton>
              <Image source={{uri: item.avatar_url}} style={styles.avatar_url}/>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.bio}>{item.bio}</Text>
              <RectButton style={styles.perfilButton} onPress={() => handleProfile(item)}>
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
  },
  buttonDelete: {
    position: "absolute",
    top: 0,
    right: 30
  }
})
