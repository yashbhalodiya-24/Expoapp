// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import ChatRoomScreen from "../Screens/ChatRoomScreen";
// import ChatContextProvider from "../../context/ChatContext";
// import { Pressable } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import Home from "../Screens/Home";
// import Chat from "../Screens/Chat";

// const Stack = createNativeStackNavigator();

// const ChatStackNavigation = () => {
//   return (
//     <ChatContextProvider>
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Chat"
//         component={Chat}
//         options={({ navigation }) => ({
//           headerRight: () => (
//             <Pressable
//               onPress={() => navigation.navigate("Home")}
//               style={({ pressed }) => ({
//                 opacity: pressed ? 0.5 : 1,
//               })}
//             >
//               <FontAwesome
//                 name="users"
//                 size={25}
//                 color={"dimgray"}
//                 style={{ marginRight: 15 }}
//               />
//             </Pressable>
//           ),
//         })}
//       />
//       <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />

//       <Stack.Group screenOptions={{ presentation: "modal" }}>
//         <Stack.Screen name="Users" component={Home} />
//       </Stack.Group>
//     </Stack.Navigator>
//     </ChatContextProvider>

//   );
// };
// export default ChatStackNavigation;