import { useContext } from 'react';
import styled from 'styled-components';
import WithHover from '../cursor/WithHover';
import Toggle from './components/Toggle';
import ActiveCursor from './ActiveCursor';

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
  ${({ showingCursor }) => !showingCursor && `
    cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQYV2P4//8/IwAI/QL/+TZZdwAAAABJRU5ErkJggg=='),
      url(cursor.png),
      none;
  `}
  &:hover {
    color: ${({theme}) => theme.colors.body};
  }
`, 'block');

const Heading = styled.div`
  font-size: 32px;
`;

export default () => {
  const context = useContext(ActiveCursor);

  return (
    <Container>
        <Toggle/>
        <Heading style={{ fontSize: '14px' }}>Find me on <Link showingCursor={context.showingCursor} href="https://twitter.com/samuelbernhardt">the tweets.</Link></Heading>
    </Container>
  )

}