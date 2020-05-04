import styled from 'styled-components';
import WithHover from './WithHover';

const Link = WithHover(styled.a`
  color: ${({theme}) => theme.colors.blue};
  text-decoration: none;
  pointer: none;
  z-index: 99;
  cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQYV2P4//8/IwAI/QL/+TZZdwAAAABJRU5ErkJggg=='),
    url(images/blank.cur),
    none;
  &:hover {
    color: ${({theme}) => theme.colors.body};
  }
`, 'block');

const Heading = styled.div`
  font-size: 32px;
  margin-bottom: 24px;
`;

export default () => (
    <div>
        <Heading style={{ fontSize: '14px' }}>Find me on <Link href="https://twitter.com/samuelbernhardt">the tweets.</Link></Heading>
    </div>
)