import { StyleSheet, Text, View } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native";
import { useState } from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { localhost } from "../config";

import React from "react";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const navigation = useNavigation();
  const handleRegister = async () => {
    try {
      const user = {
        name: name,
        password: password,
        email: email,
        image: image,
      };
      console.log(user, "fffff");
      const response = await axios.post(localhost+"/register", user);
      alert(response.data.msg)
      console.log(response.data);
      // if (response.status === 200) {
      //   console.log(response);
      // } else {
      //   console.log("Registration failed");
      // }
    } catch (error) {
      alert(error.response.data.msg)
      
      if (axios.isAxiosError(error) && error.response) {
        console.log(
          "An error occurred during registration:",
          error.response.data
        );
      } else {
        console.log("her1", error.message);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "600", color: "#4a55A2" }}>
            Register
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "600", marginTop: 15 }}>
            Register your Account
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Name
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                fontSize: 18,
                width: 300,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
              }}
              placeholderTextColor={"black"}
              placeholder="Name"
            />
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                fontSize: 18,
                width: 300,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
              }}
              placeholderTextColor={"black"}
              placeholder="Enter your Email"
            />
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={{
              fontSize: 18,
              width: 300,
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              marginVertical: 10,
            }}
            placeholderTextColor={"black"}
            placeholder="Password"
          />
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
            Image
          </Text>
          <TextInput
            value={image}
            onChangeText={(text) => setImage(text)}
            style={{
              fontSize: 18,
              width: 300,
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              marginVertical: 10,
            }}
            placeholderTextColor={"black"}
            placeholder="Image"
          />
        </View>
        <Pressable
          onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: "#4A55A2",
            marginTop: 50,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 8,
            padding: 15,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Register
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("login")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            {" "}
            Already have an account?Login
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
