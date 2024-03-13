import styled from 'styled-components'

export const ContactContainer = styled.section`
  @media (min-width: 280px) and (max-width: 767px) {
    margin-top: 4rem;
    background-color: ${(props) => props.theme['primary-color-20']};
    padding: 4rem 0;
    text-align: center;
    background-image: url('../../assets/bubble.png');
    background-repeat: no-repeat;
    background-position: 70% 20%;

    h2 {
      font-size: 32px;
      font-weight: 700;
      color: ${(props) => props.theme['primary-shade-1']};
      max-width: 192px;
      margin: 0 auto;
    }

    p {
      font-size: 24px;
      color: ${(props) => props.theme['primary-shade-1']};
      max-width: 192px;
      margin: 3rem auto;
    }

    a {
      margin-top: 3rem;
      padding: 1rem 3rem;
      background-color: ${(props) => props.theme['primary-color']};
      border-radius: 32px;
      font-size: 1rem;
      font-weight: 700;
      color: ${(props) => props.theme['primary-shade-1']};
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      border: none;
      width: 296px;
    }
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    margin-top: 4rem;
    background-color: ${(props) => props.theme['primary-color-20']};
    padding: 6rem;
    text-align: center;
    background-image: url('../../assets/bubble.png');
    background-repeat: no-repeat;
    background-position: 70% 20%;

    h2 {
      font-size: 48px;
      font-weight: 700;
      color: ${(props) => props.theme['primary-shade-1']};
    }

    p {
      font-size: 24px;
      color: ${(props) => props.theme['primary-shade-1']};
      margin-top: 1rem;
    }

    a {
      display: inline-block;
      margin-top: 5rem;
      background-color: ${(props) => props.theme['primary-color']};
      border-radius: 32px;
      padding: 1rem 4rem;
      font-size: 1.5rem;
      font-weight: 700;
      color: ${(props) => props.theme['primary-shade-1']};
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      border: none;
    }
  }

  @media (min-width: 1280px) {
    margin-top: 4rem;
    background-color: ${(props) => props.theme['primary-color-20']};
    padding: 6rem;
    text-align: center;
    background-image: url('../../assets/bubble.png');
    background-repeat: no-repeat;
    background-position: 70% 20%;

    h2 {
      font-size: 48px;
      font-weight: 700;
      color: ${(props) => props.theme['primary-shade-1']};
    }

    p {
      font-size: 24px;
      color: ${(props) => props.theme['primary-shade-1']};
      margin-top: 1rem;
    }

    a {
      display: inline-block;
      margin-top: 5rem;
      background-color: ${(props) => props.theme['primary-color']};
      border-radius: 32px;
      padding: 1rem 4rem;
      font-size: 1.5rem;
      font-weight: 700;
      color: ${(props) => props.theme['primary-shade-1']};
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      border: none;
      cursor: pointer;
    }
  }
`
