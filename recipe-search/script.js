const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const resultDiv = document.getElementById('result');

searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (!query) {
        resultDiv.innerHTML = "<p style='font-size:19px;'>Please enter a food name.</p>";
        return;
    }
    resultDiv.innerHTML = '<p style="color:green; font-size:19px;">Searching...</p>';
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await res.json();
        resultDiv.innerHTML = '';
        if (!data.meals) {
            resultDiv.innerHTML = "<p style='color: red; font-size:18px;'>No recipe found.</p>";
            return;

        }
        data.meals.forEach(meal => {
        resultDiv.innerHTML += `
        <div class="meal">
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p><strong>Category:</strong>${meal.strCategory}</p>
        <p><strong>Area:</strong>${meal.strArea}</p>
        <p><strong>Instructions:</strong>${meal.strInstructions.slice(0, 350)}...</p>
        <a href="${meal.strYoutube}" target="_blank">Watch on YouTube</a>
        </div>
        `;
         });
        searchInput.value = '';
    } catch (error) {
        resultDiv.innerHTML = `<p style="color:red;">Error: ${error.message} </p>`;
    }
   
});
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});