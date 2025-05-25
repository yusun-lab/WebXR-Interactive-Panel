# WebXR Canvas Panel

An interactive WebXR application featuring a canvas panel that responds to VR controller interactions. Built with Three.js and Vite.

## Features

- Interactive VR canvas panel with dynamic content
- VR controller support with ray-based interaction
- Real-time visual feedback for user interactions
- Responsive design with proper VR scaling
- Modular component architecture

## Technical Stack

- Three.js for 3D rendering
- WebXR API for VR support
- Vite for development and building
- Modern JavaScript (ES6+)

## Project Structure

```
project/
├── index.html              # Main HTML entry point
├── src/
│   ├── App.js             # Main application entry
│   └── components/        # Modular components
│       ├── controllers/   # VR controller management
│       ├── lighting/      # Scene lighting
│       └── panel/         # Canvas panel
├── vite.config.js         # Vite configuration
└── package.json           # Project dependencies
```

## Getting Started

1. **Installation**
   ```bash
   npm install
   ```

2. **Development**
   ```bash
   npm run dev
   ```

3. **Build**
   ```bash
   npm run build
   ```

## Usage

1. Open the application in a WebXR-compatible browser
2. Click the VR button to enter VR mode
3. Use VR controllers to interact with the canvas panel:
   - Hover over the panel to see visual feedback
   - Press controller buttons to interact
   - Ray lines change color based on interaction state

## Browser Support

- Chrome for Android (with WebXR support)
- Oculus Browser
- Firefox Reality
- Other WebXR-compatible browsers

## VR Device Support

- Oculus Quest/Quest 2
- HTC Vive
- Valve Index
- Other WebXR-compatible VR devices

## Development Notes

- The application uses a component-based architecture for better maintainability
- Each component is responsible for a specific aspect of the application
- The canvas panel is dynamically updated based on user interactions
- Controller interactions are managed through the ControllerManager component

## License

[Your chosen license]

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 