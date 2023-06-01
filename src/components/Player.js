import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { useSphere } from '@react-three/cannon'
import { Vector3 } from 'three'
import { useKeyboard } from '../hooks/useKeyboard'

const JUMP_FORCE = 4
const SPEED = 4;


function Player() {
  const { moveBackward, moveForward, moveRight, moveLeft, jump } = useKeyboard()

  // give the player a camera by using this hook from three fiber
  const { camera } = useThree()

  // we use geometry to represent the player\
  // the api is the values of the object in the sphere
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    // positionY = 1 will make it land on the ground
    position: [0, 1, 0]
  }))


  const vel = useRef([0, 0, 0])
  useEffect(() => {
    api.velocity.subscribe((v) => vel.current = v)
  }, [api.velocity])


  // store the position of the player
  const pos = useRef([0, 0, 0])
  // make this pos var follow the position of the ref = useSphere mentioned above
  useEffect(() => {
    api.position.subscribe((p) => pos.current = p)
  }, [api.position])


  // make it run on every frame
  useFrame(() => {
    // make a new vector that has 3 dimentions with the current camera view
    // it follows the pos var values
    // pos.current[0]  => get the current values of the pos var and get index 0
    camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]))



    const direction = new Vector3()

		const frontVector = new Vector3(
			0,
			0,
			(moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
		)

		const sideVector = new Vector3(
			(moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
			0,
			0,
		)

    // to make the correct facing direction of the camera
    direction
    .subVectors(frontVector, sideVector)
    .normalize()
    .multiplyScalar(SPEED)
    .applyEuler(camera.rotation)

    api.velocity.set(direction.x, vel.current[1], direction.z)


		if (jump && Math.abs(vel.current[1]) < 0.05) {
      // make the velX = 4 so it jumps in the height of 4
			api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2])
		}
  })

  return (
    <mesh ref={ref}>

    </mesh>
  )
}

export default Player
