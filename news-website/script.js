const apiKey = "7adf0b230ecf4ff1badcd2dac3385dac";
const searchBtn = document.getElementById('search-btn');
const queryInput = document.getElementById('query');
const newsContainer = document.getElementById('news-container');
const errorDiv = document.getElementById('error');
searchBtn.addEventListener('click', async () => {
    const query = queryInput.value.trim();
    if (!query) return;
    newsContainer.innerHTML = '';
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
    try {
        const res = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&pageSize=10`);
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        if (!data.articles.length) throw new Error("No news found");
        data.articles.forEach(article => {
            const div = document.createElement("div");
            div.className = "news";
            div.innerHTML = `
            <h3>${article.title} </h3>
            ${article.urlToImage ? `<img src="${article.urlToImage}" alt="News Image">` : ''}
            <p>${article.description || "No description available."} </p>
            <a href="${article.url}" target="_blank">Read more</a>
            `;
            newsContainer.appendChild(div);
        });
        queryInput.value = '';
    } catch (err) {
        errorDiv.textContent = err.message;
        errorDiv.classList.remove('hidden');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});