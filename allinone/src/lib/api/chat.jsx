import client from './client';


export const readChat = ({token}) => {
    return client.get(
        '/v2/chat',
        {
            headers: {
                Authorization: 'Bearer ' + token
            },
        },
    );
};

export const writeChat = ({token, content}) => {
    console.log('writeChat:',token,content);
    client.post(
        '/v2/chat/publish',
        {content: content},
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    )
}

