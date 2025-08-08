const noteInput = document.getElementById('note-input');
const addNoteBtn = document.getElementById('add-note-btn');
const notesContainer = document.getElementById('notes-container');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function renderNotes() {
    notesContainer.innerHTML = "";
    notes.forEach((note,index) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.textContent = note;
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener('click', () => {
            notes.splice(index, 1);
            saveNotes();
            renderNotes();
        });
        noteDiv.appendChild(deleteBtn);
        notesContainer.appendChild(noteDiv);
    });
}
addNoteBtn.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if (!noteText) {
        alert("Please write something to add a note.");
        return;
    }
    notes.push(noteText);
    saveNotes();
    renderNotes();
    noteInput.value = '';
});
renderNotes();

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

document.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        addNoteBtn.click();
    }
});