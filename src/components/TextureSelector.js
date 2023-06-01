import React, {useEffect, useState} from 'react'
import { useStore } from '../hooks/useStore'
import { useKeyboard } from '../hooks/useKeyboard'
import { dirtImg, grassImg, glassImg, logImg, woodImg } from '../images/images'

const images = {
	dirt: dirtImg,
	grass: grassImg,
	glass: glassImg,
	wood: woodImg,
	log: logImg,
}



const TextureSelector= () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => [state.texture, state.setTexture])
	const {
		dirt,
		grass,
		glass,
		wood,
		log,
	} = useKeyboard()

  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      wood,
      log,
    }
    // to find the texture that has value = true
    const pressedTexture = Object.entries(textures).find(([key, value]) =>  value)
    if (pressedTexture) {
      setTexture(pressedTexture[0])
    }
  }, [setTexture, dirt,grass,glass,wood,log])


  useEffect(() => {
    const visiblityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000)
    setVisible(true)
    return () => {
      clearTimeout(visiblityTimeout)
    }
  }, [activeTexture])

  return visible && (
		<div className='absolute centered texture-selector'>
			{Object.entries(images).map(([k, src]) => {
				return (<img
					key={k}
					src={src}
					alt={k}
					className={`${k === activeTexture ? 'active' : ''}`}
				/>)
			})}
		</div>
  )
}


export default TextureSelector  
