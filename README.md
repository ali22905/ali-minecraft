# what is ali-mincraft game

It is a game made by [Ali Attia](https://portfolio-two-liart-63.vercel.app/) that are like minecraft. This website is made by React and threeJs
**_NOTE:_** this game is only available on desktop devices, and it will be available on mobile devices soon



# How to play ali-mincraft

first of all click on the screen to enter the game.
You can put blocks by clicking on the floor or clicking on the edge of another block (this will place a block next to the edge you clicked at).

Also, you don't have only this type of block. You have 5 types of blocks that can be accessed by clicking any number between 1 and 5.

Once you finish editing you can save your changes by clicking on the "save" button on the top left corner of the screen.

And for sure I will not leave you with this mess, so you can choose either deleting one block by clicking holding "Ctrl" and clicking on the 
block that you would like to delete or you can reset your world by clicking on the "reset" button in the top left corner of the screen

Finally, After having all that fun you can exit the game by clicking "Esc"



## Installation
To set up the project on your local machine, follow these steps:
1. Open the console and run the following command: `npm install`
2. To run the application, type: `npm run`



## Technologies Used
- JavaScript
- React
- Material-UI (Mui)
- threeJS
- zustand



## Code Example
Here's an example code snippet from the ground.js file in the src/components folder:

```javascript
function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI/2, 0, 0],
    position: [0, -0.5, 0]
  }))
  const [addCube] = useStore((state) => [state.addCube])
  groundTexture.wrapS = RepeatWrapping
  groundTexture.wrapT = RepeatWrapping
  groundTexture.repeat.set(100, 100)
  return (
    <mesh 
    ref={ref} 
    onClick={(e) => {
      e.stopPropagation()
			const [x, y, z] = Object.values(e.point).map(val => Math.ceil(val));
      addCube(x, y, z)
    }}
    >
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshStandardMaterial attach='material' map={groundTexture} />
    </mesh>
  )
}
```



## Contact Information
- Name: Ali Attia
- Email: aly2292005@gmail.com
- Phone Number: +201027393406