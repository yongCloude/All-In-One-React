import React from 'react';
import ChatList from '../../components/chat/ChatList';
import SockJsClient from "react-stomp";
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import { useEffect } from 'react';
import { useParams } from '../../../node_modules/react-router-dom/index';
import Button from '../../common/Button';
import { loadChats, updateChat } from '../../modules/chat/message';
import { changeField, initialize, writeMessage } from '../../modules/chat/write';
import { exit } from '../../modules/chat/room';

const ChatRoomContainer = () => {

    const dispatch = useDispatch();
    const {channelId} = useParams();
    const { user, messages, message } = useSelector(
        ({ auth, message, wMessage}) => ({
          user: auth.user,
          messages: message.messages,
          message: wMessage.message,
        }),
    );

    useEffect(()=>{
        dispatch(loadChats({token: user.accessToken,
        channel_id: channelId}));
    }, [user, dispatch, channelId]);

    const onChange = (e) => {
        dispatch(changeField({
            "key": "message",
            "value": e.target.value
        }));
    }

    const onClick = () =>{
        dispatch(writeMessage({
            content: message,
            token: user.accessToken,
            channel_id: channelId,
        }));
        dispatch(initialize());
    }

    const onClickExit = () => {
        dispatch(exit({
            token: user.accessToken,
            channel_id: channelId
        }));
    }

    const onMessageReceived = (msg) => {
        dispatch(updateChat(msg));
    }

    const customHeaders = {
        Authorization: "Bearer " + user.accessToken,
    };

    if(!messages) return null;

    return (
        <div className='ChatRoomContainer'>
            <SockJsClient
                url={"http://3.39.95.217:8080/chat/"}
                headers={customHeaders}
                topics={[`/topic/kafka-chat/${channelId}`]}
                onConnect={console.log('connected!')}
                onDisconnect={console.log('disconnected!')}
                onMessage={(msg) => onMessageReceived(msg)}
                debug={true}
            />
            <ChatList messages={messages} onClick={onClick} onChange={onChange} comment={message}/>
            <Button onClick={onClickExit}>채팅방 나가기</Button>
        </div>
    );
};

export default ChatRoomContainer;