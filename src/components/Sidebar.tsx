import Link from 'next/link';
import styles from './Sidebar.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaSignOutAlt, FaTshirt } from 'react-icons/fa'; // Example: T-shirt icon for clothes
import { MdLocalLaundryService } from 'react-icons/md'; // Example: Laundry service icon
import { FaUser } from 'react-icons/fa'; // Example: Water icon for washing

const Sidebar = () => {
  const router = useRouter();

  const isActive = (href: string) => {
    return router.pathname === href;
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove the stored token
    router.push('/'); // Redirect to the home page
  };

  const menuItems = [
    { href: '/servicos', label: 'Serviço', Icon: MdLocalLaundryService }, // Using a laundry service icon for "Serviço"
    { href: '/clientes', label: 'Clientes', Icon: FaUser }, // Using a T-shirt icon for "Clientes"
    { href: '/itens', label: 'Itens', Icon: FaTshirt }, // Using a water icon for "Itens"
  ];

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

      <div className={styles.linksContainer}>
        <ul>
          {menuItems.map(({ href, label, Icon }) => (
            <li key={href} className={isActive(href) ? styles.active : ''}>
              <Link href={href}>
                  <Icon className={styles.icon} /> {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.logoutContainer}>
        <button onClick={logout} className={styles.logoutButton}>
          <FaSignOutAlt className={styles.icon} /> Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
