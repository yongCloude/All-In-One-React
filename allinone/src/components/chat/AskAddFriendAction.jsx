import React, { useState } from 'react';

const AskAddFriendAction = () => {
  const [modal, setModal] = useState(false);

  const onCancel = () => {
    setModal(false);
  };

  const onClick = () => {
    setModal(true);
  };

  return (
    <div className='AskAddFriendAction'>

    </div>
  );
};

export default AskAddFriendAction;