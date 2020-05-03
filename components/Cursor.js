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

const Block = styled.div`
    width: 24px;
    height: 24px;
    position: absolute;
    background: #555;
    border-radius: 50%;
    /* pointer-events: none; */
    &.block {
        border-radius: 4px;
    }
`;

const Cursor = () => {
    const context = useContext(CursorContext);
    const { pos, currentElement, status, speed, elementType } = context;
    
    const [ hovering, setHovering ] = useState(false);
    const [ exited, setExited ] = useState(false);
    const [ shape, setShape ] = useState("");
    const blockRef = useRef();
    let blockStyles;
    
    // status
    useEffect(() => {

        if (status == "entering" || status == "shifting") {
            if (elementType == "block") {
                // gsap.killTweensOf(blockRef.current);
                gsap.to(blockRef.current, {
                    duration: 1,
                    ease: "elastic.out(1, 1)",
                    left: currentElement.offsetLeft,
                    top: currentElement.offsetTop,
                    height: currentElement.offsetHeight + "px",
                    width: currentElement.offsetWidth + "px",
                    // borderRadius: '4px',
                    // clearProps: "borderRadius",
                    onComplete: () => {
                        // setHovering(true)
                        setShape("block")
                    }
                });
            }

            //else {
            //     gsap.to(block, {
            //         duration: .5,
            //         ease: "elastic.out(1, 1)",
            //         height: "30px",
            //         width: "3px",
            //         // left: pos.x,
            //         // top: pos.y - 12,
            //         borderRadius: '1px',
            //     });
            // }
            // setExited(false)
        } else if (status == "exiting") {
            // console.log("Here")
            // let snapBackToCursor = gsap.to(blockRef.current, {
            //     duration: .5,
            //     ease: "elastic.out(1, 1)",
            //     width: '24px',
            //     height: '24px',
            //     left: pos.x - 12,
            //     top: pos.y - 12,
            //     borderRadius: '50%',
            //     onComplete: () => handleArrivedAtCursor(tweens.length + 1),
            //     // paused: true,
            // });
        }
    }, [currentElement, status]);

    const handleArrivedAtCursor = () => {
        if (!gsap.isTweening(blockRef.current)) {
            setExited(true)
            setShape("");
        }
    }

    useEffect(() => {
        if (status == "exiting" && !exited) {
            // console.log("exited")
        //     let snapBackToCursor = gsap.to(blockRef.current, {
        //         duration: 5,
        //         ease: "elastic.out(1, 1)",
        //         width: '24px',
        //         height: '24px',
        //         left: pos.x - 12,
        //         top: pos.y - 12,
        //         borderRadius: '50%',
        //         onComplete: () => handleArrivedAtCursor(tweens.length + 1),
        //         // paused: true,
        //     });
            
        //     setHovering(false);
        //     // snapBackToCursor.restart();
        }
    }, [status, pos]);

    // if (elementType == "block" && currentElement) {
    // //     // console.log("hovering: " + currentElement)
    // //     const amount = 10;
    // //     const relativePos = getRelativePosition(pos, currentElement);
    // //     const xMid = currentElement.clientWidth / 2;
    // //     const yMid = currentElement.clientHeight / 2;
    // //     const xMove = (relativePos.x - xMid) / currentElement.clientWidth * amount;
    // //     const yMove = (relativePos.y - yMid) / currentElement.clientHeight * amount;
    // //     wiggle = {
    // //         x: xMove, 
    // //         y: yMove
    // //     }

    // //     blockStyles = {
    // //         left: currentElement.offsetLeft + wiggle.x,
    // //         top: currentElement.offsetTop + wiggle.y,
    // //         height: currentElement.offsetHeight + "px",
    // //         width: currentElement.offsetWidth + "px"
    // //     }
    // //     dotStyles = {
    // //         // opacity: 0
    // //     }
    // // } else if (elementType == "text") {
    // //     blockStyles = {
    // //         left: pos.x,
    // //         top: pos.y - 12,
    // //     }
    // } else {
    //     blockStyles = {
    //         left: pos.x - 12,
    //         top: pos.y - 12,
    //     }
    // }

    if (!currentElement) {
        blockStyles = {
            left: pos.x - 12,
            top: pos.y - 12,
        }    
    }

    return (
        <div>
            <Block ref={blockRef} style={blockStyles} className={shape} />
        </div>
    )
}

export default Cursor;