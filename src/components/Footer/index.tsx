import Link from 'next/link'
import { FooterContainer } from './styles'

export function Footer() {
  return (
    <FooterContainer id="footer">
      <div className={`location`}>
        <div className={`map-responsive`}>
          <iframe
            style={{ border: 0 }}
            loading="lazy"
            src="https://maps.google.com/maps?q=lavanderia%20avenida&t=&z=13&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </div>
        <div className={`location__info`}>
          <h3>Lavanderia Avenida</h3>
          <h4>Endereço:</h4>
          <p>Avenida Nilo Peçanha, 1010 - Casa 1 Centro</p>
          <h4>Telefone:</h4>
          <p>(24) 9 8836-3391</p>
          <h4>Atendimento:</h4>
          <p>2ª a 6ª: 8 às 17h / Sábado: 8 às 12h</p>
          <Link href={"/login"}>Acesso restrito</Link>
        </div>
      </div>
      <div className={`footer-text`}>
        <p>Lavanderia Avenida © 2022. Todos os direitos reservados.</p>
        <p>Desenvolvido por Consupport</p>
      </div>
    </FooterContainer>
  )
}
