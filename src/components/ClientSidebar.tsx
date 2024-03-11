import styles from './ClientSidebar.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaSignOutAlt } from 'react-icons/fa';

const ClientSidebar = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <Image
          src="/logos/logo.png"
          alt="Your Logo"
          width={96}
          height={96}
          layout="fixed"
        />
      </div>

      <div className={styles.logoutContainer}>
        <button onClick={logout} className={styles.logoutButton}>
          <FaSignOutAlt className={styles.icon} /> Sair
        </button>
      </div>
    </div>
  );
};

export default ClientSidebar;
