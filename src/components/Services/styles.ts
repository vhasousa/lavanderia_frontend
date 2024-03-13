import styled from 'styled-components'

export const ServicesContainer = styled.section`
  @media (min-width: 280px) and (max-width: 767px) {
    .services {
      display: grid;
      grid-template-columns: 50% 50%;
      background-color: ${(props) => props.theme.white};
      max-width: 296px;
      margin: 3rem auto;
      border-radius: 24px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      padding: 64px 0;
      row-gap: 64px;
    }

    .services__card {
      justify-self: center;
    }

    .services__card div {
      background-color: ${(props) => props.theme['primary-shade-3']};
      width: 96px;
      height: 96px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    .services__card img {
      width: 64px;
    }

    .services__card:nth-child(4) img {
      height: 64px;
      width: 24px;
    }

    .services__card p {
      font-size: 1rem;
      color: ${(props) => props.theme['primary-shade-1']};
      font-weight: 700;
      margin-top: 0.5rem;
      text-align: center;
    }

    .services__button {
      margin-top: 3rem;
      padding: 1rem 3rem;
      background-color: ${(props) => props.theme['secondary-color']};
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
    .services {
      display: grid;
      grid-template-columns: 33% 33% 33%;
      background-color: ${(props) => props.theme.white};
      margin: 4rem 40px;
      border-radius: 24px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      padding: 64px 0;
      row-gap: 64px;
    }

    .services__card {
      justify-self: center;
    }

    .services__card div {
      background-color: ${(props) => props.theme['primary-shade-3']};
      width: 172px;
      height: 172px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    .services__card p {
      font-size: 32px;
      color: ${(props) => props.theme['primary-shade-1']};
      font-weight: 700;
      margin-top: 0.5rem;
    }

    .services__button {
      background-color: ${(props) => props.theme['secondary-color']};
      border-radius: 32px;
      padding: 1rem 4rem;
      max-width: 512px;
      margin: 0 auto;
      font-size: 2rem;
      font-weight: 700;
      color: ${(props) => props.theme['primary-shade-1']};
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      border: none;
    }
  }

  @media (min-width: 1280px) {
    .services {
      display: grid;
      grid-template-columns: 33% 33% 33%;
      background-color: ${(props) => props.theme.white};
      max-width: 1200px;
      margin: 4rem auto;
      border-radius: 24px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      padding: 64px 0;
      row-gap: 64px;
    }

    .services__card {
      justify-self: center;
    }

    .services__card div {
      background-color: ${(props) => props.theme['primary-shade-3']};
      width: 172px;
      height: 172px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    .services__card p {
      font-size: 32px;
      color: ${(props) => props.theme['primary-shade-1']};
      font-weight: 700;
      margin-top: 0.5rem;
    }

    .services__button {
      background-color: ${(props) => props.theme['secondary-color']};
      border-radius: 32px;
      padding: 1rem 4rem;
      max-width: 512px;
      margin: 0 auto;
      font-size: 2rem;
      font-weight: 700;
      color: ${(props) => props.theme['primary-shade-1']};
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      border: none;
      cursor: pointer;
    }
  }
`
