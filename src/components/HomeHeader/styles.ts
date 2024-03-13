import styled from 'styled-components'

export const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 1;
  background: ${(props) => props.theme['primary-color']};
  top: 0px;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${(props) => props.theme['primary-color']};
    height: 8vh;

    max-width: 1200px;
    margin: 0 auto;
  }

  a {
    text-decoration: none;
    transition: 0.3s;
  }

  .nav-list {
    list-style: none;
    display: flex;
  }

  .nav-list li {
    margin-left: 32px;
  }

  .mobile-menu {
    cursor: pointer;
    display: none;
  }

  @media (min-width: 280px) and (max-width: 1279px) {
    body {
      overflow-x: hidden;
    }

    background-color: ${(props) => props.theme['primary-color']};

    .nav {
      max-width: 1278px;
      margin: 0 2rem;
    }

    .nav-list {
      position: absolute;
      top: 8vh;
      right: 0;
      width: 50vw;
      height: 92vh;
      background: ${(props) => props.theme['primary-color']};
      flex-direction: column;
      transform: translateX(100%);
      transition: transform 0.3s ease-in;

      padding: 2rem;
    }

    .nav-list li {
      margin-left: 0;
      margin-top: 2rem;
    }

    .mobile-menu {
      display: block;
    }

    .nav-list.active {
      transform: translateX(0);
    }

    @keyframes navLinkFade {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
`
