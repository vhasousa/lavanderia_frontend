// components/Sidebar.tsx
import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <Link href="/clientes">Clientes</Link>
        </li>
        <li>
          <Link href="/itens">Itens</Link>
        </li>
        <li>
          <Link href="/servicos">Serviço</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
