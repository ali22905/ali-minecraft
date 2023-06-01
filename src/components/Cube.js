import React, {useState} from 'react'
import { useBox } from '@react-three/cannon'
import * as textures from '../images/textures'
import { useStore } from '../hooks/useStore'


const Cube = ({position, texture}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube])
  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }))

  const activeTexture = textures[`${texture}Texture`]

  return (
    <mesh 
    onPointerMove={(e) => {
      e.stopPropagation()
      setIsHovered(true)
    }}
    onPointerOut={(e) => {
      e.stopPropagation()
      setIsHovered(false)
    }}
    ref={ref}
    onClick={(e) => {
      // will make the click don't exit the website
      e.stopPropagation()
			// add a box next to the clicked side ex: if you click on the left of a cube it will add other cube left to it
      // the cube has 12 faces because it has 6 squares and in threejs each square is consisting of 2 tringles so it is 2 sides
      const clickedFace = Math.floor(e.faceIndex / 2) // make it a hole number
      const {x,y,z} = ref.current.position
      if (e.ctrlKey) {
        removeCube(x, y, z)
        return
      }
      else if (clickedFace === 0) {
        addCube(x + 1, y, z)
        return
      }
      else if (clickedFace === 1) {
        addCube(x - 1, y, z)
        return
      }
      else if (clickedFace === 2) {
        addCube(x, y + 1, z)
        return
      }
      else if (clickedFace === 3) {
        addCube(x, y - 1, z)
        return
      }
      else if (clickedFace === 4) {
        addCube(x, y, z + 1)
        return
      }
      else if (clickedFace === 5) {
        addCube(x, y, z - 1)
        return
      }
    }}
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial 
				color={isHovered ? 'grey' : 'white'}
				map={activeTexture}
				transparent={true}
				opacity={texture === 'glass' ? 0.6 : 1}
				attach="material"
      />
    </mesh>
  )
}

export default Cube
