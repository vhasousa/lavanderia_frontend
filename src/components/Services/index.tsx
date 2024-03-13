import { ServicesContainer } from './styles'

import carpet from '../../assets/carpet.svg'
import sneaker from '../../assets/sneaker.png'
import sofa from '../../assets/sofa.png'
import dress from '../../assets/dress.png'
import teddyBear from '../../assets/teddy_bear.svg'
import iron from '../../assets/iron.svg'
import Image from 'next/image'

export function Services() {
  return (
    <ServicesContainer id="services">
      <h2 className={`title`}>Serviços</h2>
      <div className={`services`}>
        <article className={`services__card`}>
          <div className={`services__card`}>
            <Image src={carpet} alt="" />
          </div>
          <p>Tapetes</p>
        </article>

        <article className={`services__card`}>
          <div className={`services__card`}>
            <Image src={sneaker} alt="" />
          </div>
          <p>Tênis</p>
        </article>

        <article className={`services__card`}>
          <div className={`services__card`}>
            <Image src={sofa} alt="" />
          </div>
          <p>Sofás</p>
        </article>

        <article className={`services__card`}>
          <div className={`services__card`}>
            <Image src={dress} alt="" />
          </div>
          <p>Vestidos</p>
        </article>

        <article className={`services__card`}>
          <div className={`services__card`}>
            <Image src={teddyBear} alt="" />
          </div>
          <p>Pelúcias</p>
        </article>

        <article className={`services__card`}>
          <div className={`services__card`}>
            <Image src={iron} alt="" />
          </div>
          <p>Passadoria</p>
        </article>
      </div>
      <a className={`services__button`} href="precos">
        Confira nossos preços
      </a>
    </ServicesContainer>
  )
}
