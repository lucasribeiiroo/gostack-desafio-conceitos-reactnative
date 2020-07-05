import React, { useEffect, useState } from "react";
import { getRepositories, likeRepository } from './services/requests';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const repository = 
{
  id: 'd6e43105-a559-45b7-8fd7-53416b415741',
  title: "Desafio React Native",
  url: "https://github.com/josepholiveira",
  techs: ["React Native", "Node.js"],
  likes: 0,
}

export default function App() {
  const [repositories, setRepositories] = useState([repository]);

  async function handleLikeRepository(id) {
    const repo = repositories.find(rep => rep.id === id);
    if(repo) {
      repo.likes++;
    }
    const newRepositories = repositories.map(repository => repository.id === repo.id? repo: repository)
    setRepositories(newRepositories);
    likeRepository(id);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          renderItem={( { item } ) => (
          <View style={styles.repositoryContainer} key={item.id}>
              <Text style={styles.repository}>{item.title}</Text>
            
              <View style={styles.techsContainer}>
                {item.techs.map(item => (
                  <Text style={styles.tech} key={item}>
                    {item}
                  </Text>
                ))}                 
              </View>
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${item.id}`}
                >
                  {item.likes } curtidas
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(item.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${item.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
          </View>
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
