const searchInput = document.getElementById('search');
const resultList = document.getElementById("results");
let users = [];

async function loadUsers() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error("Failed to load users");
        users = await res.json();
    } catch (err) {
        console.error(err);
        resultList.innerHTML = "<li style='color:red;'>Failed to load users.</li>";
    }
}
function showResults(filteredUsers) {
    resultList.innerHTML = '';
    if (filteredUsers.length === 0) {
        resultList.innerHTML = "<li>No users found.</li>";
        return;
    }
    filteredUsers.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} => (${user.email})`;
        resultList.appendChild(li);                       
    });
}
searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();
    const filtered = users.filter(user => 
        user.name.toLowerCase().includes(searchText)
    );
    showResults(filtered);
});
loadUsers();