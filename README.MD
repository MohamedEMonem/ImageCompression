# Image Compression Tool

A simple web application that allows users to upload an image, compress it using different compression ratios (25%, 50%, and 75%), and choose the best compressed image to download. This tool provides an easy way to compare the original and compressed images before downloading the preferred version.

## Features

- Upload one or more images.
- Check the image size before compressing.
- Compress the images to 3 different compression ratios.
- Preview the images in a gallery for comparison.
- Download the selected compressed image.

## Prerequisites

Before serving the project, ensure you have the following installed:

- A web browser (e.g., Chrome, Firefox).
- A local server environment to serve static files (e.g., [Live Server extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)) or a simple HTTP server.

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/MohamedEMonem/ImageCompression.git
```

### 2. Navigate to the project directory:

```bash
cd ImageCompression
```

### 3. Ensure the project files are in place:
The project consists of:
- `index.html` – The main HTML file.
- `styles.css` – The CSS file for styling the page.
- `app.js` – The JavaScript file for handling the logic of image upload, compression, and download.

## Running the Project Locally

### live Demo for fast access

1. with the following link you can acces the project [live Demo](https://mohamedemonem.github.io/ImageCompression/)

### Using Live Server (VS Code extension):
1. Open the project folder in [VS Code](https://code.visualstudio.com/).
2. Install the **Live Server** extension (if not installed already).
3. Right-click on the `index.html` file and select **Open with Live Server**.
4. Your project will open in your default web browser and will auto-refresh as you make changes.

### Using Python's Simple HTTP Server:

If you have Python installed, you can serve the project using Python’s built-in HTTP server.

1. Navigate to the project folder in your terminal/command prompt.
2. Run the following command:

For Python 3:

```bash
python -m http.server
```

For Python 2:

```bash
python -m SimpleHTTPServer
```

3. Open your web browser and go to `http://localhost:[yourportnumber]`. The project will be accessible there.

## How to Use

1. **Upload Images**:
   - Click the "Upload Images" button and select your image files. You can also drag and drop images into the designated area.
   
2. **Compress Images**:
   - Once the images are uploaded, click the "Compress Images" button to compress them into 3 different ratios (25%, 50%, 75%).
   
3. **Compare Images**:
   - The images will be displayed side by side for comparison.
   - Hover over the images for a zoom effect and to highlight the selected image.
   
4. **Download the Selected Image**:
   - After selecting the desired image, click the "Download Selected Image" button to save it to your machine.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, create a new branch, and submit a pull request with your improvements or fixes.

## License

This project is open-source and available under the [MIT License](LICENSE).
```

### Explanation of Sections:

1. **Project Overview**: Provides a brief explanation of the project and its features.
2. **Prerequisites**: Lists what is needed to run the project.
3. **Installation**: Explains how to clone the repository and install the project locally.
4. **Running Locally**: Provides two options for running the project locally:
   - Using **VS Code's Live Server** extension.
   - Using **Python's built-in HTTP server**.
5. **How to Use**: Step-by-step instructions for using the tool to upload, compress, compare, and download images.
6. **Contributing**: Explains how others can contribute to the project.
7. **License**: Provides information about the open-source license.

### To-Do:

- Replace the **GitHub repository URL** (`https://github.com/your-username/image-compression-tool.git`) with your actual URL if you host the project on GitHub.
- If you use a specific license (e.g., MIT), include the `LICENSE` file in your project folder.

This README provides all the basic instructions to set up and serve your project. Let me know if you need further modifications!