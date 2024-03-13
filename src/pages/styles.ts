import styled from 'styled-components'

export const HomeContainer = styled.main`
  section:not(:first-child) {
    margin-top: 6rem;
    text-align: center;

    .title {
      font-size: 1.5rem;
      font-weight: 500;
      color: ${(props) => props.theme['black-80']};
      position: relative;
      display: inline-block;
      z-index: -1;
    }

    .title::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 100%;
      margin: 10px auto;
      width: 50%;
      height: 2px;
      background: ${(props) => props.theme['primary-color-50']};
    }
  }
`
