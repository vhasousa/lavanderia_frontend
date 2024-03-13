import { PriceContainer } from './styles'

import calendar from '../../assets/calendar.svg'
import weight from '../../assets/weight.svg'
import peace from '../../assets/peace.svg'
import hotel from '../../assets/hotel.svg'
import Image from 'next/image'

export function Prices() {
  return (
    <PriceContainer>
      <h2 className="title">Preços</h2>
      <div className="price__cards">
        <article className="cards">
          <div>
            <Image src={calendar} alt="" className="cards__image" />
            <h3>Mensal</h3>
          </div>
          <p>
            R$170,00<span>/mês</span>
          </p>
        </article>

        <article className="cards">
          <div>
            <Image src={weight} alt="" className="cards__image" />
            <h3>Por quilo</h3>
          </div>
          <p>
            R$20,00<span>/quilo</span>
          </p>
        </article>

        <article className="cards">
          <div>
            <Image src={peace} alt="" className="cards__image" />
            <h3>Por peça</h3>
          </div>
          <a href="#">
            <p>Ver tabela</p>
          </a>
        </article>

        <article className="cards">
          <div>
            <Image src={hotel} alt="" className="cards__image" />
            <h3>Hotelaria</h3>
          </div>
          <a href="https://api.whatsapp.com/send?phone=5524988363391">
            <p>Entre em contato</p>
          </a>
        </article>
      </div>
    </PriceContainer>
  )
}
