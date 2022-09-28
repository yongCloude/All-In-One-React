import React from 'react';
import Responsive from '../../common/Responsive';

import EditorContainer from '../../containers/write/EditorContainer';
import WriteActionButtonsContainer from '../../containers/write/WriteActionButtonsContainer';

const PostWritePage = () => {
    return (
        <Responsive>
            <EditorContainer/>
            <WriteActionButtonsContainer/>
        </Responsive>
    );
};

export default PostWritePage;