import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import api from '../../services/api'
import { FlatList } from 'react-native-gesture-handler';

// import { Container } from './styles';

export default function User(props) {
  const [user, setUser] = useState(props.navigation.getParam('user'))
  const [stars, setStars] = useState([])

  useEffect(() => {
    getStars()
  }, [])

  const getStars = async () => {
    try {
      const response = await api.get(`/users/${user.login}/starred`)
      setStars(response.data);
    } catch (error) {

    }
  }

  console.tron.log("star...", stars)
  return (
    <View>
      <View style={styles.user}>
        <Image source={{uri: user.avatar_url}} style={styles.avatar_url}/>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>
      <FlatList
        style={styles.stars}
        data={stars}
        keyExtractor={star => String(star.id)}
        renderItem={({item}) => (
          <View style={styles.starred}>
            <Image style={styles.ownerAvatar} source={{uri: item.owner.avatar_url}}/>
            <View style={styles.info}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.author}>{item.owner.login}</Text>
            </View>
          </View>
        )}
        />
    </View>
  );
}

User.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('user').name
})

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
    height: 130,
    width: 130,
    borderRadius: 65,
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
  stars: {
    marginTop: 20
  },
  starred: {
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  ownerAvatar: {
    height: 42,
    width: 42,
    borderRadius: 21
  },
  info: {
    marginLeft: 10,
    flex: 1
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333"
  },
  author: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#666"

  }
})

