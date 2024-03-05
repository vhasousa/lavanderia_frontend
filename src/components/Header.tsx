import { useState } from 'react';
import styles from './Header.module.css'; // Import the CSS module

import Image from 'next/image';
import { MdLocalLaundryService } from 'react-icons/md';
import { FaTshirt, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';

export function Header() {
    const [navActive, setNavActive] = useState(true);

    const router = useRouter();

    const isActive = (href: string) => {
        return router.pathname === href;
    };

    const menuItems = [
        { href: '/servicos', label: 'Serviço', Icon: MdLocalLaundryService }, // Using a laundry service icon for "Serviço"
        { href: '/clientes', label: 'Clientes', Icon: FaUser }, // Using a T-shirt icon for "Clientes"
        { href: '/itens', label: 'Itens', Icon: FaTshirt }, // Using a water icon for "Itens"
    ];

    return (
        <header className={styles.headerContainer}>
            <nav className={styles.nav}>
                <Image
                    src="/logos/logo.png"
                    alt="Your Logo"
                    width={48}
                    height={48}
                    layout="fixed"
                />

                <ul className={`${navActive ? styles.navListActive : ''} ${styles.navList}`}>
                    {menuItems.map(({ href, label, Icon }) => (
                        <li key={href} className={isActive(href) ? styles.active : ''}>
                            <Link href={href}>
                                <Icon className={styles.icon} /> {label}
                            </Link>
                        </li>
                    ))}
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
            </nav>
        </header>
    );
}
