import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AsyncStorage } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [name, setName] = useState();
  const [id, setId] = useState();

  const save = async () => {
    try {
      await AsyncStorage.setItem("MyName", name);
      await AsyncStorage.setItem("MyId", id);
    } catch (err) {
      alert(err);
    }
  };

  const load = async () => {
    try {
      let name = await AsyncStorage.getItem("MyName");
      let id = await AsyncStorage.getItem("MyId");

      if (name !== null || id !== null) {
        setName(name);
        setId(id);
      }
    } catch (err) {
      alert(err);
    }
  };

  const remove = async () => {
    try {
      await AsyncStorage.removeItem("MyName");
      await AsyncStorage.removeItem("MyId");
    } catch (err) {
      alert(err);
    } finally {
      setName("");
      setId("");
    }
  };

  const sort = async () => {
    let name = await AsyncStorage.getItem("MyName");
    name.sort();
    try {
      await AsyncStorage.getItem("MyName");
      await AsyncStorage.getItem("MyId");
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ height: 30 }}> </Text>
      <Text style={{ height: 30 }}> </Text>

      <Text style={styles.name}>What is your Name and Id?</Text>

      <TextInput style={styles.input} onChangeText={(text) => setName(text) } placeholder="Enter Your First Name" />
      <TextInput style={styles.input} onChangeText={(text) => setId(text)} placeholder="Enter Your Last Name" />

      <TouchableOpacity style={styles.button} onPress={() => save()}>
        <Text style={{ color: "white" }}>Save my name!</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} >
        <Text style={{ color: "white" }}>Next</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.button} onPress={() => sort()}>
        <Text style={{ color: "white" }}>Sort</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => save()}>
        <Text style={{ color: "white" }}>Edit</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "300",
  },
  input: {
    borderWidth: 1,
    borderColor: "#575DD9",
    alignSelf: "stretch",
    margin: 32,
    height: 64,
    borderRadius: 6,
    paddingHorizontal: 16,
    fontSize: 24,
    fontWeight: "300",
  },
  button: {
    backgroundColor: "#575DD9",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 32,
    marginHorizontal: 32,
    borderRadius: 6,
  },
});