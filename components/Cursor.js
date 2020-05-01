import { useContext } from 'react';
import styled from 'styled-components';
import Context from '../components/Context';

const Image = styled.img`
  position: absolute;
`;

const Cursor = () => {
    const context = useContext(Context);
    const { pos } = context;
    return (
        <Image src="/cursor.svg"  style={{ left: pos.x - 12, top: pos.y - 12 }}/>
    )
}

export default Cursor;