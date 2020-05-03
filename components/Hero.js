import styled from 'styled-components';

import WithHover from './WithHover';

const Container = styled.div`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 24px;
`;

const Header = WithHover(styled.div`
  font-size: 32px;
  &::selection {
    border-radius: 2px;
    background: rgba(255, 200, 40, .25);
  }
`, 'text');

const Hero = () => {
    return (
        <Container>
            <Header style={{ fontSize: '64px' }}>Hey, I'm Sam.</Header>
            <br />
            <Header>I'm a product designer currently working at KickUp.</Header>
            <br />
            <Header style={{ fontSize: '14px' }}>And this is some small text.</Header>
        </Container>
    )
}

export default Hero;