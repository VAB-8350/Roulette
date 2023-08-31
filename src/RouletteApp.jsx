import { useEffect, useRef, useState } from 'react'
import './RouletteApp.css'

import backgroundImg from './assets/background.png'
import btnImg from './assets/BOTON.png'

const options = [
  {
    color: 'Azul',
    code: '#0036ff',
  },
  {
    color: 'Rojo',
    code: '#b60000',
  },
  {
    color: 'Negro',
    code: '#010101',
  },
  {
    color: 'Verde',
    code: '#01ca01',
  },
  {
    color: 'Naranja',
    code: '#ff8a00',
  },
  {
    color: 'Amarillo',
    code: '#f0dd5a',
  }
]

const darkList = [
  'Azul',
  'Rojo',
  'Negro',
]

const rotateAngle = 360 / options.length
const deformAngle = 90 - rotateAngle

const maxSpin = 10
const minSpin = 2
const maxDegrees = 360
const minDegrees = 10

function RouletteApp() {

  // Local States
  const [selected, setSelected] = useState(null)
  const [loading, setLoading]   = useState(false)

  // Refs
  const roulette = useRef(null)

  // Effects
  useEffect(() => {
    const data = window.localStorage.getItem('Rho-Roulete')
    JSON.parse(data)
    data && setSelected(JSON.parse(data))
  }, [])

  // Methods
  const spin = () => {
    setLoading(true)
    const spins = getRandomNumber(minSpin ,maxSpin)
    const degrees = getRandomNumber(minDegrees ,maxDegrees)

    const fullSpins = (spins - 1) * 360
    const spin = fullSpins + degrees

    if (roulette.current) {
      const allRoulette = document.getElementById('roulette')
      const selector = document.getElementById('selector')


      allRoulette.style.transition = '.4s'
      allRoulette.style.transform = 'scale(1.05)'
      selector.style.transform = 'rotate(15deg)'

      setTimeout(() => allRoulette.style.transform = 'scale(1)', 300)
      setTimeout(() => selector.style.transform = 'rotate(0deg)', (spins - 1) * 1000)

      roulette.current.style.transform = `rotate(-${spin}deg)`
      roulette.current.style.transition = `${spins}s ease`
    }

    setTimeout(() => {
      const index = Math.trunc(degrees / rotateAngle)

      const info = JSON.stringify(options[index])

      // window.localStorage.setItem('Rho-Roulete', info)

      setSelected(options[index])
      setLoading(false)
    }, (spins + 1) * 1000)
  }

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <main className='carousel-container'>
      {
        selected === null &&
        <img src={backgroundImg} alt='fondo de confeti' />
      }

      <div className={`background ${selected !== null ? 'show' : ''}`} style={{backgroundColor: `${selected?.code}`, color: `${darkList.includes(selected?.color) ? 'white' : 'black'}`}}>

        <div className="info">
          <h1>Este será tu color!! 🥳</h1>
          <p>Deberás llevar una bebida y prenda de ropa con él.</p>
          <p>Te dejamos algunas opciones para que te inspires...</p>
        </div>

        <div className='grid-img'>
          <img style={{filter: selected?.color === 'Negro' ? 'drop-shadow(0 0 50px rgba(252, 252, 252, 0.534))' : ''}} src='https://tienda.cucinaparadiso.com/product_images/y/872/americano-gancia-removebg-preview__06470_std.png' alt='imagen de producto' />

          <img style={{filter: selected?.color === 'Negro' ? 'drop-shadow(0 0 50px rgba(252, 252, 252, 0.534))' : ''}} src='https://tienda.cucinaparadiso.com/product_images/y/872/americano-gancia-removebg-preview__06470_std.png' alt='imagen de producto' />

          <img style={{filter: selected?.color === 'Negro' ? 'drop-shadow(0 0 50px rgba(252, 252, 252, 0.534))' : ''}} src='https://tienda.cucinaparadiso.com/product_images/y/872/americano-gancia-removebg-preview__06470_std.png' alt='imagen de producto' />

          <img style={{filter: selected?.color === 'Negro' ? 'drop-shadow(0 0 50px rgba(252, 252, 252, 0.534))' : ''}} src='https://tienda.cucinaparadiso.com/product_images/y/872/americano-gancia-removebg-preview__06470_std.png' alt='imagen de producto' />

          <img style={{filter: selected?.color === 'Negro' ? 'drop-shadow(0 0 50px rgba(252, 252, 252, 0.534))' : ''}} src='https://tienda.cucinaparadiso.com/product_images/y/872/americano-gancia-removebg-preview__06470_std.png' alt='imagen de producto' />

          <img style={{filter: selected?.color === 'Negro' ? 'drop-shadow(0 0 50px rgba(252, 252, 252, 0.534))' : ''}} src='https://tienda.cucinaparadiso.com/product_images/y/872/americano-gancia-removebg-preview__06470_std.png' alt='imagen de producto' />

          <img style={{filter: selected?.color === 'Negro' ? 'drop-shadow(0 0 50px rgba(252, 252, 252, 0.534))' : ''}} src='https://tienda.cucinaparadiso.com/product_images/y/872/americano-gancia-removebg-preview__06470_std.png' alt='imagen de producto' />

          <img style={{filter: selected?.color === 'Negro' ? 'drop-shadow(0 0 50px rgba(252, 252, 252, 0.534))' : ''}} src='https://tienda.cucinaparadiso.com/product_images/y/872/americano-gancia-removebg-preview__06470_std.png' alt='imagen de producto' />
        </div>
      </div>

      {
        selected === null &&
          <>
            <section id='roulette'>
              <span className='static-elements'>
                <span id='selector' />
              </span>

              <div className='spin-content' ref={roulette}>
                {
                  options.map((option, index) => (
                    <div
                      className='roulette-section'
                      style={{
                        backgroundColor: `${option.code}`,
                        transform: `rotate(${rotateAngle * index}deg) skewY(-${deformAngle}deg)`
                      }}
                      key={index}>
                      <span className="roulette-section-container" />
                    </div>
                  ))
                }
              </div>

            </section>

            <button onClick={spin} disabled={selected || loading} >
              <img src={btnImg} alt='girar ruleta' />
            </button>
          </>
      }
    </main>
  )
}

export default RouletteApp
