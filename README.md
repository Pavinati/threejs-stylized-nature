# ThreeJS Journey Challenge #24 - Stylized Nature

This project is my entry in the [ThreeJS Joruney 24th challenge](https://threejs-journey.com/challenges/024-stylized-nature).

The idea was to build a small landscape of hexagonal tiles, like in the popular "Settlers of Catan" game.

You can find a running demo hosted in GitHub pages: https://pavinati.github.io/threejs-stylized-nature/

## Features

- No imported models or textures. Everything is created by standard components or computed dynamically.
  - This adds additional stress on the hardware, but I wanted this to be a coding challenge more than an editing one.
- Hex grids and coordinates implemented in pure TypeScript.
- Objects are positioned pseudo randomly with a seed.
  - The tile seed is saved together with the layout so refreshing the page regenerates the same identical tiles.
- 3D tiles rendered as texture in the tile selection box. Renders once and then saved into an FBO.
- By default it saves the board on localStorage, but can also save and load from file.

## Known issues

Due to effort and time limitation there are aspects of this projects that would require fixing.
Maybe in the future i'll come back to this and improve them.

- Performances when rendering 20+ tiles (partially due to the component structure).
- Shadow camera has fixed size and does not adapt to the board size.

## Stack

- React as main rendering framwork.
- ThreeJS (through R3F) for 3D rendering.
- Drei for helpers and common components.
- React spring for component animations.
- Prando as pseudo random number generator.
- Vite as bundler.

## Credits

Huge shoutout to the creators of https://www.redblobgames.com/grids/hexagons/
That was a good source for learning the math behind hex grid coordinates

Bruno Simon as the community behind [ThreeJS Journey](https://threejs-journey.com/) for inspiration
and encouragement for taking part into those challenges.
