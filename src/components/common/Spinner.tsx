import styled from 'styled-components';

interface Props {
  height?: string;
};

const Spinner = ({ height }: Props) => {
  return (
    <S.Container $height={height}>
      <S.Spinner />
    </S.Container>
  );
};

export default Spinner;

const S = {
  Container: styled.div<{ $height?: string }>`
    width: 100%;
    height: ${({ $height }) => $height || ""};
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Spinner: styled.div`
    width: 30px;
    height: 30px;
    border: 4px solid transparent;
    border-top-color: ${({ theme }) => theme.colors.basic};
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `,
};
