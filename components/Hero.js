import styled from 'styled-components';

import WithHover from './WithHover';

const Container = styled.div`
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Header = WithHover(styled.h2`
  font-size: 32px;
  &::selection {
    border-radius: 2px;
    background: yellow;
    /* color: red; */
  }
`, 'text');

const Hero = () => {
    return (
        <Container>
            <Header>
                I'm a product designer currently working at KickUp.
            </Header>
        </Container>
    )
}

export default Hero;