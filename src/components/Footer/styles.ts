import styled from 'styled-components'

export const FooterContainer = styled.footer`
  @media (min-width: 280px) and (max-width: 767px) {
    .map-responsive {
      margin: 1rem auto;
      max-width: 296px;
    }

    .map-responsive iframe {
      width: 100%;
      height: 256px;
    }

    background-color: ${(props) => props.theme['primary-color']};

    .location {
      margin: 0 auto;
      background-color: ${(props) => props.theme['primary-color']};
      padding: 12px 0;
    }

    .location__info {
      text-align: left;
      max-width: 296px;
      margin: 1rem auto;
    }

    .location__info h3 {
      font-weight: 500;
      font-size: 24px;
      color: ${(props) => props.theme['primary-shade-1']};
      margin-bottom: 2rem;
      text-align: center;
    }

    .location__info h4 {
      font-weight: 500;
      font-size: 16px;
      color: ${(props) => props.theme['primary-shade-1']};
    }

    .location__info p {
      font-size: 16px;
      color: ${(props) => props.theme['primary-shade-1']};
      margin-bottom: 2rem;
    }

    .location__info p:last-child {
      margin-bottom: 0;
    }

    .footer-text {
      padding: 2rem 2rem;
      border-top: solid 1px var(--black-80);
    }

    .footer-text p {
      line-height: 1.5rem;
    }
    .footer-text p + p {
      margin-top: 1rem;
    }
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    background-color: ${(props) => props.theme['primary-color']};

    .location {
      display: grid;
      grid-template-columns: 50% 50%;
      grid-template-areas: 'a b';
      grid-gap: 2rem;
      margin: 0 auto;
      padding: 2rem 0;
    }

    .map-responsive {
      grid-area: b;
      justify-self: start;
    }

    .map-responsive iframe {
      width: 320px;
      height: 256px;
    }

    .location__info {
      text-align: left;
      grid-area: a;
      align-self: center;
      justify-self: center;
    }

    .location__info h3 {
      font-weight: 500;
      font-size: 32px;
      color: ${(props) => props.theme['primary-shade-1']};
      margin-bottom: 2rem;
    }

    .location__info h4 {
      font-weight: 500;
      font-size: 24px;
      color: ${(props) => props.theme['primary-shade-1']};
    }

    .location__info p {
      font-size: 16px;
      color: ${(props) => props.theme['primary-shade-1']};
      margin-bottom: 2rem;
    }

    .location__info p:last-child {
      margin-bottom: 0;
    }

    .footer-text {
      display: flex;
      justify-content: space-between;
      padding: 2rem 2rem;
      border-top: solid 1px ${(props) => props.theme['black-80']};
    }
  }

  @media (min-width: 1280px) {
    background-color: ${(props) => props.theme['primary-color']};

    .location {
      display: grid;
      grid-template-columns: 50% 50%;
      grid-template-areas: 'a b';
      grid-gap: 2rem;
      margin: 0 auto 0 auto;
      padding: 2rem 0;
    }

    .map-responsive {
      grid-area: b;
      justify-self: center;
    }

    .map-responsive iframe {
      width: 320px;
      height: 256px;
    }

    .location__info {
      text-align: left;
      grid-area: a;
      align-self: center;
      justify-self: center;
    }

    .location__info h3 {
      font-weight: 500;
      font-size: 32px;
      color: ${(props) => props.theme['primary-shade-1']};
      margin-bottom: 2rem;
    }

    .location__info h4 {
      font-weight: 500;
      font-size: 24px;
      color: ${(props) => props.theme['primary-shade-1']};
    }

    .location__info p {
      font-size: 16px;
      color: ${(props) => props.theme['primary-shade-1']};
      margin-bottom: 2rem;
    }

    .location__info p:last-child {
      margin-bottom: 0;
    }

    .footer-text {
      display: flex;
      justify-content: space-between;
      padding: 2rem 2rem;
      border-top: solid 1px ${(props) => props.theme['black-80']};
    }
  }
`
