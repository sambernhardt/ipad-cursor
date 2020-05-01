import styled from 'styled-components';

const Container = styled.div`
  min-height: 30vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Header = styled.h2`
  font-size: 32px;
`;

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