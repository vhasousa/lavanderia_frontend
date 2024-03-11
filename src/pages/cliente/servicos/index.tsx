import { useState } from 'react';
import ClientServicesTable from '@/components/ClientServicesTable';
import { ClientHeader } from '@/components/ClientHeader';
import ClientSidebar from '@/components/ClientSidebar';
import styles from '../../../styles/cliente/ClientService.module.css'

const ClientServicesPage = () => {
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

    <>
      <ClientHeader />
      <div className={styles.serviceContainer}>
        <ClientSidebar />
        <div className={styles.serviceContent}>
          <div className={styles.serviceContentTitle}>
            <h1>Serviços cadastrados</h1>
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
          <ClientServicesTable />
        </div>
      </div>
    </>
  );
};

export default ClientServicesPage;
