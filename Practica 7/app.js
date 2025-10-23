// app.js
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

const INSTALL_AREA = document.getElementById('install-area');
const INSTALL_BTN = document.getElementById('install-btn');

let todos = JSON.parse(localStorage.getItem('pwa-todos') || '[]');

function render() {
  list.innerHTML = '';
  for (const t of todos) {
    const li = document.createElement('li');
    const left = document.createElement('div');
    left.className = 'left';
    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = t.text;
    left.appendChild(span);
    li.appendChild(left);

    const remove = document.createElement('button');
    remove.className = 'remove-btn';
    remove.textContent = 'Eliminar';
    remove.onclick = () => {
      todos = todos.filter(x => x.id !== t.id);
      saveAndRender();
    };
    li.appendChild(remove);
    list.appendChild(li);
  }
}

function saveAndRender() {
  localStorage.setItem('pwa-todos', JSON.stringify(todos));
  render();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  const item = { id: Date.now(), text };
  todos.unshift(item);
  input.value = '';
  saveAndRender();
});

saveAndRender();

let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  INSTALL_AREA.hidden = false;
});

INSTALL_BTN.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;
  if (choice.outcome === 'accepted') {
    console.log('Usuario instaló la app');
  } else {
    console.log('Usuario rechazó la instalación');
  }
  deferredPrompt = null;
  INSTALL_AREA.hidden = true;
});
