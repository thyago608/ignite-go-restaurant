import styled, { css } from 'styled-components';

interface InputProps {
    isFocused: boolean;
    isFilled: boolean;
}

const focused = css`
    color: #ff9000;
    border-color: #ff9000;
`;

const filled = css`
    color: #ff9000;
`;

export const Container = styled.div<InputProps>`
  display: flex;
  align-items: center;

  background: #fff;
  border-radius: 8px;
  padding: 18px 24px;
  width: 100%;
  font-size: 16px;

  & + div {
    margin-top: 24px;
  }

  h1 {
    margin-bottom: 40px;
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #b7b7cc;

    &::placeholder {
      color: #b7b7cc;
    }
  }

  svg {
    margin-right: 16px;
  }


  ${props =>
        props.isFocused && focused};

   ${props =>
        props.isFilled && filled};
   
`;