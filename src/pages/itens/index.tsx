import Sidebar from '../../components/Sidebar';
import styles from '../../styles/itens/Items.module.css';
import { useState } from 'react';
import ItemsTable from '@/components/ItemsTable';
import ItemRegisterModal from '@/components/ItemRegisterModal';
import { Header } from '@/components/Header';
import withAdminAuth from '@/components/withAdminAuth';

const Items = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Header />
      <div className={styles.itemContainer}>
        <Sidebar />
        <div className={styles.itemContent}>
          <div className={styles.itemContentTitle}>
            <h1>Itens</h1>
            <button className={styles.itemRegisterButton} onClick={() => openModal()}>NOVO ITEM  +</button>
          </div>

          <ItemsTable updateTrigger={updateTrigger} />

          {isModalOpen && (
            <ItemRegisterModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onItemRegistered={() => setUpdateTrigger(prev => prev + 1)} />
          )}
        </div>
      </div>
    </>

  );
};

export default withAdminAuth(Items);
