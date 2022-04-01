import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Route from 'next/router'

const Home = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon')
      const data = await res.json(res)

      const pokemons = data.results.map((poke) => {
        const url = poke.url.split('/')
        const id = url[6]
        const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

        return { name: poke.name, pic, id }
      })

      setData(pokemons)
    }
    getData()
  }, [])

  const searchPokemonById = (e) => {
    e.preventDefault()
    Route.push(`/${e.target.pokeId.value}`)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Poke-App</h1>

      <form onSubmit={searchPokemonById}>
        <label>
          <input type="text" name="pokeId" placeholder="Buscar por ID" />
          <button>Buscar</button>
        </label>
      </form>

      <div style={{ marginTop: 20 }}>
        <Link href="/registrar">
          <a style={{ color: '#3578E5' }}>Registrar Pokemon</a>
        </Link>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: 20,
          marginRight: 80,
          marginLeft: 80,
        }}
      >
        {data
          ? data.map((poke, i) => (
              <div
                key={poke.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#3578E5',
                  borderRadius: 20,
                  marginBottom: 20,
                }}
              >
                <Image
                  src={poke.pic}
                  alt={poke.name}
                  width={200}
                  height={200}
                  objectFit="contain"
                />
                <span style={{ color: '#fff' }}>{poke.name}</span>
                <Link href={`/${i + 1}`}>
                  <a style={{ color: '#fff', textDecoration: 'underline' }}>
                    ver detallle
                  </a>
                </Link>
              </div>
            ))
          : 'cargando'}
      </div>
    </div>
  )
}

export default Home
