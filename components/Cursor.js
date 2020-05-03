import { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';

import { gsap } from 'gsap';
import CursorContext from './CursorContext';
import { getRelativePosition } from '../utils';

const debug = false;

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
    background: ${({theme}) => transparentize(.5, theme.colors.body)};
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
    &.block {
        border-radius: 4px;
    }
    &.text {
        height: 30px;
        width: 3px;
        border-radius: 1px;
    }
`;

const CursorContainer = () => {
    const context = useContext(CursorContext);
    const { pos, currentElement, textSize, status, elementType, setStatus } = context;
    
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
    
    // status
    useEffect(() => {


        if (status == "entering" || status == "shifting") {
            if (elementType == "block") {
                setExited(false);
                setDuration(1);
                gsap.killTweensOf(cursorRef.current);
                let snapTo = gsap.to(cursorRef.current, {
                    duration: .5,
                    ease: "elastic.out(1, 1)",
                    left: currentElement.offsetLeft,
                    top: currentElement.offsetTop,
                    height: currentElement.offsetHeight + "px",
                    width: currentElement.offsetWidth + "px",
                    borderRadius: '4px',
                    onComplete: () => {
                        setHovering(true)
                        setShape("block")
                    }
                });
            }
        } else if (status == "exiting") {
            // kill all current animations for the block and clear the props it has added
            gsap.killTweensOf(cursorRef.current);
            // gsap.set(cursorRef.current, {clearProps: 'all'});
            setHovering(false);
            setShape("");
        }
    }, [currentElement, status]);

    useEffect(() => {
        if (status == "exiting" && !hovering && !exited) {
            // console.log("here", duration)
            if (duration !== 0) {
                let snapBackToCursor = gsap.to(cursorRef.current, {
                    duration: duration,
                    ease: "elastic.out(1, .5)",
                    width: '24px',
                    height: '24px',
                    x: 0,
                    y: 0,
                    left: pos.x - 12,
                    top: pos.y - 12,
                    borderRadius: '50%',
                    onComplete: () => {
                        setExited(true)
                        // setStatus("")
                    },
                });
                setDuration(duration - .01);
            } else {
                setExited(true)
            }
        } else if ((status == "entering" || status == "shifting") && elementType == "text" && !hovering) {
            gsap.killTweensOf(cursorRef.current);
            setExited(false);
            gsap.to(cursorRef.current, {
                duration: .5,
                ease: "elastic.out(1, 1)",
                height: textSize,
                width: "3px",
                x: 12,
                y: (textSize / -2) + 10,
                borderRadius: '1px',
                onComplete: () => {
                    setHovering(true)
                    setExited(true)
                    setShape("text")
                }
            });
        // } else if 
        } else if (exited) {
            gsap.killTweensOf(cursorRef.current);
            setExited(true)
            setDuration(.5);
        }
    }, [pos]);

    if (hovering && currentElement) {
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
        } else if (elementType == "text") {
            // gsap.killTweensOf(cursorRef.current);
            // baseStyles = {
            //     height: textSize,
            //     width: "3px",
            //     left: pos.x,
            //     top: pos.y - textSize,
            // }
        }
    }

    return (
        <div>
            {debug && <Debug>
                <span>{JSON.stringify({pos})}</span>
                <span>{JSON.stringify({currentElement: currentElement ? true: false})}</span>
                <span>{JSON.stringify({status})}</span>
                <span>{JSON.stringify({exited})}</span>
               <span> {JSON.stringify({elementType})}</span>
               <span> {JSON.stringify({hovering})}</span>
               <span> {JSON.stringify({textSize})}</span>
            </Debug>}
            <Cursor
                ref={cursorRef}
                style={baseStyles}
                className={shape}
            />
        </div>
    )
}

export default CursorContainer;