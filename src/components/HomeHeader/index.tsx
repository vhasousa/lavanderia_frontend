import { useState } from 'react'

import { HeaderContainer } from './styles'

import logoImg from '../../assets/logo.png'
import menuIcon from '../../assets/menu.svg'
import closeIcon from '../../assets/close.svg'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  const [navActive, setNavActive] = useState(false)

  return (
    <HeaderContainer>
      <nav className={`nav`}>
        <Link href="/">
          <Image src={logoImg} alt="" />
        </Link>

        <ul className={`${navActive ? 'active' : ''} nav-list`}>
          <li>
            <Link href="/precos">Preços</Link>
          </li>
          <li>
            <Link href="#services">Serviços</Link>
          </li>
          <li>
            <Link href="#contact">Contato</Link>
          </li>
          <li>
            <Link href="#footer">Localização</Link>
          </li>
        </ul>

        <div onClick={() => setNavActive(!navActive)} className={`mobile-menu`}>
          <i>
            {navActive ? (
              <Image src={closeIcon} alt="" />
            ) : (
              <Image src={menuIcon} alt="" />
            )}
          </i>
        </div>
      </nav>
    </HeaderContainer>
  )
}
