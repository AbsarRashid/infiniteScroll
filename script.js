const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Splash api
let count = 5;
const apiKey = "Dq2z4GBYAI4U19VVRTmE6d5YbnRpoJLysSp7TKkCVAs";
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Check if all images loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    count = 30;
    loader.hidden = true;
  }
}
//Helper function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    //Create a tag
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //Create img tag
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //Event Listener, check when each img is finished loading
    img.addEventListener("load", imageLoaded);
    //Put img in a and put inside image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Get Photos from api

async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();

    console.log(photosArray);
  } catch (err) {}
}
//Check if scrolling newar bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    ready = false;
  }
});

getPhotos();
