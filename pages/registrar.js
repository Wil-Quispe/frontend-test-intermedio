import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const Registrar = () => {
  const [preview, setPreview] = useState()
  const [data, setData] = useState()
  const registerPokemon = (e) => {
    e.preventDefault()

    const name = e.target.name.value
    const description = e.target.description.value
    const skills = e.target.skills.value

    setData((prev) => ({ ...prev, name, description, skills }))
  }

  useEffect(() => {
    if (data?.name) {
      Object.entries(data).map((item) => {
        localStorage.setItem(item[0], item[1])
      })
    }
  }, [data])

  const imageChange = (e) => {
    const file = e.target.files

    setData({ pic: file[0].name })

    if (file.length > 0) {
      const fileReader = new FileReader()
      fileReader.onload = function () {
        setPreview(fileReader.result)
      }
      fileReader.readAsDataURL(file[0])
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
      }}
    >
      <form
        style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onSubmit={registerPokemon}
      >
        <label style={{ marginBottom: 10 }}>Nombre</label>
        <input type="text" style={{ marginleft: 100 }} name="name" />
        <label style={{ marginBottom: 10 }}>Descripcion</label>
        <input type="text" name="description" />
        <label style={{ marginBottom: 10 }}>Habilidades</label>
        <input type="text" name="skills" />
        <label style={{ marginBottom: 10 }}>Imagen</label>
        <input
          type="file"
          name="pic"
          id="file"
          onChange={imageChange}
          style={{
            backgroundColor: '#3578E5',
            color: 'white',
            marginBottom: 20,
          }}
        />

        <button>Registrar</button>
      </form>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 50,
        }}
      >
        {preview && <img src={preview} width="200" height="200" />}

        {data?.name && <pre>{JSON.stringify(data, null, 2)}</pre>}

        <Link href="/">
          <a style={{ color: '#3578E5', margin: '50px 0' }}>Volver a Inicio</a>
        </Link>
      </div>
    </div>
  )
}

export default Registrar
