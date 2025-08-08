const titleInput = document.getElementById('movie-title');
const ratingInput = document.getElementById('movie-rating');
const reviewInput = document.getElementById('movie-review');
const submitBtn = document.getElementById('submit-btn');
const reviewList = document.getElementById('review-list');

let reviews = JSON.parse(localStorage.getItem("movieReviews")) || [];
function renderReviews () {
    reviewList.innerHTML = '';
    reviews.forEach((review, index) => {
        const div = document.createElement('div');
        div.className = "review";
        div.innerHTML = `
        <h3>${review.title}</h3>
        <div class="rating">
        ${'<i class="fa fa-star" style="color: gold;"></i>'.repeat(review.rating)}
        ${'<i class="fa fa-star" style="color: #ccc;"></i>'.repeat(5 - review.rating)}
        </div>
        <p>${review.text}</p>
        <button onclick="deleteReview(${index})">Delete</button>
        `;
        reviewList.appendChild(div);
    });
}

const stars = document.querySelectorAll('.star-rating .fa-star');
const ratingInputHidden = document.getElementById('movie-rating');
stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-rating'));
        ratingInputHidden.value = rating;
        updateStars(rating);
    });
});
function updateStars(rating) {
    stars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        if (starRating <= rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

submitBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const rating = parseInt(ratingInput.value);
    const text = reviewInput.value.trim();
    if (!title || !rating || !text || rating < 1 || rating > 5) {
        alert("Please enter valid title, rating (1 - 5), and review.");
        return;
    }
    reviews.push({title,rating,text});
    localStorage.setItem("movieReviews", JSON.stringify(reviews));
    titleInput.value = '';
    ratingInput.value = '';
    reviewInput.value = '';
    renderReviews();
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        submitBtn.click();
    }
});

function deleteReview(index) {
    if(confirm('Are you sure you want to delete this review?')) {
        reviews.splice(index, 1);
        localStorage.setItem("movieReviews", JSON.stringify(reviews));
        renderReviews();
    }
}
renderReviews();
