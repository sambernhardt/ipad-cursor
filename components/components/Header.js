import styled from 'styled-components';

import NavLink from './NavLink';

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
                <NavLink>Button 1</NavLink>
                <NavLink>Button 2</NavLink>
                <NavLink>Button 3</NavLink>
            </Links>
        </Container>
    )
}

export default Header;