# JavaScript Color Tool

A simple tool for lightening or darkening hex color values with live preview.

## Overview

This tool allows users to input a hex color and adjust its lightness or darkness using a slider. It provides real-time visual feedback showing both the original color and the modified result.

## Features

- Convert hex color codes to lighter or darker shades
- Real-time color preview
- Toggle between lightening and darkening modes
- Adjustable intensity slider (0-100%)
- Input validation for proper hex color format
- Clean, responsive user interface

## Usage

1. Enter a valid hex color code (e.g., `#FF5733` or `#abc`)
2. Choose between lightening or darkening using the toggle
3. Adjust the intensity with the slider
4. View the result in real time

## Technical Implementation

The tool uses vanilla JavaScript with the following functionality:
- Hex to RGB and RGB to Hex color conversion
- Input validation with error handling
- DOM manipulation for live updates
- Event-driven user interface

## Input Validation

The tool validates color inputs to ensure:
- Input is not empty
- Input includes a "#" symbol
- Color value length is either 3 or 6 characters (not including the #)
- Only valid hex characters (0-9, A-F) are used

## How It Works

1. The input hex color is converted to RGB
2. Based on the selected mode, a factor is applied to each RGB component
3. The modified RGB values are converted back to hex
4. The UI is updated to display both original and modified colors

## Installation

No installation required. Clone the repository and open `index.html` in your browser:

```bash
git clone https://github.com/voigterik/javascript-color-tool.git
cd javascript-color-tool
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.