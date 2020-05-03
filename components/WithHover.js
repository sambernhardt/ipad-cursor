import { useContext } from 'react';
import CursorContext from './CursorContext';

export default (Component, type) => (props) => {
    const context = useContext(CursorContext);
    const handleMouseEnter = e => {
        context.setCurrentElement(e.target, type)
    }
    const handleMouseLeave = ({pageX, pageY, ...e}) => {
        context.removeCurrentElement()
    }
    return <Component hoc="yep" {...props} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
}