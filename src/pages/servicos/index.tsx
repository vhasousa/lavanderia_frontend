import React from 'react';

import Sidebar from '../../components/Sidebar';
import ServicesTable from '@/components/ServicesTable';

import styles from '../../styles/servicos/Services.module.css'

const Services = () => {
  return (
    <div className={styles.serviceContainer}>
      <Sidebar />
      <ServicesTable />
    </div>
  );
};

export default Services;
