import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    margin-bottom: 48px;
`;

const Image = styled.div`
    height: 50vh;
    width: 100%;
    background-position: center;
    background-size: cover;
    border-radius: 8px;
    overflow: hidden;
`;

const Caption = styled.div`
    font-size: 16px;
    margin-top: 24px;
`;

const ImageBlock = ({index}) => {
    return (
        <Container>
            <Image style={{ backgroundImage: `url('https://source.unsplash.com/random/800x60${index}')` }} />
            <Caption>Caption</Caption>
        </Container>
    )
}

export default ImageBlock;