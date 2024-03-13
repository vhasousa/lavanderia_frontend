import { Contact } from '@/components/Contact';
import { Facilities } from '@/components/Facilities';
import { HomeContainer } from '../styles/styles'
import { Hero } from '@/components/Hero';
import LoginPage from '@/components/LoginPage';
import { Prices } from '@/components/Prices';
import { Services } from '@/components/Services';
import { Header } from '@/components/HomeHeader';
import React from 'react';
import { Footer } from '@/components/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      <HomeContainer>
        <Hero />
        <Facilities />
        <Prices />
        <Services />
        <Contact />
      </HomeContainer>
      <Footer />
    </>
  );
};

export default HomePage;