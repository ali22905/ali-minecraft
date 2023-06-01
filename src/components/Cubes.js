import React from 'react'
import {useStore} from '../hooks/useStore'
import Cube from './Cube'


function Cubes() {
  const [cubes] = useStore((state) => [
    state.cubes
  ])
  return cubes.map(({key, pos, texture}) => {
    return (
      // return the cube and pass to it the position of the cube and its texture
      <Cube key={key} position={pos} texture={texture} />
    )
  })
}

export default Cubes

