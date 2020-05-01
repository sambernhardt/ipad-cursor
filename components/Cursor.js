import { useContext, useState } from 'react';
import styled from 'styled-components';
import CursorContext from './CursorContext';

const Dot = styled.div`
    position: absolute;
    transition: transform .2s;
    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1);
`;

const Block = styled.div`
    width: 32px;
    height: 32px;
    position: absolute;
    background: rgba(255,255,255,.3);
    border-radius: 4px;
    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1);

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
    const { pos, currentElement, doneTransitioning } = context;
    let wiggle = {x: 0, y: 0};

    let blockStyles = {
        transform: "scale(0)"
    };
    let dotStyles;
    const d = .3;
    const f = 3;

    // if hovering
    if (currentElement) {
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
            left: currentElement.offsetLeft + xMid - 12 + "px",
            top: currentElement.offsetTop + yMid - 12 + "px",
            transform: "scale(0)",
            transition: 'transform .3s, left .3s, top .3s'
        }
        if (doneTransitioning) {
            console.log("done transitioning")
            blockStyles = {
                left: currentElement.offsetLeft + wiggle.x,
                top: currentElement.offsetTop + wiggle.y,
                height: currentElement.offsetHeight + "px",
                width: currentElement.offsetWidth + "px",
                transition: `transform ${d}s, left ${d}s, top ${d}s, width: ${d}s, height ${d}s`
            }
        } else {
            console.log("not done transitioning")
            blockStyles = {
                left: currentElement.offsetLeft + wiggle.x,
                top: currentElement.offsetTop + wiggle.y,
                height: currentElement.offsetHeight + "px",
                width: currentElement.offsetWidth + "px",
                transitionDuration: '.3s'
                // transition: `transform ${f}s, left ${f}s, top ${f}s, width: ${f}s, height ${f}s`
            }
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