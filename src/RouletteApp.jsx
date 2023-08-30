import { useEffect, useRef, useState } from 'react'
import './RouletteApp.css'
import backgroundImg from './assets/background.png'

const options = [
  {
    color: 'Azul',
    code: 'blue',
  },
  {
    color: 'Amarillo/Dorado',
    code: 'yellow',
  },
  {
    color: 'Verde',
    code: 'green',
  },
  {
    color: 'Rojo',
    code: 'red',
  },
  {
    color: 'Negro',
    code: 'black',
  },
  {
    color: 'Naranja',
    code: 'orange',
  },
  {
    color: 'Blanco',
    code: 'salmon',
  }
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
    const spins = getRandomNumber(minSpin ,maxSpin)
    const degrees = getRandomNumber(minDegrees ,maxDegrees)

    const fullSpins = (spins - 1) * 360
    const spin = fullSpins + degrees

    if (roulette.current) {
      roulette.current.style.transform = `rotate(-${spin}deg)`
      roulette.current.style.transition = `${spins}s ease`
    }

    setTimeout(() => {
      const index = Math.trunc(degrees / rotateAngle)
      console.log(index)

      const info = JSON.stringify(options[index])

      // window.localStorage.setItem('Rho-Roulete', info)

      setSelected(options[index])
    }, (spins + 1) * 1000)
  }

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <main className='carousel-container'>

      <img src={backgroundImg} alt='fondo de confeti' />

      <div className={`background ${selected !== null ? 'show' : ''}`} style={{backgroundColor: `${selected?.code}`}}>
        <p>
        </p>
      </div>

      {
        selected === null &&
          <>
            <section id='roulette'>
              <span className='static-elements'/>

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

            <button onClick={spin}>
              Girar
            </button>
          </>
      }
    </main>
  )
}

export default RouletteApp
