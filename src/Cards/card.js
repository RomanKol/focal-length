import styled from 'react-emotion';

const Card = styled.section`
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(140, 140, 140, 0.5), 0 0 1px rgba(0, 0, 0, .14);
  border-radius: 2px;
  margin-bottom: 1rem;
  overflow: hidden;
  header {
    > :first-child {
      margin-top: 0 ;
    }
  }
  > *:last-child {
    margin-bottom: 0;
  }
  section {
    display: flex;
    flex-direction: column;
    ~ section {
      margin-top: 1rem;
    }
  }
`;

export default Card;
