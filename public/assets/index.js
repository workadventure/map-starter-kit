// Function to retrieve the list of maps from the API
async function getMapsList() {
    try {
        const response = await fetch('/maps/list');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const maps = await response.json();
        return maps;
    } catch (error) {
        console.error('Error fetching maps list:', error);
        return [];
    }
}

// Function to get the list
async function getImagesList() {
    try {
        const response = await fetch('/images/list');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const images = await response.json();
        return images;
    } catch (error) {
        console.error('Error fetching images list:', error);
        return [];
    }
}

// Function to create a background image fade for "bg" element
async function createBackgroundImageFade(images = null) {
    // Get the list of images
    if (images === null) {
        const maps = await getMapsList();
        images = maps.map(map => {
            if (map.mapImage) {
                return map.mapImage.startsWith('http') ? map.mapImage : `/${map.mapImage}`;
            }
            return null;
        }).filter(img => img !== null);
        if (images.length === 0) {
            return;
        }
    }

    // Get the "bg" element
    const bgElement = document.querySelector('.bg');
    if (!bgElement || images.length === 0) return;

    // Create divs for each image with fade animation
    bgElement.innerHTML = '';
    images.forEach((imageUrl, index) => {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'bg-image' + (index === 0 ? ' active' : '');
        imgDiv.style.backgroundImage = `url('${imageUrl}')`;
        bgElement.appendChild(imgDiv);
    });

    // Automatic fade between images
    let currentIndex = 0;
    setInterval(() => {
        const imageElements = bgElement.querySelectorAll('.bg-image');
        if (imageElements.length === 0) return;

        // Remove the active class from the current image
        imageElements[currentIndex].classList.remove('active');

        // Move to the next image
        currentIndex = (currentIndex + 1) % imageElements.length;

        // Add the active class to the new image
        imageElements[currentIndex].classList.add('active');
    }, 5000); // Change image every 5 seconds
}

// Exporter la fonction pour qu'elle soit accessible depuis index.html
// Use a global declaration for TypeScript/JavaScript
window.getMapsList = getMapsList;
window.createBackgroundImageFade = createBackgroundImageFade;
