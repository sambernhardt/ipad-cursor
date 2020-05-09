import { useState, useContext } from 'react';
import styled from 'styled-components';

import WithHover from './Cursor/WithHover';
import CursorContext from './Cursor/CursorContext';

const Container = styled.div`
    padding: 8px 16px;
    position: relative;
`;

const HoverLink = (props) => {    
    return (
        <Container {...props} />
    )
}

export default WithHover(HoverLink, 'block');