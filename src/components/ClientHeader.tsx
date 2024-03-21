import { useState } from 'react';
import styles from './ClientHeader.module.css'; // Import the CSS module

import Image from 'next/image';
import { MdLocalLaundryService } from 'react-icons/md';
import { FaSignOutAlt, FaTshirt, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';

export function ClientHeader() {
    const [navActive, setNavActive] = useState(false);

    const router = useRouter();

    const logout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    return (
        <header className={styles.headerContainer}>
            <nav className={styles.nav}>

                <ul className={`${navActive ? styles.navListActive : ''} ${styles.navList}`}>
                    <div className={styles.logoutContainer}>
                        <button onClick={logout} className={styles.logoutButton}>
                            <FaSignOutAlt className={styles.icon} /> Sair
                        </button>
                    </div>
                </ul>

                <div onClick={() => setNavActive(!navActive)} className={styles.mobileMenu}>
                    <i>
                        {navActive ? (
                            <Image
                                src="/logos/close.svg"
                                alt="Close"
                                width={16}
                                height={16}
                                layout="fixed"
                            />
                        ) : (
                            <Image
                                src="/logos/menu.svg"
                                alt="Menu"
                                width={16}
                                height={16}
                                layout="fixed"
                            />
                        )}
                    </i>
                </div>

                <Image
                    src="/logos/logo.png"
                    alt="Your Logo"
                    width={48}
                    height={48}
                    layout="fixed"
                />
            </nav>
        </header>
    );
}
