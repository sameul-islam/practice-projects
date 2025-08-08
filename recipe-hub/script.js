const searchBtn = document.getElementById('search-btn');
const favBtn = document.getElementById('fav-btn');
const cardsDiv = document.getElementById('cards');
const msg = document.getElementById('msg');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const ingList = document.getElementById('ingredients');
const instr = document.getElementById('instructions');
const saveBtn = document.getElementById('save-btn');
const searchInput = document.getElementById('search-input');

let currentMeal = null;
let favorites = JSON.parse(localStorage.getItem('favs')) || [];

const setMsg = (text, error = false) => {
    msg.textContent = text;
    msg.style.color = error? 'red' : 'green';
};

const drawCards = meals => {
    cardsDiv.innerHTML = '';
    meals.forEach( meal => {
        const card = document.createElement('div');
        card.className = "card";
        card.innerHTML = `
        <img src="${meal.strMealThumb}" alt=""><h3>${meal.strMeal}</h3>
        `;
        card.addEventListener('click', () => openModal(meal));
        cardsDiv.appendChild(card);
    });
};
const openModal = meal => {
    currentMeal = meal;
    modalImg.src = meal.strMealThumb;
    modalTitle.textContent = meal.strMeal;
    ingList.innerHTML = '';
    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const qty = meal[`strMeasure${i}`];
        if (ing && ing.trim() !== '') {
            const li = document.createElement('li');
            li.textContent = `${ing} - ${qty}`;
            ingList.appendChild(li);
        }
    }
    instr.textContent = meal.strInstructions;
    saveBtn.textContent = favorites.some(f => f.idMeal === meal.idMeal)? 'Saved' : 'Save';
    saveBtn.classList.toggle('saved', favorites.some( f => f.idMeal === meal.idMeal));
    modal.classList.remove('hidden');
};
const closeModalFn = () => modal.classList.add('hidden');

async function searchMeals(q) {
    setMsg('Loading...');
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`);
        const data = await res.json();
        if (!data.meals) {
            setMsg('No recipe found!',true); 
            return;
        }
        setMsg('');
        drawCards(data.meals);
        searchInput.value = '';
    } catch (err) {
        setMsg('Error fetching data', true);
    }
}

const showFavs = () => {
    if (!favorites.length) {
        setMsg('No favorites yet');
        cardsDiv.innerHTML = '';
        return;
    }
    setMsg('');
    drawCards(favorites);
};
saveBtn.addEventListener('click', () => {
    if (!currentMeal) return;
    const exists = favorites.some(f => f.idMeal === currentMeal.idMeal);
    if (exists) {
        favorites = favorites.filter(f => f.idMeal !== currentMeal.idMeal);
    } else {
        favorites.push(currentMeal);
    }
    localStorage.setItem('favs', JSON.stringify(favorites));
    saveBtn.textContent = exists? 'Save' : "Saved";
    saveBtn.classList.toggle('saved', !exists);
});

searchBtn.addEventListener('click', () => {
    const inputBox = searchInput.value.trim();
    if (inputBox) searchMeals(inputBox);
});
favBtn.addEventListener('click', showFavs);
closeModal.addEventListener('click', closeModalFn);
window.addEventListener('click', e => {
    if (e.target === modal) {
        closeModalFn();
    }
});

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});
