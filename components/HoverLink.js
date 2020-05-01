import { useState } from 'react';
import styled from 'styled-components';

const Hover = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 4px;
    left: 0;
    top: 0;
    z-index: -1;
    transition: width .3s, height .3s, background .3s, left .3s, top .3s;
`;

const Container = styled.div`
  padding: 8px 16px;
  margin-bottom: 24px;
  position: relative;
  cursor: none;
`;

const getRelativePosition = (pageCoords, element) => {
    return {
        x: pageCoords.x - element.offsetLeft,
        y: pageCoords.y - element.offsetTop
    }
}

const HoverLink = (props) => {
    const [ hovering, hoveringSet ] = useState(false);
    const [ style, setStyle ] = useState({});

    const handleMouseEnter = e => {
        const { clientX, clientY } = e;
        const innerPosition = getRelativePosition({x: e.pageX, y: e.pageY}, e.target);

        const xMid = e.target.clientWidth / 2;
        const yMid = e.target.clientHeight / 2;
        let side = "0";
        let level = "idk";

        if (innerPosition.x < xMid) {
            side = "0%"
        } else {
            side = "100%"
        }
        if (innerPosition.y < yMid) {
            level = "0%"
        } else {
            level = "100%"
        }

        // console.log(side + "   " + level)

        animateIn(innerPosition);
        hoveringSet(true);
    }

    const handleMouseMove = e => {
        const pos = getRelativePosition({x: e.pageX, y: e.pageY}, e.target);
        const amount = 10;

        const xMid = e.target.clientWidth / 2;
        const yMid = e.target.clientHeight / 2;
        const xMove = (pos.x - xMid) / e.target.clientWidth * amount;
        const yMove = (pos.y - yMid) / e.target.clientHeight * amount;
        // console.dir(xMove + " " + yMove)

        setStyle({
            ...style,
            transform: `translate(${xMove}px, ${yMove}px)`
        })
    }

    const animateIn = pos => {
        setStyle({
            width: '0px',
            height: '0px',
            top: pos.y + 'px',
            left: pos.x + 'px',
            background: 'grey',
        })
        setTimeout(() => {
            setStyle({
                background: 'grey',
            })
        }, 1);
    }

    const handleMouseLeave = e => {
        const { clientX, clientY } = e;
        animateOut(getRelativePosition({x: e.pageX, y: e.pageY}, e.target));
        hoveringSet(false);
    }

    const animateOut = pos => {
        setStyle({
            width: '0px',
            height: '0px',
            top: pos.y + 'px',
            left: pos.x + 'px',
            background: 'grey',
        })
    }

    return (
        <Container
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            {props.children}
            <Hover style={style}/>
        </Container>
    )
}

export default HoverLink;