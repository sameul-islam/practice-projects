const images = [
    "img88.jpg",
    "img89.jpg",
    "img90.jpg",
    "img91.jpg"
];
let currentIndex = 0;
const sliderImg = document.getElementById('slider-image');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
function updateImage() {
    sliderImg.src = images[currentIndex];
}
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
});
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
});
setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}, 5000);

document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") nextBtn.click();
    if(e.key === "ArrowLeft") prevBtn.click();
});