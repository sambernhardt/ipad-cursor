import { useState, useContext } from 'react';
import styled from 'styled-components';

import CursorContext from './CursorContext';

const Container = styled.div`
    padding: 8px 16px;
    margin-bottom: 24px;
    position: relative;
    cursor: none;
    &:hover {
    }
    &:active {
        color: red;
    }
`;

const HoverLink = (props) => {
    const [ hovering, hoveringSet ] = useState(false);
    const [ style, setStyle ] = useState({});
    const context = useContext(CursorContext);

    const handleMouseEnter = e => {
        context.setCurrentElement(e.target)
    }
    const handleMouseLeave = e => {
        context.removeCurrentElement()
    }
    return (
        <Container
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {props.children}
        </Container>
    )
}

export default HoverLink;