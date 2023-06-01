import { PointerLockControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"



export const FPV = () => {
  // get the camera
  const { camera, gl } = useThree()
  
  return (
    // make the camera moove with the mouse
    <PointerLockControls args={[camera, gl.domElement]} />
  )
}

