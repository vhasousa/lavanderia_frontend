import ClientRegisterModal from '@/components/ClientRegisterModal';
import Sidebar from '../../components/Sidebar';
import styles from '../../styles/clientes/Clients.module.css';
import { useState } from 'react';
import ClientsTable from '@/components/ClientsTable';

const Clients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.clientContainer}>
      <Sidebar />
      <div className={styles.clientContent}>
        <div className={styles.clientContentTitle}>
          <h1>Clientes</h1>
          <button className={styles.clientRegisterButton} onClick={() => openModal()}>NOVO CLIENTE  +</button>
        </div>

        <ClientsTable updateTrigger={updateTrigger} />

        {isModalOpen && (
          <ClientRegisterModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)} 
            onClientRegistered={() => setUpdateTrigger(prev => prev + 1)} />
        )}
      </div>
    </div>
  );
};

export default Clients;
