import { useContext } from 'react';
import styled from 'styled-components';

import { Subheader } from './Text';
import CursorContext from './CursorContext';
import { getRelativePosition } from '../utils';

const Container = styled.div`
  background: ${({ theme }) => theme.colors.foreground};
  border-radius: 8px;
  min-height: 30vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  /* box-shadow: 0 0 20px rgba(0,0,0,.05); */
`;

const Header = styled.h2`
  font-size: 32px;
`;

const Hero = () => {
    const context = useContext(CursorContext);
    const handleMouseEnter = e => {
        context.setCurrentElement(e.target)
    }
    const handleMouseLeave = ({pageX, pageY, ...e}) => {
        context.removeCurrentElement()
        const innerPosition = getRelativePosition({x: pageX, y: pageY}, e.target);

        const xMid = e.target.clientWidth / 2;
        const yMid = e.target.clientHeight / 2;
        let origin = [];
        
        if (innerPosition.x < xMid) {
            origin[0] = "0%"
        } else {
          origin[0] = "100%"
        }
        if (innerPosition.y < yMid) {
            origin[1] = "0%"
        } else {
            origin[1] = "100%"
        }
        context.setExitOrigin(origin.join(" "))
    }

    return (
        <div>
            <Subheader>Currently</Subheader>
            <Container
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >  
              Test
            </Container>
        </div>
    )
}

export default Hero;