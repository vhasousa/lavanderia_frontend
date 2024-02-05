import React, { useState } from 'react';

import Sidebar from '../../components/Sidebar';
import ServicesTable from '@/components/ServicesTable';

import styles from '../../styles/servicos/Services.module.css'
import ServiceRegisterModal from '@/components/ServiceRegisterModal';

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0); // Initial value is 0


  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.serviceContainer}>
      <Sidebar />
      <div className={styles.serviceContent}>
        <div className={styles.serviceContentTitle}>
          <h1>Serviços cadastrados</h1>
          <button className={styles.serviceRegisterButton} onClick={() => openModal()}>NOVO SERVIÇO  +</button>
        </div>
        <ServicesTable updateTrigger={updateTrigger} />

        {isModalOpen && (
          <ServiceRegisterModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onServiceRegistered={() => setUpdateTrigger(prev => prev + 1)} // Increment the trigger
          />
        )}
      </div>
    </div>
  );
};

export default Services;
