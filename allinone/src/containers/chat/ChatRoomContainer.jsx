import React, { useRef, useState } from 'react';
import ChatList from '../../components/chat/ChatList';
import SockJsClient from 'react-stomp';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import { useEffect } from 'react';
import { useParams } from '../../../node_modules/react-router-dom/index';
import Button from '../../common/Button';
import { loadMessage, updateChat } from '../../modules/chat/message';
import { changeField, initialize, writeMessage } from '../../modules/chat/write';
import { exit, getRoomParticipants, invite } from '../../modules/chat/room';
import ShowChatRoomParticipantsActionButton from '../../components/chat/ShowChatRoomParticipantsActionButton';
import { addFriend, getFriends } from '../../modules/auth/auth';

import '../../styles/ChatRoomContainer.scss';
import FriendList from '../../components/chat/FriendList';
import { searchMessage } from '../../lib/api/chat';



const ChatRoomContainer = () => {

    const dispatch = useDispatch();
    const { channelId } = useParams();
    const scrollRef = useRef([]);

    const { user, messages, message, participants, friends, searchTargetMessage } = useSelector(
      ({ auth, message, wMessage, room }) => ({
        user: auth.user,
        messages: message.messages,
        message: wMessage.message,
        searchTargetMessage: message.searchMessage,
        participants: room.participants,
        friends: auth.friends,
      }),
    );

    const [searchInputMessage, setSearchInputMessage] = useState();

    /**
     * 입장시 채팅 내역 불러오기
     */
    useEffect(() => {
      dispatch(loadMessage({
        token: user.accessToken,
        channel_id: channelId,
      }));
    }, [user, dispatch, channelId]);

    /**
     * 채팅 참가자들 내역 불러오기
     */
    useEffect(() => {
      console.log(channelId);
      dispatch(getRoomParticipants({
        token: user.accessToken,
        channel_id: channelId,
      }));
    }, [dispatch, user, channelId]);


    /**
     * 친구 목록 불러오기
     */
    useEffect(() => {
      if (friends == null)
        dispatch(getFriends({ token: user.accessToken }));
    }, [dispatch, user]);

    useEffect(() => {
      if (searchTargetMessage) {
        scrollRef.current[searchTargetMessage.chat_id].scrollIntoView({ behavior: 'smooth' });
      }
    }, [scrollRef,searchTargetMessage]);

    /**
     * 메세지 입력 후 스크롤
     */
    useEffect(() => {
      if(scrollRef.current.length!=0)
        scrollRef.current[scrollRef.current.length - 1].scrollIntoView({ behavior: 'smooth' });
    }, [messages, scrollRef.current]);


    const onChange = (e) => {
      dispatch(changeField({
        'key': 'message',
        'value': e.target.value,
      }));
    };

    async function onClickSearchButton () {

      console.log('search: ' + searchInputMessage);
      const target = await searchMessage({
        token: user.accessToken,
        channel_id: channelId,
        content: searchInputMessage,
      });
      scrollRef.current[target.data.data.records[0].chat_id].scrollIntoView({ behavior: 'smooth' });
      setSearchInputMessage('');
    };

    const onClick = () => {
      dispatch(writeMessage({
        content: message,
        token: user.accessToken,
        channel_id: channelId,
      }));
      dispatch(initialize());
    };

    const onClickExit = () => {
      dispatch(exit({
        token: user.accessToken,
        channel_id: channelId,
      }));
    };

    const [modal, setModal] = useState(false);
    const onCancelModal = () => {
      setModal(false);
    };

    const onClickModal = () => {
      setModal(true);
    };

    const onConfirm = (user_name, user_email) => {
      console.log(user_name, user_email);
      dispatch(addFriend({
        token: user.accessToken,
        user_name,
        user_email,
      }));
      setModal(false);
    };

    const onClickInvite = (user_name, user_email) => {
      dispatch(invite({
        token: user.accessToken,
        channel_id: channelId,
        user_name,
        user_email,
      }));
    };

    const onMessageReceived = (msg) => {
      dispatch(updateChat(msg));
    };

    const findMessage = (msg) => {

    };

    const customHeaders = {
      Authorization: 'Bearer ' + user.accessToken,
    };

    if (!messages) return null;

    return (
      <div className='ChatRoomContainer'>
        <SockJsClient
          url={'http://3.39.95.217:8080/chat/'}
          headers={customHeaders}
          topics={[`/topic/kafka-chat/${channelId}`]}
          onConnect={console.log('connected!')}
          onDisconnect={console.log('disconnected!')}
          onMessage={(msg) => onMessageReceived(msg)}
          debug={true}
        />
        {friends && <FriendList friends={friends} onClickInvite={onClickInvite} />}
        <ChatList messages={messages} onClick={onClick} onChange={onChange} comment={message} onClickModal={onClickModal}
                  onCancelModal={onCancelModal} onConfirm={onConfirm} modal={modal} searchMessage={searchInputMessage}
                  onChangeSearchMessage={setSearchInputMessage} onClickSearchButton={onClickSearchButton}
                  ref={scrollRef} />
        <Button onClick={onClickExit}>채팅방 나가기</Button>
        <ShowChatRoomParticipantsActionButton participants={participants} onConfirm={onConfirm} />

      </div>
    );
  }
;

export default ChatRoomContainer;