# imageparticleeffect

A React component that applies a particle effect to an image.

## Installation

You can install the package using npm:

```shell
npm install imageparticleeffect
```

## Usage

Import the `ImageParticleEffect` component and use it in your React application:

```jsx
import React from "react";
import ImageParticleEffect from "imageparticleeffect";

function App() {
  return (
    <div>
      <ImageParticleEffect
        picture={yourImageHere}
        width={800}
        height={600}
        repelSpeed={10}
        repelRadius={100}
        reJoinSpeed={5}
        density={50}
      />
    </div>
  );
}

export default App;
```

## Props

The `ImageParticleEffect` component accepts the following props:

- `picture` (any): The image to apply the particle effect to.
- `width` (number): The width of the canvas for the image.
- `height` (number): The height of the canvas for the image.
- `repelSpeed` (number): The speed at which particles repel away from the mouse.
- `repelRadius` (number): The distance at which particles repel away from the mouse.
- `reJoinSpeed` (number): The speed at which particles come back to their original position.
- `density` (number): The density of particles with each other.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Ajil Jagadeesh

- GitHub: [ajiljagadeesh07](https://github.com/ajiljagadeesh07)
