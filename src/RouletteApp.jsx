import { useEffect, useRef, useState } from 'react'
import './RouletteApp.css'

import {options, darkList} from './data.json'
import confeti from './assets/confeti.png'
import btnImg from './assets/BOTON.png'
import background from './assets/background.jpg'

const rotateAngle = 360 / options.length
const deformAngle = 90 - rotateAngle

const maxSpin = 10
const minSpin = 2
const maxDegrees = 360
const minDegrees = 10

export default function RouletteApp() {

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

  function getImageUrl(name) {
    return new URL(name, import.meta.url).href
  }

  return (
    <main className='carousel-container'>
      <img src={background} alt='background' className='background-img' />

      {
        selected === null && false &&
        <img src={confeti} alt='fondo de confeti' className='confeti' />
      }

      <div className={`background ${selected !== null ? 'show' : ''}`} style={{backgroundColor: `${selected?.code}`, color: `${darkList.includes(selected?.color) ? 'white' : 'black'}`}}>

        <div className="info">
          <h1>Este será tu color!! 🥳</h1>
          <p>Deberás llevar una bebida y prenda de ropa con él.</p>
          <p>Te dejamos algunas opciones para que te inspires...</p>
        </div>

        <div className='grid-img'>
          {
            selected?.images?.map((image, index) => (
              <article key={index}>
                <img
                  style={{filter: selected?.color === 'Negro' ? 'drop-shadow(0 0 50px rgba(252, 252, 252, 0.534))' : ''}}
                  src={image.link ? getImageUrl(image.link) : 'https://toppng.com/uploads/preview/botellas-de-vidrio-png-botella-espumoso-1156316655987rpl2mgzi.png'}
                  alt='imagen de producto'
                />
                <span>{image.name}</span>
              </article>
            ))
          }
        </div>
      </div>

      {
        selected === null &&
          <>
            <h1 className='rulete-title'>Es mi cumpleaños que seas muy feliz!!</h1>
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
