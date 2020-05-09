import { useState, useContext } from 'react';
import CursorContext from './Context';

import { getRelativePosition } from './utils';

export default (Component, type, config) => ({passThroughRef, ...props}) => {
    const context = useContext(CursorContext);
    const { selectedElement, pos } = context;
    const [ hovering, setHovering ] = useState(false);

    const handleMouseEnter = e => {
        if (!context.selectedElementSet) return;
        let result = {
            el: e.currentTarget,
            type,
            config: {...config}
        }
        if (type == "text") {
            let computed = window.getComputedStyle(e.currentTarget).fontSize;
            result.config.textSize = parseFloat(computed.replace("px"));
        }
        context.selectedElementSet(result);
        setHovering(true);
    }
    const handleMouseLeave = ({pageX, pageY, ...e}) => {
        if (!context.removeSelectedElement) return;
        context.removeSelectedElement()
        setHovering(false);
    }

    let styles;
    if (hovering && selectedElement.el && selectedElement.type == "block") {
        const amount = selectedElement.config.hoverOffset ? selectedElement.config.hoverOffset : 2;
        const relativePos = getRelativePosition(pos, selectedElement.el);
        const xMid = selectedElement.el.offsetWidth / 2;
        const yMid = selectedElement.el.offsetHeight / 2;
        const xMove = (relativePos.x - xMid) / selectedElement.el.offsetWidth * amount;
        const yMove = (relativePos.y - yMid) / selectedElement.el.offsetHeight * amount;
        
        styles = {
            transform: `translate(${xMove}px, ${yMove}px)`,
        }
    }

    return <Component
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={styles}
        ref={passThroughRef}
        {...props}
    />
}