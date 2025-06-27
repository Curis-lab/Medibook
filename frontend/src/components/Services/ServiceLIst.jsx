import React from 'react'
import { services } from '../../assets/data/services'
import ServiceCard from './ServiceCard'

function ServiceLIst() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
      {
        services.map((item, idx)=>(<ServiceCard item={item} idx={idx} key={idx}/>))
      }
    </div>
  )
}

export default ServiceLIst
