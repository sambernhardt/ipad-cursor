import { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import CursorContext from './CursorContext';
import { getRelativePosition } from '../utils';


const Dot = styled.div`
    position: absolute;
    pointer-events: none;
    transform-origin: 50% 50%;
`;

const Debug = styled.div`
    background: green;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: flex-start;
    padding: 8px 16px;
    > * {
        min-width: 200px;
    }
`;

const Block = styled.div`
    width: 24px;
    height: 24px;
    position: absolute;
    background: #555;
    border-radius: 50%;
    pointer-events: none;
    &.block {
        border-radius: 4px;
    }
    &.text {
        height: 30px;
        width: 3px;
        border-radius: 1px;
    }
`;

const Cursor = () => {
    const context = useContext(CursorContext);
    const { pos, currentElement, status, elementType } = context;
    
    const [ hovering, setHovering ] = useState(false);
    const [ exited, setExited ] = useState(false);
    const [ tweens, setTweens ] = useState([]);
    const [ shape, setShape ] = useState("");
    const blockRef = useRef();
    let blockStyles = {
        left: pos.x - 12,
        top: pos.y - 12,
        width: '24px',
        height: '24px',
    };
    
    // status
    useEffect(() => {

        if (status == "entering" || status == "shifting") {
            if (elementType == "block") {
                gsap.killTweensOf(blockRef.current);
                // gsap.set(blockRef.current, {clearProps: 'all'});
                let snapTo = gsap.to(blockRef.current, {
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
                setTweens([snapTo]);
            } else {
                gsap.to(blockRef.current, {
                    duration: .5,
                    ease: "elastic.out(1, 1)",
                    height: "30px",
                    width: "3px",
                    left: pos.x,
                    borderRadius: '1px',
                    onComplete: () => setShape("text")
                });
            }
            // setExited(false)
        } else if (status == "exiting") {
            // kill all current animations for the block and clear the props it has added
            gsap.killTweensOf(blockRef.current);
            // gsap.set(blockRef.current, {clearProps: 'all'});
            setHovering(false);
            setShape("");
        }
    }, [currentElement, status]);

    useEffect(() => {
        if (status == "exiting" && !exited) {
            let snapBackToCursor = gsap.to(blockRef.current, {
                duration: .5,
                ease: "elastic.out(1, 1)",
                width: '24px',
                height: '24px',
                left: pos.x - 12,
                top: pos.y - 12,
                borderRadius: '50%',
                onComplete: () => {
                    console.log("done")
                },

            });
            
            // setHovering(false);
        //     // snapBackToCursor.restart();
        }
    }, [pos]);

    if (hovering && currentElement) {
        const amount = 10;
        const relativePos = getRelativePosition(pos, currentElement);
        const xMid = currentElement.clientWidth / 2;
        const yMid = currentElement.clientHeight / 2;
        const xMove = (relativePos.x - xMid) / currentElement.clientWidth * amount;
        const yMove = (relativePos.y - yMid) / currentElement.clientHeight * amount;

        if (elementType == "block") {
            blockStyles = {
                left: currentElement.offsetLeft + xMove,
                top: currentElement.offsetTop + yMove,
                height: currentElement.offsetHeight + "px",
                width: currentElement.offsetWidth + "px",
            }
        }
    } else {
        
    }

    return (
        <div>
            <Debug>
                <span>{JSON.stringify({pos})}</span>
                <span>{JSON.stringify({currentElement: currentElement ? true: false})}</span>
                <span>{JSON.stringify({status})}</span>
               <span> {JSON.stringify({elementType})}</span>
               <span> {JSON.stringify({hovering})}</span>
            </Debug>
            <Block
                ref={blockRef}
                style={blockStyles}
                className={shape}
            />
        </div>
    )
}

export default Cursor;