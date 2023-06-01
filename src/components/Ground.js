import React from 'react'
import { usePlane } from '@react-three/cannon'
import { groundTexture } from '../images/textures'
import { NearestFilter, RepeatWrapping } from 'three'
import { useStore } from '../hooks/useStore'


function Ground() {
  const [ref] = usePlane(() => ({
    // rotate the x axis -90 (so that we flip it 180 degrees) degrees to make it a ground (but in radians π)
    rotation: [-Math.PI/2, 0, 0],
    position: [0, -0.5, 0]
  }))

  const [addCube] = useStore((state) => [state.addCube])

  // to make the ground repeat itself to fit the screen and don't expand
  groundTexture.wrapS = RepeatWrapping
  groundTexture.wrapT = RepeatWrapping
  groundTexture.repeat.set(100, 100)

  return (
    <mesh 
    ref={ref} 
    onClick={(e) => {
      // will make the click don't exit the website
      e.stopPropagation()
			const [x, y, z] = Object.values(e.point).map(val => Math.ceil(val));
      addCube(x, y, z)
    }}
    >
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      {/* the mesh standard material (the thing will be rendered) here we want to render the ground texture */}
      <meshStandardMaterial attach='material' map={groundTexture} />
    </mesh>
  )
}


export default Ground
