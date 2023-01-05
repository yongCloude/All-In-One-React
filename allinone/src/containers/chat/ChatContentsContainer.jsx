import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useParams } from 'react-router-dom';
import { loadMessage, updateChat } from '../../modules/chat/message';
import { exit, getRoomParticipants, invite } from '../../modules/chat/room';
import { addFriend, getFriends } from '../../modules/auth/auth';
import { changeField, initialize, writeMessage } from '../../modules/chat/write';
import { searchMessage } from '../../lib/api/chat';
import { Button, InputGroup, Stack } from 'react-bootstrap';
import ChatHeader from '../../common/ChatHeader';
import ChatList from '../../components/chat/ChatList';
import Form from 'react-bootstrap/Form';
import SockJsClient from 'react-stomp';
import ChatFooter from '../../components/chat/ChatFooter';

const ChatContentsContainer = () => {

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
  }, [scrollRef, searchTargetMessage]);

  /**
   * 메세지 입력 후 스크롤
   */
  useEffect(() => {
    if (scrollRef.current.length != 0)
      scrollRef.current[scrollRef.current.length - 1].scrollIntoView({ behavior: 'smooth' });
  }, [messages, scrollRef.current]);


  const onChange = (e) => {
    dispatch(changeField({
      'key': 'message',
      'value': e.target.value,
    }));
  };

  async function onClickSearchButton() {

    console.log('search: ' + searchInputMessage);
    const target = await searchMessage({
      token: user.accessToken,
      channel_id: channelId,
      content: searchInputMessage,
    });
    scrollRef.current[target.data.data.records[0].chat_id].scrollIntoView({ behavior: 'smooth' });
    setSearchInputMessage('');
  };

  const onSubmit = (e) => {
    dispatch(writeMessage({
      content: message,
      token: user.accessToken,
      channel_id: channelId,
    }));
    dispatch(initialize());

    e.preventDefault();
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

  const getInvitables = () => {

    let participantsNames = [];
    participants.forEach((participant) => {
      participantsNames.push(participant.user_name);
    });

    return friends.filter(friend => !(participantsNames.includes(friend.user_name)));
  };

  const getAddableFriends = () => {
    let friendsName = [];

    // friends.forEach((friend) => {
    //   friendsName.push(friend.user_name);
    // });
    //
    // return participants.filter(participant => !(friendsName.includes(participant.user_name)));
  };


  const customHeaders = {
    Authorization: 'Bearer ' + user.accessToken,
  };

  if (!messages) return null;

  return (
    <div className='ChatContentsContainer'
         style={{ width: '100%', height: 'calc(100vh - 3rem);' }}>
      <ChatHeader participants={participants} onChangeSearchMessage={setSearchInputMessage}
                  onClickSearchButton={onClickSearchButton} invitalbe={getInvitables}
                  addableFriends={getAddableFriends} onClickInvite={onClickInvite} />
      <ChatList user_email={user.email} messages={messages} comment={message} onConfirm={onConfirm}
                modal={modal} searchMessage={searchInputMessage} ref={scrollRef} />
      <ChatFooter onSubmit={onSubmit} onChange={onChange} onClickExit={onClickExit} />

      <SockJsClient
        url={`http://14.36.131.85:8080/chat/`}
        headers={customHeaders}
        topics={[`/topic/kafka-chat/${channelId}`]}
        onConnect={console.log('connected!')}
        onDisconnect={console.log('disconnected!')}
        onMessage={(msg) => onMessageReceived(msg)}
        debug={true}
      />
    </div>

  );
};

export default ChatContentsContainer;