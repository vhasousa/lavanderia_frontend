import Sidebar from '../../components/Sidebar';
import styles from '../../styles/clientes/Clients.module.css';

const Clients = () => {
  return (
    <div className={styles.clientContainer}>
      <Sidebar />
      <div>
        <h1>Clientes</h1>
      </div>
    </div>
  );
};

export default Clients;
