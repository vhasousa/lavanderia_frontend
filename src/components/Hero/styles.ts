import styled from 'styled-components'

export const HeroContainer = styled.section`
  @media (min-width: 280px) and (max-width: 767px) {
    position: relative;
    background-color: ${(props) => props.theme['primary-color']};
    text-align: center;

    .hero {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 5.5rem 0 2rem 0;
    }

    .hero__title {
      font-weight: 700;
      font-size: 30px;
      color: ${(props) => props.theme['primary-shade-1']};
    }

    .hero__title--secondary {
      font-weight: 500;
      font-size: 32px;
      max-width: 194px;
      margin: 0 auto;
      margin-top: 1.5rem;
    }

    .hero__title--secondary span {
      color: ${(props) => props.theme['secondary-color']};
    }

    .hero__text {
      display: none;
    }

    .hero__button {
      background-color: ${(props) => props.theme['secondary-color']};
      color: ${(props) => props.theme['primary-shade-3']};
      font-weight: 700;
      font-size: 32px;
      text-decoration: none;
      padding: 8px;
      border-radius: 1rem;
      display: inline-block;
      margin-top: 1.5rem;
    }

    .hero__button a {
      color: ${(props) => props.theme['primary-shade-3']};
      font-weight: 700;
      font-size: 24px;
      text-decoration: none;
      padding: 8px;
      border-radius: 1rem;
      display: inline-block;
    }

    .hero__image {
      display: none;
    }
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    background-color: ${(props) => props.theme['primary-color']};
    padding: 2rem 2rem 2rem 2rem;
    position: relative;
    top: 8vh;

    .hero {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .hero__title {
      font-weight: 700;
      font-size: 48px;
      color: ${(props) => props.theme['primary-shade-1']};
    }

    .hero__title--secondary {
      font-weight: 500;
      font-size: 48px;
      margin-top: 2rem;
    }

    .hero__title--secondary span {
      color: ${(props) => props.theme['secondary-color']};
    }

    .hero__text {
      display: none;
    }

    .hero__button {
      background-color: ${(props) => props.theme['secondary-color']};
      color: ${(props) => props.theme['primary-shade-3']};
      font-weight: 700;
      font-size: 32px;
      text-decoration: none;
      padding: 8px;
      border-radius: 1rem;
      display: inline-block;
      margin-top: 3rem;
    }

    .hero__button a {
      color: ${(props) => props.theme['primary-shade-3']};
      font-weight: 700;
      font-size: 32px;
      text-decoration: none;
      padding: 8px;
      border-radius: 1rem;
      display: inline-block;
    }

    .hero__image {
      width: 256px;
    }
  }

  @media (min-width: 1280px) {
    background-color: ${(props) => props.theme['primary-color']};
    position: relative;
    top: 8vh;

    .hero {
      display: grid;
      grid-template-columns: 50% 50%;
      grid-template-areas: 'a b';
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 0 3rem 0;
      background-color: ${(props) => props.theme['primary-color']};
    }

    .hero div {
      align-self: center;
    }

    .hero img {
      align-self: center;
    }

    .hero__title {
      font-weight: 700;
      font-size: 56px;
      color: ${(props) => props.theme['primary-shade-1']};
    }

    .hero__title--secondary {
      font-weight: 500;
      font-size: 48px;
    }

    .hero__title--secondary span {
      color: ${(props) => props.theme['secondary-color']};
    }

    .hero__text {
      font-weight: 400;
      font-size: 32px;
      color: ${(props) => props.theme['primary-shade-1']};
      margin-top: 2rem;
      line-height: 2rem;
    }

    .hero__button {
      background-color: ${(props) => props.theme['secondary-color']};
      color: ${(props) => props.theme['primary-shade-3']};
      font-weight: 700;
      font-size: 32px;
      text-decoration: none;
      padding: 8px;
      border-radius: 1rem;
      display: inline-block;
      margin-top: 3rem;
    }

    .hero__button a {
      color: ${(props) => props.theme['primary-shade-3']};
      font-weight: 700;
      font-size: 32px;
      text-decoration: none;
      padding: 8px;
      border-radius: 1rem;
      display: inline-block;
    }

    .hero__image {
      grid-area: b;
      justify-self: end;
      width: 65%;
      height: auto;
    }
  }
`
