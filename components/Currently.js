import { useContext } from 'react';
import styled from 'styled-components';

import { Subheader } from './Text';
import CursorContext from './CursorContext';

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
        console.log("Hey")
        context.setCurrentElement(e.target)
    }
    const handleMouseLeave = e => {
        context.removeCurrentElement()
    }

    return (
        <div>
            <Subheader>Currently</Subheader>
            <Container
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => alert("Hey")}
            >  
              Test
            </Container>
        </div>
    )
}

export default Hero;