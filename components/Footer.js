import styled from 'styled-components';

import Toggle from './components/Toggle';
import WithHover from '../cursor/WithHover';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Link = WithHover(styled.a`
  color: ${({theme}) => theme.colors.blue};
  text-decoration: none;
  z-index: 99;
  display: inline-block;
  &:hover {
    color: ${({theme}) => theme.colors.body};
  }
`, 'block');

const Heading = styled.div`
  font-size: 32px;
`;

export default () => {

  return (
    <Container>
        <Toggle/>
        <Heading style={{ fontSize: '14px' }}>Find me on <Link href="https://twitter.com/samuelbernhardt">the tweets.</Link></Heading>
    </Container>
  )

}