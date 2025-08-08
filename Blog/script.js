const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const addBtn = document.getElementById('add-btn');
const blogList = document.getElementById('blog-list');

let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

function renderBlogs () {
    blogList.innerHTML = '';
    blogs.forEach((blog, index) => {
        const div = document.createElement('div');
        div.className = 'blog';
        div.innerHTML = `
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>
        <button onclick="deleteBlog(${index})">Delete</button>
        `;
        blogList.appendChild(div);
    });
}

addBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (!title || !content) {
        alert("Please fill out both fields.");
        return;
    }
    const newBlog = {title, content};
    blogs.push(newBlog);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    titleInput.value = '';
    contentInput.value = '';
    renderBlogs();
});

document.addEventListener('keypress', (e) =>{
    if (e.key === "Enter") {
        addBtn.click();
    }
});

function deleteBlog (index) {
    if (confirm("Are you sure you want to delete this post?")) {
        blogs.splice(index, 1);
        localStorage.setItem("blogs",JSON.stringify(blogs));
        renderBlogs();
    }
}
renderBlogs();