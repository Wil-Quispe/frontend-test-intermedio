import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Poke = () => {
  const query = useRouter().query
  const [data, setData] = useState()

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.id}`)
      const data = await res.json(res)
      console.log(data)
      setData({
        name: data.forms[0].name,
        id: query.id,
        pic: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${query.id}.png`,
      })
    }
    getData()
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {data ? (
        <>
          <Image src={data?.pic} width={200} height={200} alt={data?.name} />

          <div>
            <h3>ID: {data?.id}</h3>
            <h3>Nombre: {data?.name}</h3>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </>
      ) : (
        <h1>Cargando...</h1>
      )}

      <Link href="/">
        <a>Volver a Inicio</a>
      </Link>
    </div>
  )
}

export default Poke
