import styled from 'styled-components'

export const FacilitiesContainer = styled.section`
  @media (min-width: 280px) and (max-width: 767px) {
    body > section:nth-of-type(3) {
      background-image: url('../../assets/bubble.png');
      background-repeat: no-repeat;
      background-size: 30%;
      background-position: 100% 2%;
    }

    .facilities {
      margin: 0 auto;
      max-width: 1200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }

    .facilities__card {
      max-width: 296px;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    body > section:nth-of-type(3) {
      background-image: url('../../assets/bubble.png');
      background-repeat: no-repeat;
      background-size: 20%;
      background-position: 100% 1%;
    }

    .facilities {
      margin: 0 auto;
      max-width: 1200px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .facilities__card {
      max-width: 246px;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
  }

  @media (min-width: 1280px) {
    body > section:nth-of-type(3) {
      background-image: url('../../assets/bubble.png');
      background-repeat: no-repeat;
      background-position: 83% 0%;
    }

    .facilities {
      margin: 4rem auto;
      max-width: 1200px;
      display: flex;
      justify-content: space-around;
    }
  }
`
