const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photoArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const count = 10;

// Unsplash API =================================
const apiKey = `YQJxm1LCZ3etiTLV2GJGYJHSQfQifZy3XhGsmkKYbas`;
const unsplashAPI = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images are load
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}
// Helper function to set attributes in DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links and Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photoArray.length;
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
    // Event Listener, checks when each is finished loading
    img.addEventListener("load", imageLoaded);

    // Put the image inside anchor, then put both inside image container element
    item.appendChild(img);
    imageContainer.appendChild(item);
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

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On load get photos
getPhotos();
