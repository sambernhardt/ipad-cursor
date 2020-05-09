import { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';

import { gsap } from 'gsap';
import CursorContext from './Context';
import { getRelativePosition } from './utils';

const Debug = styled.div`
    background: green;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 8px 16px;
    > * {
        min-width: 200px;
    }
`;

const Cursor = styled.div`
    width: 24px;
    height: 24px;
    position: absolute;
    background: ${({theme}) => transparentize(.5, theme.colors.cursor)};
    border-radius: 50%;
    z-index: -1;

    transition: opacity .3s;
    &.block {
        border-radius: 4px;
    }
    &.text {
        height: 30px;
        width: 3px;
        border-radius: 1px;
    }
    &.pressing {
        opacity: .5;
        transition: opacity 0s;
    }
`;

const CursorContainer = ({ debug }) => {
    const {
        pos,
        currentElement,
        textSize,
        status,
        elementType,
        pressing,
        setStatus
    } = useContext(CursorContext);
    
    const [ hovering, setHovering ] = useState(false);
    const [ duration, setDuration ] = useState(.5);
    const [ exited, setExited ] = useState(false);
    const [ shape, setShape ] = useState("");
    const cursorRef = useRef();
    let baseStyles = {
        left: pos.x - 12,
        top: pos.y - 12,
        width: '24px',
        height: '24px',
    };

    // when the currentElement or status changes
    useEffect(() => {
        if (status == "entering" || status == "shifting") {
            if (elementType == "block") {
                // gsap.killTweensOf(cursorRef.current);
                gsap.to(cursorRef.current, {
                    duration: .5,
                    ease: "elastic.out(1, 1)",
                    left: currentElement.offsetLeft,
                    top: currentElement.offsetTop,
                    height: currentElement.offsetHeight + "px",
                    width: currentElement.offsetWidth + "px",
                    borderRadius: '4px',
                    onComplete: () => {
                        setStatus("entered");
                        setShape("block")
                    }
                });
            }
        } else if (status == "exiting") {
            // kill all current animations for the block and clear the props it has added
            // gsap.killTweensOf(cursorRef.current);
            setShape("");
        }
    }, [currentElement, status]);

    useEffect(() => {
        // general exit handling
        if (!(status == "entering" || status == "shifting")) {
        }
        
        if (status == "exiting" && !currentElement) {
            gsap.killTweensOf(cursorRef.current);
            gsap.to(cursorRef.current, {
                duration: .5,
                ease: "elastic.out(1, .5)",
                width: '24px',
                height: '24px',
                x: 0,
                y: 0,
                left: pos.x - 12,
                top: pos.y - 12,
                borderRadius: '50%',
                onComplete: () => {
                    setStatus("");
                },
            });
        } else if ((status == "entering" || status == "shifting") && elementType == "text") {
            // text cursor handling
            gsap.killTweensOf(cursorRef.current);
            gsap.to(cursorRef.current, {
                duration: .5,
                ease: "elastic.out(1, 1)",
                height: textSize,
                width: "3px",
                x: 12,
                y: (textSize / -2) + 10,
                borderRadius: '1px',
                onComplete: () => {
                    setStatus("entered");
                    setShape("text")
                }
            });
        }
        if (status == "entered" && currentElement) {
            const amount = 5;
            const relativePos = getRelativePosition(pos, currentElement);
            const xMid = currentElement.clientWidth / 2;
            const yMid = currentElement.clientHeight / 2;
            const xMove = (relativePos.x - xMid) / currentElement.clientWidth * amount;
            const yMove = (relativePos.y - yMid) / currentElement.clientHeight * amount;
    
            if (elementType == "block") {
                baseStyles = {
                    left: currentElement.offsetLeft + xMove,
                    top: currentElement.offsetTop + yMove,
                    height: currentElement.offsetHeight + "px",
                    width: currentElement.offsetWidth + "px",
                }
            }
        }
    }, [pos]);


    
    return (
        <div>
            {debug && <Debug>
                {/* <span>{JSON.stringify({pos})}</span> */}
                <span>{JSON.stringify({currentElement: currentElement ? true: false})}</span>
                <span>{JSON.stringify({status})}</span>
                <span> {JSON.stringify({elementType})}</span>
                <span> {JSON.stringify({textSize})}</span>
                <span> {JSON.stringify({duration})}</span>
            </Debug>}
            <Cursor
                ref={cursorRef}
                style={baseStyles}
                className={[elementType, pressing && "pressing"]}
            />
        </div>
    )
}

export default CursorContainer;