import { useContext } from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import WithHover from '../../cursor/WithHover';
import CursorContext from '../../cursor/Context';

const height = 20;

const Container = WithHover(styled.div`
  display: inline-flex;
  padding: 4px;
  position: relative;
  align-items: center;
  
  span {
    font-size: 13px;
    font-weight: 600;
  }
`, 'block');

const Dot = styled.div`
  background: white;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
  height: ${height - 4}px;
  width: ${height - 4}px;
  border-radius: ${(height - 4) / 2}px;
  position: absolute;
  left: 2px;
  top: 2px;
  transition: left .3s cubic-bezier(0.075, 0.82, 0.165, 1);
`;

const ToggleContainer = styled.div`
  position: relative;
  height: ${height}px;
  width: ${height * 2}px;
  border-radius: ${height / 2}px;
  background: ${({theme}) => transparentize(.7, theme.colors.body)};
  margin-right: 16px;
  overflow: hidden;
  ${({showingCursor, theme}) => showingCursor && `
    background: ${theme.colors.green};
    ${Dot} {
      left: ${height + 2}px;
    }
  `}
`;

export default ({}) => {
  const {toggleCursor, showingCursor} = useContext(CursorContext);

  const handleClick = () => {
    toggleCursor();
  }

  return (
    <Container onClick={handleClick}>
      <ToggleContainer showingCursor={showingCursor}>
        <Dot />
      </ToggleContainer>
      <span>Show cursor</span>
    </Container>
  )
};