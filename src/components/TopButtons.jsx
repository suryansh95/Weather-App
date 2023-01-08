import React from 'react'

function TopButtons( {setQuery}) {

    const cities = [
        {
            id: 1,
            title:'Delhi'
        },
        {
            id: 2,
            title:'Mumbai'
        },
        {
            id: 3,
            title:'Kolkata'
        },
        {
            id: 4,
            title:'Pune'
        },
        {
            id: 5,
            title:'Bangalore'
        }
    ]

  return (
    <div className='flex item-center justify-around my-6 header-menu' >
        {cities.map((city)=> (
            <button key={city.id} className='text-white text-lg font-medium transition ease-out hover:scale-125' onClick={()=>setQuery({q: city.title  })}> {city.title} </button>
        ))}
    </div>
  )
}

export default TopButtons