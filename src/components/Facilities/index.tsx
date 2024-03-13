import washCard from '../../assets/wash_card.png'
import ironCard from '../../assets/iron_card.png'
import deliveryCard from '../../assets/delivery_card.png'
import { FacilitiesContainer } from './styles'
import Image from 'next/image'

export function Facilities() {
  return (
    <FacilitiesContainer>
      <h2 className={`title`}>Facilidades</h2>
      <div className={`facilities`}>
        <Image src={washCard} alt="" className={`facilities__card`} />
        <Image src={ironCard} alt="" className={`facilities__card`} />
        <Image src={deliveryCard} alt="" className={`facilities__card`} />
      </div>
    </FacilitiesContainer>
  )
}
