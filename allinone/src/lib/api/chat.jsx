import client from './client';


/** 채팅 내역 불러오기 **/
export const loadMessage = ({token, channel_id}) => {
    return client.get(
       `/v2/chat/${channel_id}`,
        {
            headers: {
                Authorization: 'Bearer ' + token
            },
        },
    );
};

/** 채팅 보내기 **/
export const writeMessage = ({token, content, channel_id}) => {
    client.post(
        `/v2/chat/${channel_id}`,
        {content: content},
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    )
}

/** 채팅방 만들기 **/
export const createRoom = ({token, title}) => {
    client.post(
        `/v2/chat`,
        {ch_title: title},
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    )
}

/** 채팅방 리스트 불러오기 **/
export const getRooms = ({title}) => {
    return client.get(
        `v2/chat`,
        {
            params: {
                title: title,
            }
        }
    )
}

/** 내가 만든 채팅방 불러오기 **/
export const getMyRooms = ({token}) => {
    return client.get(
        `v2/chat/my`,
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    )
}

/** 채팅방 나가기 **/
export const exitRoom = ({token, channel_id}) => {
    client.delete(
        `v2/chat/${channel_id}`,
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    )
}

/** 채팅방 유저 리스트 불러오기 **/
export const getRoomParticipants = ({token, channel_id}) => {
  console.log('api: ' + channel_id);
  return client.get(
    `v2/chat/${channel_id}/users`,
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )
}

/** 초대하기 **/
export const invite = ({token, channel_id, user_email, user_name}) => {
  console.log(token);
  client.post(
    `/v2/chat/${channel_id}/invite`,
    { user_email, user_name },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
}
