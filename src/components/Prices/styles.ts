import styled from 'styled-components'

export const PriceContainer = styled.section`
  @media (min-width: 280px) and (max-width: 767px) {
    text-align: center;

    .price__cards {
      max-width: 320px;
      display: grid;
      grid-template-columns: 50% 50%;
      justify-items: center;
      margin: 2rem auto;
    }

    .cards {
      display: grid;
      grid-template-rows: 60% 40%;
      background-color: ${(props) => props.theme.white};
      width: 136px;
      height: 224px;
      border-radius: 1rem;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      align-items: end;
      margin-top: 1rem;
    }

    .cards h3 {
      font-size: 24px;
      color: ${(props) => props.theme['primary-shade-3']};
      font-weight: 700;
    }

    .cards p {
      font-size: 24px;
      color: ${(props) => props.theme['primary-shade-3']};
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .cards p span {
      font-size: 12px;
      color: ${(props) => props.theme['primary-shade-3']};
      font-weight: 500;
    }
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    text-align: center;

    .price__cards {
      display: flex;
      justify-content: space-around;
      max-width: 1200px;
      margin: 4rem auto;
    }

    .cards {
      display: grid;
      grid-template-rows: 60% 40%;
      background-color: ${(props) => props.theme.white};
      width: 160px;
      height: 213px;
      border-radius: 1rem;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      align-items: end;
    }

    .cards h3 {
      font-size: 32px;
      color: ${(props) => props.theme['primary-shade-3']};
      font-weight: 700;
    }

    .cards p {
      font-size: 24px;
      color: ${(props) => props.theme['primary-shade-3']};
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .cards p span {
      font-size: 12px;
      color: ${(props) => props.theme['primary-shade-3']};
      font-weight: 500;
    }
  }

  @media (min-width: 1280px) {
    text-align: center;

    .price__cards {
      display: flex;
      justify-content: space-around;
      max-width: 1200px;
      margin: 4rem auto;
    }

    .cards {
      display: grid;
      grid-template-rows: 60% 40%;
      background-color: ${(props) => props.theme.white};
      width: 224px;
      height: 298px;
      border-radius: 1rem;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      align-items: end;
    }

    .cards h3 {
      font-size: 32px;
      color: ${(props) => props.theme['primary-shade-3']};
      font-weight: 700;
    }

    .cards p {
      font-size: 24px;
      color: ${(props) => props.theme['primary-shade-3']};
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .cards p span {
      font-size: 12px;
      color: ${(props) => props.theme['primary-shade-3']};
      font-weight: 500;
    }
  }
`
