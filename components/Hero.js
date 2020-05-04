import styled from 'styled-components';

import TextArea from './TextArea';

const Container = styled.div`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 24px;
`;



const Hero = () => {
    return (
        <Container>
            <TextArea style={{ fontSize: '64px' }} defaultValue="Hello" focus/>
            <TextArea defaultValue="Try out hovering over this text and editing it."/>
            <TextArea style={{ fontSize: '14px' }} defaultValue="Event small text works."/>
            {/* <Header style={{ fontSize: '64px' }}>Hi,</Header>
            <Header>I'm Sam, a product designer currently working at KickUp.</Header> */}
        </Container>
    )
}

export default Hero;