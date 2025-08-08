const postList = document.getElementById("post-list");
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let currentPage = 1;
const limit = 15;
const totalPosts = 100;
const totalPages = Math.ceil(totalPosts / limit);

async function fetchPosts(page) {
    try {
    const start = (page - 1) * limit;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`);
    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    return data;
    } catch (err) {
        console.error(err);
        postList.innerHTML = '<li style="color:red;">Error loading posts.</li>'
    }
}
async function showPosts(pages, direction){
    const outClass = direction === 'next'? "animate-slide-out-left" : "animate-slide-out-right";
    const inClass = direction === 'next'? "animate-slide-in-right" : "animate-slide-in-left";
    postList.classList.remove("animate-slide-in-left", "animate-slide-in-right","animate-slide-out-left", "animate-slide-out-right");
    postList.classList.add(outClass);
    await new Promise(resolve => setTimeout(resolve, 500));
    const posts = await fetchPosts(pages);
    postList.classList.remove(outClass);
    postList.innerHTML = '';
    if (!posts) return;
    posts.forEach(post => {
        const li = document.createElement('li');
        li.textContent = `${post.id} => ${post.title}`;
        postList.appendChild(li);
    });
    postList.classList.add(inClass);
    currentPage = pages;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        showPosts(currentPage - 1, 'prev');
    }
});
nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
        showPosts(currentPage + 1, 'next');
    }
});
showPosts(currentPage);