import React from 'react';
import ChatList from '../../components/chat/ChatList';
import SockJsClient from "react-stomp";
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import { useEffect } from 'react';
import { listChats } from '../../modules/chat';
import { changeField, writeChat } from '../../modules/chat_write';

const ChatRoomContainer = () => {

    const dispatch = useDispatch();
    const { user, messages, comment } = useSelector(
        ({ auth, chat, wChat}) => ({
          user: auth.user,
          messages: chat.messages,
          comment: wChat.comment,
        }),
    );

    useEffect(()=>{
        dispatch(listChats({token: user.accessToken}));
    }, [user, dispatch]);

    const onChange = (e) => {
        dispatch(changeField(e.target.value));
    }

    const onClick = () =>{
        dispatch(writeChat({
            content: comment,
            token: user.accessToken,
        }));
    }

    const onMessageReceived = (msg) => {
        console.log("New Message Received!!", msg);
        // setMessages(messages.concat(msg));
    }

    const customHeaders = {
        Authorization: "Bearer " + user.accessToken,
    };

    if(!messages) return null;

    return (
        <div className='ChatRoomContainer'>
            {/* <SockJsClient
                url={"http://3.39.95.217:8080/chat"}
                headers={customHeaders}
                topics={["/topic/kafka-chat"]}
                onConnect={console.log('connected!')}
                onDisconnect={console.log('disconnected!')}
                onMessage={(msg) => onMessageReceived(msg)}
                debug={false}
            /> */}
            <ChatList messages={messages} onClick={onClick} onChange={onChange} comment={comment}/>
        </div>
    );
};

export default ChatRoomContainer;