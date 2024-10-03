import { View, Text } from 'react-native';
import React from 'react';
import { Channel, MessageInput, MessageList, } from 'stream-chat-expo';
import {useChatContext} from '../../context/ChatContext';

const ChatRoomScreen = () => {
  const {currentChannel} = useChatContext();

// useEffect(()=>{
// navigation.setOptions({title:currentChannel?.data?.name || "Channel"});
// },[currentChannel?.data?.name]);


  return (
    <Channel channel={currentChannel}>
      <MessageList/>
      <MessageInput/>
    </Channel>
  )
}

export default ChatRoomScreen