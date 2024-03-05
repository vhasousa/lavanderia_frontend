import React, { useEffect, useState } from 'react';

import Sidebar from '../../components/Sidebar';
import ServicesTable from '@/components/ServicesTable';

import styles from '../../styles/servicos/Services.module.css'
import ServiceRegisterModal from '@/components/ServiceRegisterModal';

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  return (
    <div className={styles.serviceContainer}>
      <Sidebar />
      <div className={styles.serviceContent}>
        <div className={styles.serviceContentTitle}>
          <h1>Serviços cadastrados</h1>
          <button className={styles.serviceRegisterButton} onClick={() => openModal()}>NOVO SERVIÇO  +</button>
        </div>
        <div className={styles.filterContainer}> {/* Add this container to align search and dropdown */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Pesquisar"
            className={styles.searchInput}
          />
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className={styles.statusDropdown}
          >
            <option value="">Todos os status</option>
            <option value="Separado">Separado</option>
            <option value="Lavando">Lavando</option>
            <option value="Secando">Secando</option>
            <option value="Passando">Passando</option>
            <option value="Finalizado">Finalizado</option>
          </select>
        </div>

        <ServicesTable updateTrigger={updateTrigger} searchTerm={searchTerm} statusFilter={statusFilter} />

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
