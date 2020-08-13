const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photoArray = [];

const count = 10;
const apiKey = `YQJxm1LCZ3etiTLV2GJGYJHSQfQifZy3XhGsmkKYbas`;
const unsplashAPI = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Helper function to set attributes in DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Create Elements for Links and Photos, Add to DOM
function displayPhotos() {
  // Runs function for each of the element in the object
  photoArray.forEach((photo) => {
    // Create <a> tag to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create <img /> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Put the image inside anchor, then put both inside image container element
    item.appendChild(img);
    imageContainer.appendChild(item);
    console.log(item);
  });
}

// GET photos from unsplash
async function getPhotos() {
  try {
    const response = await fetch(unsplashAPI);
    photoArray = await response.json();
    displayPhotos();
  } catch (err) {
    console.log(err);
  }
}

// On load get photos
getPhotos();
