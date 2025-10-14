function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

window.onpageshow = function(e) {
  if (e.persisted) {
    window.location.reload()
  };
};

function init(){
  redirect()
  userconfig()
  loadBooks()
}

function clickbook(id) {
  fetch("../server/getfront.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id)
  })
  .then(res => res.json())
  .then(data => {
    if(data.status === "ok") {

    const span = document.createElement('span');
    span.id = 'bookspan';
    span.addEventListener('click', () => closeBookModal());

    const div = document.createElement('div');
    div.id = 'bookdiv';
    div.addEventListener('click', e => e.stopPropagation());

    // === BADGE DEL GÉNERO ===
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = data.gender;

    // === NOMBRE DEL LIBRO ===
    const nombre = document.createElement('h2');
    nombre.textContent = data.name;

    // === CONTENIDO (IMAGEN + BOTONES) ===
    const content = document.createElement('div');
    content.className = 'book-content';

    const img = document.createElement('img');
    img.src = data.url;

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

    } else {
      alert("Error: " + data.message);
      //const span = document.createElement("span")
      //span.textContent = data.message;
      //document.body.appendChild(span);
    }
  })
  .catch(err => console.error("Error en fetch:", err));
}
function selectfilter(){
  let count
  fetch('../server/delete.php')
  .then(response => response.json())
  .then(data => {
      count = data.count
  })
  .catch(err => alert("Error: " + err));

  let libros
  const select = document.getElementById("genero")
  if(select.value = "Todos los generos")
    libros = document.querySelector(".bookstorage")
  /*else
    for(i=0; i<count; i++){
      libros.
      if(button.data != select.value){
        button
      }
    }*/
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

function userconfig(){
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

function verCarrito() {
    const modal = document.getElementById('carritoModal');
    const content = modal.querySelector('.carrito-content');
    content.innerHTML = '';

    // Simulación de libros en carrito (puedes reemplazarlo con fetch de tu DB)
    const carrito = [
        {nombre: "Minecraft", estado: "comprado", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoADxMkbl8qh15FHha80LiFcfD9KHialDciA&s"},
        {nombre: "Harry Potter", estado: "alquilado", imagen: "https://via.placeholder.com/150x200?text=Harry+Potter"}
    ];

   carrito.forEach(libro => {
    const card = document.createElement('div');
    card.classList.add('carrito-card');

    // NOMBRE ARRIBA
    const title = document.createElement('p');
    title.innerText = libro.nombre;
    title.classList.add('carrito-title'); // clase para estilo
    card.appendChild(title);

    // IMAGEN EN MEDIO
    const img = document.createElement('img');
    img.src = libro.imagen;
    card.appendChild(img);

    // INSIGNIA ABAJO
    const badge = document.createElement('div');
    badge.classList.add('badge-status');
    badge.classList.add(libro.estado === 'comprado' ? 'badge-comprado' : 'badge-alquilado');
    badge.innerText = libro.estado === 'comprado' ? 'Comprado' : 'Alquilado';
    badge.classList.add('badge-bottom'); // clase para estilo
    card.appendChild(badge);

    content.appendChild(card);
});

    modal.style.display = 'flex';
}

function cerrarCarrito() {
    document.getElementById('carritoModal').style.display = 'none';
}
// ==================================================================
// ================== Portadas de los libros ========================
// ==================================================================

function loadBooks() {
  fetch('../server/fronts.php')
  .then(response => response.json())
  .then(data => {
    for(i=0; i<data.count; i++){

      const button = document.createElement("button")
      button.setAttribute("onclick", `clickbook(${data.id[i]})`);
      button.className = "bookcontainer"
      button.dataset = data.gender[i]

      const img = document.createElement("img")
      img.className = "indbook"
      img.src = data.url[i]

      const p = document.createElement("p")
      p.className = "indtitle"
      p.textContent = `${data.name[i]}`

      const title = data.name[i];
      const words = title.split(" ");
      let longestWord = 0;

      for (const word of words)
        if (word.length > longestWord) longestWord = word.length;

      if (title.length <= 10 && longestWord <= 6)
        p.style.fontSize = "40px";
      else if (title.length <= 20 && longestWord <= 10)
        p.style.fontSize = "28px";
      else if (title.length <= 30 || longestWord > 10) 
        p.style.fontSize = "34px";
      else 
        p.style.fontSize = "27px";

      const container = document.querySelector(".bookstorage")
      button.appendChild(img)
      button.appendChild(p)
      container.appendChild(button)
    }
  })
  .catch(error => {
    console.error('Error al hacer fetch:', error);
  });

}
