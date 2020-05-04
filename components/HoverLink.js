import { useState, useContext } from 'react';
import styled from 'styled-components';

import WithHover from './WithHover';
import CursorContext from './CursorContext';

const Container = styled.div`
    padding: 8px 16px;
    position: relative;
    &:hover {
        transform: scale(1.1);
    }
`;

const HoverLink = (props) => {    
    return (
        <Container {...props} />
    )
}

export default WithHover(HoverLink, 'block');