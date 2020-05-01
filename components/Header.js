import styled from 'styled-components';

import HoverLink from './HoverLink';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Links = styled.div`
    display: flex;
`;

const Header = () => {
    return (
        <Container>
            <div>
                Sam Bernhardt
            </div>
            <Links>
                <HoverLink>Work</HoverLink>
                <HoverLink>About</HoverLink>
                <HoverLink>Contact Me</HoverLink>
            </Links>
        </Container>
    )
}

export default Header;