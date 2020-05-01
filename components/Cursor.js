import { useContext, useState } from 'react';
import styled from 'styled-components';
import CursorContext from './CursorContext';

const Dot = styled.div`
    position: absolute;
    pointer-events: none;
    /* transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1); */
`;

const Block = styled.div`
    width: 32px;
    height: 32px;
    position: absolute;
    background: #555;
    border-radius: 4px;
    pointer-events: none;
    /* transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1); */
    /* transform: scale(0); */
`;

const getRelativePosition = (pageCoords, element) => {
    return {
        x: pageCoords.x - element.offsetLeft,
        y: pageCoords.y - element.offsetTop
    }
}

const Cursor = () => {
    // const [ transitioning, setTransitioning ] = useState(false);
    const context = useContext(CursorContext);
    const { pos, currentElement, transitionEnter, transitionExit, speed } = context;
    let wiggle = {x: 0, y: 0};

    let blockStyles;
    let dotStyles;
    
    let d = speed;

    if (currentElement && transitionEnter) {
        // Entering
        const amount = 20;
        const relativePos = getRelativePosition(pos, currentElement);
        const xMid = currentElement.clientWidth / 2;
        const yMid = currentElement.clientHeight / 2;
        const xMove = (relativePos.x - xMid) / currentElement.clientWidth * amount;
        const yMove = (relativePos.y - yMid) / currentElement.clientHeight * amount;
        dotStyles = {
            // background: 'orange',
            left: currentElement.offsetLeft + xMid - 12 + "px",
            top: currentElement.offsetTop + yMid - 12 + "px",
            transition: speed + "s",
            opacity: 0
        }
        blockStyles = {
            left: currentElement.offsetLeft + wiggle.x,
            top: currentElement.offsetTop + wiggle.y,
            height: currentElement.offsetHeight + "px",
            width: currentElement.offsetWidth + "px",
            transition: speed + "s"
        }
    } else if (currentElement && !transitionEnter) {
        // Entered
        const amount = 20;
        const relativePos = getRelativePosition(pos, currentElement);
        const xMid = currentElement.clientWidth / 2;
        const yMid = currentElement.clientHeight / 2;
        const xMove = (relativePos.x - xMid) / currentElement.clientWidth * amount;
        const yMove = (relativePos.y - yMid) / currentElement.clientHeight * amount;
        wiggle = {
            x: xMove, 
            y: yMove
        }
        dotStyles = {
            // background: 'red',
            left: currentElement.offsetLeft + xMid - 12 + "px",
            top: currentElement.offsetTop + yMid - 12 + "px",
            transform: 'scale(0)',
            transition: speed + "s"
        }
        blockStyles = {
            left: currentElement.offsetLeft + wiggle.x,
            top: currentElement.offsetTop + wiggle.y,
            height: currentElement.offsetHeight + "px",
            width: currentElement.offsetWidth + "px",
        }
    } else if (transitionExit) {
        // Exiting
        // const amount = 20;
        // const relativePos = getRelativePosition(pos, currentElement);
        // const xMid = currentElement.clientWidth / 2;
        // const yMid = currentElement.clientHeight / 2;
        // const xMove = (relativePos.x - xMid) / currentElement.clientWidth * amount;
        // const yMove = (relativePos.y - yMid) / currentElement.clientHeight * amount;
        // wiggle = {
        //     x: xMove, 
        //     y: yMove
        // }
        dotStyles = {
            // background: 'purple',
            transform: 'scale(1)',
            transition: speed + "s"
        }
        blockStyles = {
            transition: speed + "s",
            transform: 'scale(0)'
        }
    } else if (!transitionExit) {
        // Exited
        dotStyles = {
            // background: 'blue'
        }
        blockStyles = {
            transform: 'scale(0)',
            opacity: 0
        }
    }

    return (
        <div>
            <Block style={{
                left: pos.x - 12,
                top: pos.y - 12,
                ...blockStyles,
            }}>
            </Block>
            <Dot style={{
                left: pos.x - 12,
                top: pos.y - 12,
                ...dotStyles,
            }}>
                <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="16" fill="#555"/>
                    <rect x="120" width="100" height="100" rx="15" />
                </svg>
            </Dot>
        </div>
    )
}

export default Cursor;