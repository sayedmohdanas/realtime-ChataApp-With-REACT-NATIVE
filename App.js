import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./Screen/StackNavigator";
import { UseContext } from "./userContext";

export default function App() {
  return (
    <>
    <UseContext>
    <StackNavigator />

    </UseContext>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
