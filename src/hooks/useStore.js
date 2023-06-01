import { create } from 'zustand'
import { nanoid } from 'nanoid'

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
  window.location.reload();
}


// to make the cubes and the textures of the application
export const useStore = create((set) => ({
  // make the operations that will happen like make adding cubes and reseting it 
  texture: getLocalStorage('texture') || 'dirt',
  cubes: getLocalStorage('cubes') || [],
  // when adding the cube we need to know where to add it so we putted the x,y,z params
  // this tell the app when adding a cube set the cubes field (above) = the previous cubes + the added cube
  addCube: (x,y,z) => {
    set((perv) => ({
      cubes: [
        ...perv.cubes,
        {
          key: nanoid(),
          pos: [x,y,z],
          texture: perv.texture
        }
      ]
    }))
  },
  removeCube: (x,y,z) => {
    set((perv) => ({
      cubes: perv.cubes.filter(cube => {
        const [X,Y,Z] = cube.pos
        return X !== x || Y !== y || Z !== z
      })
    }))
  },
  setTexture: (texture) => {
    set(() => ({
			texture: texture
		}))
  },
	saveWorld: () => {
		set((prev) => {
			setLocalStorage('cubes', prev.cubes)
      setLocalStorage('texture', prev.texture)
		})
	},
  resetWorld: () => {
    set(() => ({
			cubes: []
		}))
  },
}))












