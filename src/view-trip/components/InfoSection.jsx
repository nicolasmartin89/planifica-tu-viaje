import React from 'react'

function InfoSection({ trip }) {
    return (
        <div>
            <img src="/public/22807.jpg" className="h-[340px] w-full rounded-2xl object-cover " alt="placeholder" />

            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-semibold text-2xl text-left'>{trip?.userSelection?.location?.label}</h2>
                <div className='flex gap-5 text-pretty'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 Días de viaje: {trip?.userSelection?.numberOfDays}</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🚀 N° Personas: {trip?.userSelection?.people}</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 Presupuesto elegido: {trip?.userSelection?.budget}</h2>
                </div>
            </div>
        </div>

    )
}

export default InfoSection