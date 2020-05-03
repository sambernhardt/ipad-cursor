import styled from 'styled-components';

import HoverLink from './HoverLink';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-weight: 600;
`;

const Links = styled.div`
    display: flex;
    font-weight: 600;
`;

const Header = () => {
    return (
        <Container>
            <Title>
                Sam Bernhardt
            </Title>
            <Links>
                <HoverLink>Work</HoverLink>
                <HoverLink>About</HoverLink>
                <HoverLink>Contact Me</HoverLink>
            </Links>
        </Container>
    )
}

export default Header;