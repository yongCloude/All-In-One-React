import React from 'react';
import ChatList from '../../components/chat/ChatList';
import SockJsClient from "react-stomp";
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import { useEffect } from 'react';
import { exitRoom, getChat, listChats } from '../../modules/chat';
import { changeField, initialize, writeChat } from '../../modules/chat_write';
import { useParams } from '../../../node_modules/react-router-dom/index';
import Button from '../../common/Button';

const ChatRoomContainer = () => {

    const dispatch = useDispatch();
    const {channelId} = useParams();
    const { user, messages, comment } = useSelector(
        ({ auth, chat, wChat}) => ({
          user: auth.user,
          messages: chat.messages,
          comment: wChat.comment,
        }),
    );

    useEffect(()=>{
        dispatch(listChats({token: user.accessToken,
        channel_id: channelId}));
    }, [user, dispatch, channelId]);

    const onChange = (e) => {
        dispatch(changeField({
            "key": "comment",
            "value": e.target.value
        }));
    }

    const onClick = () =>{
        dispatch(writeChat({
            content: comment,
            token: user.accessToken,
            channel_id: channelId,
        }));
        dispatch(initialize());        
    }

    const onClickExit = () => {
        dispatch(exitRoom({
            token: user.accessToken,
            channel_id: channelId
        }));
    }

    const onMessageReceived = (msg) => {
        console.log("New Message Received!!", msg);
        dispatch(getChat(msg));
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
            <ChatList messages={messages} onClick={onClick} onChange={onChange} comment={comment}/>
            <Button onClick={onClickExit}>채팅방 나가기</Button>
        </div>
    );
};

export default ChatRoomContainer;