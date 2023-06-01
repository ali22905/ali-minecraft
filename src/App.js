import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import Ground from './components/Ground'
import Player from './components/Player'
import { FPV } from './components/FPV'
import Cubes from './components/Cubes'
import TextureSelector from './components/TextureSelector'
import Menu from './components/Menu'
import { hamer } from './images/images'


function App() {
  return (
    <>
      <Canvas>
        {/* we will make the sky first */}
        <Sky sunPosition={[100, 100, 20]} />
        {/* to light every 3D surface */}
        <ambientLight intensity={0.5} />
        {/* we must use this because we will use a hook from cannon to create the ground */}
        <FPV />
        <Physics>
          <Player />
          {/* we putted the cubes here bec the player will be able to stand on it so it is Physics */}
          <Cubes />
          <Ground />
        </Physics>
      </Canvas>
      <div className="absolute cursor centered">+</div>
      {/* <div style={{}}>
        <img style={{right: '100'}} className="centered" src={hamer} alt="" />
      </div> */}
      <TextureSelector />
      <Menu />
    </>
  );
}

export default App;
