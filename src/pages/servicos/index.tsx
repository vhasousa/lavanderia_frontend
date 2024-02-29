import React, { useEffect, useState } from 'react';

import Sidebar from '../../components/Sidebar';
import ServicesTable from '@/components/ServicesTable';

import styles from '../../styles/servicos/Services.module.css'
import ServiceRegisterModal from '@/components/ServiceRegisterModal';

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.serviceContainer}>
      <Sidebar />
      <div className={styles.serviceContent}>
        <div className={styles.serviceContentTitle}>
          <h1>Serviços cadastrados</h1>
          <button className={styles.serviceRegisterButton} onClick={() => openModal()}>NOVO SERVIÇO  +</button>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Pesquisar"
          className={styles.searchInput}
        />

        <ServicesTable updateTrigger={updateTrigger} searchTerm={searchTerm} />

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
