function clickbook(nombreLibro, generoLibro, imagenLibro) {
    const span = document.createElement('span');
    span.id = 'bookspan';
    span.addEventListener('click', () => closeBookModal());

    const div = document.createElement('div');
    div.id = 'bookdiv';
    div.addEventListener('click', e => e.stopPropagation());

    // === BADGE DEL GÉNERO ===
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = generoLibro || 'Sin género';

    // === NOMBRE DEL LIBRO ===
    const nombre = document.createElement('h2');
    nombre.textContent = nombreLibro || 'Libro sin nombre';

    // === CONTENIDO (IMAGEN + BOTONES) ===
    const content = document.createElement('div');
    content.className = 'book-content';

    const img = document.createElement('img');
    img.src = imagenLibro || 'https://via.placeholder.com/150';
    img.alt = nombreLibro;

    // === BOTONES ===
    const btnContainer = document.createElement('div');
    btnContainer.className = 'button-container';

    const comprarBtn = document.createElement('button');
    comprarBtn.className = 'comprar';
    comprarBtn.textContent = 'Comprar';
    comprarBtn.onclick = () => alert(`Has comprado ${nombreLibro}!`);

    const alquilarBtn = document.createElement('button');
    alquilarBtn.className = 'alquilar';
    alquilarBtn.textContent = 'Alquilar';
    alquilarBtn.onclick = () => alert(`Has alquilado ${nombreLibro}!`);

    btnContainer.appendChild(comprarBtn);
    btnContainer.appendChild(alquilarBtn);

    content.appendChild(img);
    content.appendChild(btnContainer);

    div.appendChild(badge);
    div.appendChild(nombre);
    div.appendChild(content);

    span.appendChild(div);
    document.body.appendChild(span);

    // Animación de entrada
    div.style.animation = 'moveleft 0.5s ease-out forwards';
}

function closeBookModal() {
    const div = document.getElementById('bookdiv');
    if (!div) return;
    div.style.animation = 'moveright 0.3s ease-out forwards';
    const span = document.getElementById('bookspan');
    span.style.animation = 'disapear 0.3s ease-out forwards';
    setTimeout(() => {
        if (span) span.remove();
    }, 300);
}


function register(event){
  event.preventDefault();
  const info = {
    password: document.getElementById('password').value,
    user: document.getElementById('user').value
  }
  fetch("../server/high.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    if(data.status === "ok") {
      window.location.href = "../php/index.html";
      alert("Usuario registrado correctamente");
    } else {
      alert("Error: " + data.message);
    }
  })
  .catch(err => console.error("Error en fetch:", err));
}
function login(event){
  event.preventDefault();
  const info = {
    password: document.getElementById('password').value,
    user: document.getElementById('user').value
  }
  fetch("../server/login.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    if(data.status === "ok") {
      window.location.href = "../php/menu.html";
      document.cookie = `user=${info.user}; password=${info.password}; path=/; max-age=3600`; // 1 hora
      alert("Iniciaste sesion correctamente");
    } else {
      alert("Error: " + data.message);
    }
  })
  .catch(err => console.error("Error en fetch:", err));

}
function removeCookie(name) {
  document.cookie = `${name}=; path=/; max-age=0;`;
}
function logout(){
  removeCookie("user")
  removeCookie("password")
  window.location.href = "../php/index.html";
}
function redirect(){
  const user = document.cookie
  .split('; ')
  .find(row => row.startsWith('user='))
  ?.split('=')[1];
  if (!user)
    window.location.href = "../php/index.html";
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function userconfig(){
  redirect()
  
  const user = getCookie("user");
  document.querySelector(".username").textContent = `${user}`;

  const userBtn = document.getElementById('userBtn');
  const dropdown = document.getElementById('dropdownMenu');

  userBtn.addEventListener('click', () => {
    const isExpanded = dropdown.style.display === 'block';
    dropdown.style.display = isExpanded ? 'none' : 'block';
    userBtn.setAttribute('aria-expanded', !isExpanded);
  });

  document.addEventListener('click', (e) => {
  if (!userBtn.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = 'none';
    userBtn.setAttribute('aria-expanded', false);
  }
  });
}

// Muestra el contenedor gris de confirmación
function showDeleteConfirm() {
    document.getElementById('deleteConfirm').style.display = 'flex';
}

// Cierra el modal
function closeConfirm() {
    document.getElementById('deleteConfirm').style.display = 'none';
}

// Ejecuta la eliminación
function confirmDelete() {
    fetch('../server/delete.php', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message.includes("correctamente")) {
            // Redirigir al login o inicio
            window.location.href = "../php/index.html";
        }
    })
    .catch(err => alert("Error: " + err));
}
