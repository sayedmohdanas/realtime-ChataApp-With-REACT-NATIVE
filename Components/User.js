import { StyleSheet, Text, View ,Image,Pressable} from "react-native";
import {useContext, useState} from "react"
import { UserType } from "../userContext";
import axios from "axios";
import { localhost } from "../config";




const User = ({item}) => {  
    const {userId,setUserId}=useContext(UserType)
    const [requestSent,setRequestSent]=useState(false)
    console.log(userId)


    const sendFriendRequest= async(currentUserId,selectedUserId)=>{

        try {
            const id={
                currentUserId:currentUserId,
                selectedUserId:selectedUserId
            }
        const response=await axios.post(localhost+"/friend-request",id)
        console.log(response.data.msg)
        alert(response.data.msg)
        } catch (error) {
            console.log(error)
        }

    }

return(
   <Pressable style={{flexDirection:'row',alignItems:"center",marginVertical:10}}>
    <View>
        <Image style={{height:50,width:50,borderRadius:50,resizeMode:"cover"}} source={{uri:item.image}}/>
    </View>
    <View style={{marginLeft:12,flex:1}}>
        <Text style={{fontWeight:'bold',color:"black"}}>{item?.name}</Text>
        <Text style={{marginTop:4,color:"gray"}}>{item?.email}</Text>
    </View>
    <Pressable 
    onPress={()=>sendFriendRequest(userId,item._id)}
    style={{backgroundColor:"#567189",padding:10,borderRadius:6,width:105,alignItems:"center"}}>
        <Text style={{color:"white"}}>Add Friend</Text>
    </Pressable>
   </Pressable>
)
}
export default User
const styles = StyleSheet.create({});