import client from './client';


export const readChat = ({token, channel_id}) => {
    console.log('channel_id: ' + channel_id);
    return client.get(
       `/v2/chat/${channel_id}`,
        {
            headers: {
                Authorization: 'Bearer ' + token
            },
        },
    );
};

export const writeChat = ({token, content, channel_id}) => {
    console.log('writeChat:',token,content);
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

export const createRoom = ({token, roomTitle}) => {
    console.log('createRoom: ' + roomTitle);
    client.post(
        `/v2/chat`,
        {ch_title: roomTitle},
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    )
}

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
