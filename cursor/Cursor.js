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
    border-radius: 12px;
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
        selectedElement,
        status,
        pressing,
        setStatus
    } = useContext(CursorContext);
    
    const cursorRef = useRef();
    let baseStyles = {
        left: pos.x - 12,
        top: pos.y - 12,
        width: '24px',
        height: '24px',
    };

    // when the selectedElement or status changes
    useEffect(() => {
        if (!selectedElement.el) return;
        if (status == "entering" || status == "shifting") {
            // console.log(selectedElement)
            if (selectedElement.type == "block") {
                gsap.to(cursorRef.current, {
                    duration: .5,
                    ease: "elastic.out(1, 1)",
                    left: selectedElement.el.offsetLeft,
                    top: selectedElement.el.offsetTop,
                    height: selectedElement.el.offsetHeight + "px",
                    width: selectedElement.el.offsetWidth + "px",
                    borderRadius: '4px',
                    onComplete: () => {
                        setStatus("entered");
                    }
                });
            }
        } else if (status == "exiting") {
            // kill all current animations for the block and clear the props it has added
            gsap.killTweensOf(cursorRef.current);
        }
    }, [selectedElement, status]);


    useEffect(() => {
        // general exit handling
        if (status == "exiting" && !selectedElement.el) {
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
                borderRadius: '12px',
                onComplete: () => {
                    setStatus("");
                },
            });
        } else if ((status == "entering" || status == "shifting") && selectedElement.type == "text") {
            // text cursor handling
            const { textSize } = selectedElement.config;
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
                }
            });
        }
    }, [pos]);

    if (selectedElement.el) {
        const amount = 5;
        const relativePos = getRelativePosition(pos, selectedElement.el);
        const xMid = selectedElement.el.clientWidth / 2;
        const yMid = selectedElement.el.clientHeight / 2;
        const xMove = (relativePos.x - xMid) / selectedElement.el.clientWidth * amount;
        const yMove = (relativePos.y - yMid) / selectedElement.el.clientHeight * amount;

        if (selectedElement.type == "block") {
            baseStyles = {
                left: selectedElement.el.offsetLeft + xMove,
                top: selectedElement.el.offsetTop + yMove,
                height: selectedElement.el.offsetHeight + "px",
                width: selectedElement.el.offsetWidth + "px",
            }
        }
    }

    let shapeClass = selectedElement.el && !(status == "entering" || status == "shifting") && selectedElement.type;
    return (
        <div>
            {debug && <Debug>
                <span>{JSON.stringify({pos})}</span>
                <span>{JSON.stringify(selectedElement.type)}</span>
                <span>{JSON.stringify({status})}</span>
            </Debug>}
            <Cursor
                ref={cursorRef}
                style={baseStyles}
                className={[shapeClass, pressing && "pressing"]}
            />
        </div>
    )
}

export default CursorContainer;