import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native";
import { useState } from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { localhost } from "../config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";



const LoginScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigation = useNavigation();
  useEffect(()=>{
const checkLoginStatus=async ()=>{
  try {
    const token=await AsyncStorage.getItem("authToken")
    if(token){
      navigation.replace("Home")
    }
  } catch (error) {
    
  }
}
checkLoginStatus()
  },[])

  const handleLogin = async () => {
    console.log("Logging in with email:", email);
    const user = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(localhost + "/loginUser", user);
      console.log("Login API response:", response.data);
      const token=response.data.token
      if (token !== undefined) { 
        AsyncStorage.setItem("authToken", token.toString());
        navigation.navigate("Home");
        console.log("Token:", token);
      } else {
        console.log("Token is undefined.");
      }
      alert(response.data.msg);
    } catch (error) {
      console.log("Login error:", error);
      alert(error.response ? error.response.data.msg : "An error occurred.");
    }
  
  
    
  }
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
            Sign In
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "600", marginTop: 15 }}>
            Sign In to your Account
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
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
        <Pressable
        onPress={handleLogin}
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
            Login
          </Text>
        </Pressable>
        <Pressable
          
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            {" "}
            Dont't have an account?SignUp
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
