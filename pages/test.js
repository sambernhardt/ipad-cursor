import styled from 'styled-components';

import WithHover from '../cursor/WithHover';

const Link = WithHover(styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 350px;
    height: 350px;
    border-radius: 8px;
    font-size: 24px;
    transition-duration: .2s;
    &:hover {
        transition-duration: 0s;
    }

`, 'block', {
    hoverOffset: 20
});

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