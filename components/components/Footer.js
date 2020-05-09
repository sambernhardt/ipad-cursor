import styled from 'styled-components';
import WithHover from '../../cursor/WithHover';
import Toggle from './Toggle';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Link = WithHover(styled.a`
  color: ${({theme}) => theme.colors.blue};
  text-decoration: none;
  z-index: 99;
  padding: 8px 2px;
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
        <Heading style={{ fontSize: '14px' }}>
          Find me on <Link href="https://twitter.com/samuelbernhardt">the tweets</Link> or check out <Link href="https://github.com/sambernhardt/ipad-cursor">the code</Link>.
        </Heading>
    </Container>
  )

}