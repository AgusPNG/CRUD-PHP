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
  const input = document.getElementById("searchname")
    input.addEventListener('input', () => {searchname(input)})
}
function searchname(input){
  fetch('../server/fronts.php')
    .then(response => response.json())
    .then(data => {
      for (let i = 1; i <= data.count; i++) {
        const book = document.querySelector(`[data-id="${i}"]`);
        if (book.textContent.includes(input.value.toUpperCase()))
          book.style.display = "inline-block"
        else
          book.style.display = "none"
      }
    })
    .catch(err => alert("Error: " + err));
}

// 💡 NUEVA FUNCIÓN PARA MANEJAR COMPRA/ALQUILER
function handleTransaction(bookId, type) {
    const username = getCookie("user"); // Obtiene el nombre de usuario de la cookie
    
    if (!username) {
        alert("Error: No se encontró la sesión del usuario. Por favor, inicie sesión de nuevo.");
        return;
    }

    const transactionData = {
        book_id: bookId,
        username: username, // Enviamos el username para que PHP pueda buscar el ID
        type: type // 'COMPRA' o 'ALQUILER'
    };

    // 💡 CAMBIAMOS LA RUTA A server/menu.php
    fetch("../server/menu.php", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "ok") {
            // Mostrar mensaje de éxito y cerrar modal
            alert(`¡Transacción exitosa! ${type === 'COMPRA' ? 'Has comprado' : 'Has alquilado'} ${data.book_name}.`);
            closeBookModal();
        } else {
            // Mostrar mensaje de error (ej: falta de stock, error DB, etc.)
            alert("Error al realizar la transacción: " + data.message);
        }
    })
    .catch(err => {
        console.error("Error en fetch de transacción:", err);
        alert("Ocurrió un error de conexión al procesar la transacción.");
    });
}

function clickbook(id) {
  fetch("../server/getfront.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id }) // CORREGIDO: Enviar el ID como objeto
  })
  .then(res => res.json())
  .then(data => {
    if(data.status === "ok") {
    const bookId = id; // Guardamos el ID del libro
    
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
    // 💡 CAMBIO: Llamar a la nueva función con el ID y el tipo
    comprarBtn.onclick = () => handleTransaction(bookId, 'COMPRA');

    const alquilarBtn = document.createElement('button');
    alquilarBtn.className = 'alquilar';
    alquilarBtn.textContent = 'Alquilar';
    // 💡 CAMBIO: Llamar a la nueva función con el ID y el tipo
    alquilarBtn.onclick = () => handleTransaction(bookId, 'ALQUILER');

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
    }
  })
  .catch(err => console.error("Error en fetch:", err));
}
function selectgender(){
  const select = document.getElementById("genero");

  fetch('../server/fronts.php')
    .then(response => response.json())
    .then(data => {
      for (let i = 1; i <= data.count; i++) {
        const book = document.querySelector(`[data-id="${i}"]`);
        if (book.dataset.gender == select.value || select.value == "todos_los_generos")
          book.style.display = "inline-block"
        else
          book.style.display = "none"
      }
    })
    .catch(err => alert("Error: " + err));
}
function selectorder(){
  const select = document.getElementById("orden")
  const buttons = document.querySelectorAll('.bookcontainer')
  buttons.forEach(button => button.remove())

  loadBooks()
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
    let book = []
    for(i=0; i<data.count; i++){
      book.push({
        id: data.id[i],
        name: data.name[i],
        url: data.url[i],
        gender: data.gender[i]
      })
    }
    const select = document.getElementById("orden")
    if(select.value == "a-z")
      book.sort((a, b) => a.name.localeCompare(b.name))
    else if(select.value == "z-a")
      book.sort((b, a) => a.name.localeCompare(b.name))

    for(i=0; i<data.count; i++){

      const button = document.createElement("button")
      button.setAttribute("onclick", `clickbook(${book[i].id})`);
      button.className = "bookcontainer"
      button.dataset.gender = book[i].gender
      button.dataset.id = book[i].id

      const img = document.createElement("img")
      img.className = "indbook"
      img.src = book[i].url

      const p = document.createElement("p")
      p.className = "indtitle"
      p.textContent = `${book[i].name}`

      const title = book[i].name;
      const words = title.split(" ");
      let longestWord = 0;

      for (const word of words)
        if (word.length > longestWord) longestWord = word.length;

      if (title.length <= 20 && longestWord <= 10)
        p.style.fontSize = "34px";
      else 
        p.style.fontSize = "28px";

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