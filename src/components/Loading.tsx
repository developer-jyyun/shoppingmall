import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";
export default function Loading() {
  return (
    <LoadingSpinner>
      <p>Loading...</p>
      <TailSpin color="#646cff" radius={"8px"} />
    </LoadingSpinner>
  );
}

const LoadingSpinner = styled.div`
  color: #646cff;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
