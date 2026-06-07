const wordList = [
    ['faith', 10],
    ['faith', 10],
    ['faith', 10],
    ['faith', 10],
    ['faith', 10],
    ['faith', 10],
    ['faith', 10],
    ['faith', 10],
    ['faith', 10],
    ['faith', 10],
    ['faith', 10],
]

const maskImage = new Image()
maskImage.src = "../assets/flower_mask.png"

maskImage.onload = function() {
    const canvas = document.getElementById('word-cloud-canvas');
    
    // Create an off-screen canvas to capture image pixel data for the shape
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;
    const ctx = maskCanvas.getContext('2d');
    
    // Draw image onto the temporary canvas
    ctx.drawImage(maskImage, 0, 0, canvas.width, canvas.height);
    
    // Run WordCloud2 configuration engine
    WordCloud(canvas, {
        list: wordList,
        gridSize: 8,                  // Spacing between words
        weightFactor: 3,              // Scales text size up or down
        fontFamily: 'Arial, sans-serif',
        color: 'random-dark',         // Applies random dark colors to words
        backgroundColor: '#ffffff',   // White background matches outside canvas boundary
        clearCanvas: true,
        
        // Pass the offscreen canvas to map text placement inside the mask boundaries
        figPath: maskCanvas           
    });
};