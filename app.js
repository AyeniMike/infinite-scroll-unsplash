const count = 10;
const apiKey = `YQJxm1LCZ3etiTLV2GJGYJHSQfQifZy3XhGsmkKYbas`;
const unsplashAPI = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// GET photos from unsplash

async function getPhotos() {
  try {
    const response = await fetch(unsplashAPI);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

// On load get photos
getPhotos();
