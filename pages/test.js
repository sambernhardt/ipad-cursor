import styled from 'styled-components';

import CursorWrapper from '../cursor/CursorWrapper';
import WithHover from '../cursor/WithHover';

const Link = WithHover(styled.a`
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
    <CursorWrapper>
        <Main>
            <Link>Test</Link>
        </Main>
    </CursorWrapper>
)