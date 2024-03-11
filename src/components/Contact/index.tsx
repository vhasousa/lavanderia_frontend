import { ContactContainer } from './styles'

export function Contact() {
  return (
    <ContactContainer id="contact">
      <h2>Lavanderia Avenida</h2>
      <p>Buscamos e entregamos em Valença - RJ e região</p>
      <a
        href="https://api.whatsapp.com/send?phone=5524988363391"
        target="_blank"
        rel="noreferrer"
      >
        Entre em contato
      </a>
    </ContactContainer>
  )
}
