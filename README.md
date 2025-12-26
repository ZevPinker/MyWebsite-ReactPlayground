# React Playground

A collection of interactive React experiments featuring SVG manipulation and physics simulations.

## Experiments

**Circle Builder** — Click the STOP button to spawn draggable circles. Drag them around the canvas to arrange them however you like.

**Gravity Game** — A simple platformer where you control a ball with arrow keys. Jump between platforms and bounce off the ground.

## Getting Started

```bash
npm install
npm run dev
```

This opens the app in your browser. Navigate between experiments using the hub page.

## Project Structure

```
src/
├── components/
│   ├── Draggable.jsx      # Reusable drag wrappers for DOM and SVG
│   ├── CircleBuilder.jsx  # Circle spawning game
│   └── GravityGame.jsx    # Platformer with physics
├── hooks/
│   └── useDraggable.js    # Drag-and-drop state logic
├── main.jsx               # Circle Builder entry
├── gravity.jsx            # Gravity Game entry
├── hub.jsx                # Navigation hub entry
└── styles.css
```

## Controls

**Gravity Game:**
- ← → Arrow keys to move
- ↑ Arrow key to jump

## Built With

- React 18
- Parcel