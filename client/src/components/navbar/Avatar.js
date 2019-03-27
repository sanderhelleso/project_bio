import React from 'react';
import styled from 'styled-components';

const Avatar = props => (
    <StyledAvatar 
        src={`http://localhost:5000/${props.source || 'images/avatars/default.jpg'}`}
        alt="avatar"
    />
);

export default Avatar;

const StyledAvatar = styled.img`
    float: left;
    max-width: 25%;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: 0.5px solid #eeeeee;
`;
