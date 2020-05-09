import styled from 'styled-components';

import HoverLink from './HoverLink';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
            <Title>iPad Cursor</Title>
            <Links>
                <HoverLink>Button 1</HoverLink>
                <HoverLink>Button 2</HoverLink>
                <HoverLink>Button 3</HoverLink>
            </Links>
        </Container>
    )
}

export default Header;