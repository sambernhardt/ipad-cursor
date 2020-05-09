import styled from 'styled-components';

import CursorWrapper from '../cursor/CursorWrapper';
import WithHover from '../cursor/WithHover';

const Link = WithHover(styled.div`
    width: 900px;
    height: 900px;
    border-radius: 8px;
    border: 1px solid green;
    font-size: 48px;
    display: inline-block;
`, 'block');

const Main = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px;
  box-sizing: border-box;
`;

export default () => (
    <Main>
        <Link>Test</Link>
    </Main>
)