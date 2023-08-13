import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect ,useContext, useEffect, useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { UserType } from "../userContext";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { localhost } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "../Components/User";
const HomeScreen = () => {
    const navigation=useNavigation()
    const {userId,setUserId}=useContext(UserType)
    const [users,setUsers]=useState([])
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: "",
          headerLeft: () => (
            <Text style={{fontWeight:"bold",fontSize:16}}>Swift Chat</Text>
          ),
          headerRight:()=>(
        <View style={{flexDirection:"row",alignItems:"center",gap:8}}>
         <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
         <Ionicons name="ios-people-outline" size={24} color="black" />

        </View>
          )
,
          
        });
      }, []);
      useEffect(() => {
        const fetchUser = async () => {
          const token = await AsyncStorage.getItem("authToken");
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.userId; 
          console.log(userId,'fff')

          setUserId(userId);
          console.log(localhost+"users"+userId)

          const response = await axios.get(localhost + "/users/" + userId); 
          console.log(response.data);
          setUsers(response?.data?.allUser)

        };

      
        fetchUser();
      }, []);
      console.log(users,'uuuuuu')
    return(
        <View>
         <View style={{padding:10}}>
         {users?.map((item,index)=>(
          <User item={item} key={index}/>
         ))}
          
         </View>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({});