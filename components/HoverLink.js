import { useState, useContext } from 'react';
import styled from 'styled-components';

import { getRelativePosition } from '../utils';
import CursorContext from './CursorContext';

const Container = styled.div`
    /* background: rgba(255,0,0,.4); */
    padding: 8px 16px;
    margin-bottom: 24px;
    position: relative;
    cursor: none;
    transition-duration: .2s;
    &:hover {
        transform: scale(1.1);
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
    const handleMouseLeave = ({pageX, pageY, ...e}) => {
        context.removeCurrentElement()
        const innerPosition = getRelativePosition({x: pageX, y: pageY}, e.target);

        const xMid = e.target.clientWidth / 2;
        const yMid = e.target.clientHeight / 2;
        let origin = [];
        
        if (innerPosition.x < xMid) {
            origin[0] = "0%"
        } else {
          origin[0] = "100%"
        }
        if (innerPosition.y < yMid) {
            origin[1] = "0%"
        } else {
            origin[1] = "100%"
        }
        context.setExitOrigin(origin.join(" "))
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