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
  loadBooks()
  userconfig()
  returnstock()
  const input = document.getElementById("searchname")
    input.addEventListener('input', () => {searchname(input)})
}
function searchname(input){
  const bookCookie = getCookie("book")
  const book = JSON.parse(bookCookie)
  console.log(book)
  let i = 0
  while(true){
    if(book[i] == undefined)
      break
        const book = document.querySelector(`[data-id="${i}"]`);
        if (book.textContent.includes(input.value.toUpperCase()))
          book.style.display = "inline-block"
        else
          book.style.display = "none"
        i++
    }
}
function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function returnstock(){
  fetch('../server/getdate.php', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({user: getCookie("user")})
  })
  .then(response => response.json())
  .then(data => {
    if(data.historic != null){
      for(i=0; i<data.historic.length; i++){
        if(getCurrentDateTime() > data.historic[i].date){
          alert(`La fecha de devolución para el libro "${data.historic[i].name}" ah caducado. Stock devuelto`)
          fetch('../server/returnstock.php', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({bookId: data.historic[i].bookId, historicId: data.historic[i].historicId})
          });
        }
      }
    }
    console.log(data.historic)
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
    body: JSON.stringify({ id: id })
  })
  .then(res => res.json())
  .then(data => {
    if(data.status === "ok") {
      const bookId = id;

      const existingModal = document.getElementById('bookspan');
      if(existingModal) existingModal.remove();

      const span = document.createElement('span');
      span.id = 'bookspan';
      span.addEventListener('click', () => closeBookModal());

      const div = document.createElement('div');
      div.id = 'bookdiv';
      div.addEventListener('click', e => e.stopPropagation());

      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = data.gender;

      const nombre = document.createElement('h2');
      nombre.textContent = data.name;

      const content = document.createElement('div');
      content.className = 'book-content';

      const img = document.createElement('img');
      img.src = data.url;

      const btnContainer = document.createElement('div');
      btnContainer.className = 'button-container';

      const comprarBtn = document.createElement('button');
      comprarBtn.className = 'comprar';
      comprarBtn.textContent = 'Comprar';
      comprarBtn.onclick = () => {
        handleTransaction(bookId, 'COMPRA');
        agregarAlCarrito({
          id: bookId,
          nombre: data.name,
          genero: data.gender,
          imagen: data.url,
          tipo: "COMPRA"
        });
      };

      const alquilarBtn = document.createElement('button');
      alquilarBtn.className = 'alquilar';
      alquilarBtn.textContent = 'Alquilar';
      alquilarBtn.onclick = () => {
        handleTransaction(bookId, 'ALQUILER');
        agregarAlCarrito({
          id: bookId,
          nombre: data.name,
          genero: data.gender,
          imagen: data.url,
          tipo: "ALQUILER"
        });
      };

      btnContainer.appendChild(comprarBtn);
      btnContainer.appendChild(alquilarBtn);

      content.appendChild(img);
      content.appendChild(btnContainer);

      div.appendChild(badge);
      div.appendChild(nombre);
      div.appendChild(content);

      span.appendChild(div);
      document.body.appendChild(span);

      div.style.animation = 'moveleft 0.5s ease-out forwards';
    }
  })
  .catch(err => console.error("Error al obtener el libro:", err));
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
function agregarAlCarrito(libro) {
  let carrito = JSON.parse(localStorage.getItem("carritoLibros")) || [];

  const existe = carrito.some(item => item.id === libro.id && item.tipo === libro.tipo);
  if (existe) {
    alert("Este libro ya está en el carrito.");
    return;
  }

  carrito.push(libro);
  localStorage.setItem("carritoLibros", JSON.stringify(carrito));

  actualizarBadgeCarrito();
  alert(`"${libro.nombre}" agregado al carrito (${libro.tipo}).`);
}

function verCarrito() {
  const modal = document.getElementById('carritoModal');
  const content = modal.querySelector('.carrito-content');
  content.style.maxWidth = '600px';
  content.style.width = '100%';
  content.innerHTML = '';

  const carrito = JSON.parse(localStorage.getItem("carritoLibros")) || [];
  const itemsPerPage = 3;
  const totalPages = Math.ceil(carrito.length / itemsPerPage);

  if (carrito.length === 0) {
    content.innerHTML = "<p class='vacio'>Tu carrito está vacío.</p>";
  } else {
    // Create tab container
    const tabContainer = document.createElement('div');
    tabContainer.className = 'tab-container';
    tabContainer.style.display = 'flex';
    tabContainer.style.justifyContent = 'center';
    tabContainer.style.marginBottom = '15px';
    tabContainer.style.padding = '10px 0';
    tabContainer.style.width = '100%';
    content.appendChild(tabContainer);

    // Create book container for the current page
    const bookContainer = document.createElement('div');
    bookContainer.className = 'book-container';
    bookContainer.style.display = 'flex';
    bookContainer.style.flexDirection = 'row';
    bookContainer.style.justifyContent = 'center';
    bookContainer.style.gap = '10px';
    bookContainer.style.width = '100%';
    bookContainer.style.flexWrap = 'wrap';
    content.appendChild(bookContainer);

    // Function to render books for a specific page
    function renderPage(page) {
      bookContainer.innerHTML = '';
      const start = page * itemsPerPage;
      const end = Math.min(start + itemsPerPage, carrito.length);

      for (let i = start; i < end; i++) {
        const item = carrito[i];
        const card = document.createElement('div');
        card.classList.add('carrito-card');
        card.style.width = '180px';
        card.style.minWidth = '150px';
        card.style.textAlign = 'center';
        card.style.padding = '10px';
        card.style.boxSizing = 'border-box';

        const title = document.createElement('p');
        title.textContent = item.nombre;
        title.classList.add('carrito-title');
        title.style.fontSize = '14px';
        title.style.marginBottom = '8px';
        card.appendChild(title);

        const img = document.createElement('img');
        img.src = item.imagen;
        img.style.width = '100px';
        img.style.height = '150px';
        img.style.objectFit = 'cover';
        img.style.marginBottom = '8px';
        img.style.display = 'block';
        img.style.marginLeft = 'auto';
        img.style.marginRight = 'auto';
        card.appendChild(img);

        const genreBadge = document.createElement('span');
        genreBadge.classList.add('badge');
        genreBadge.textContent = item.genero;
        genreBadge.style.fontSize = '12px';
        genreBadge.style.padding = '4px 8px';
        genreBadge.style.marginBottom = '8px';
        card.appendChild(genreBadge);

        const badge = document.createElement('span');
        badge.classList.add('badge-status');
        badge.classList.add(item.tipo === 'COMPRA' ? 'badge-comprado' : 'badge-alquilado');
        badge.textContent = item.tipo === 'COMPRA' ? 'Comprado' : 'Alquilado';
        badge.style.fontSize = '12px';
        badge.style.padding = '4px 8px';
        card.appendChild(badge);

        bookContainer.appendChild(card);
      }
    }

    // Create tabs
    for (let i = 0; i < totalPages; i++) {
      const tab = document.createElement('button');
      tab.className = 'tab-button';
      tab.textContent = i + 1;
      tab.style.margin = '0 8px';
      tab.style.padding = '8px 12px';
      tab.style.cursor = 'pointer';
      tab.style.backgroundColor = i === 0 ? '#007bff' : '#f0f0f0';
      tab.style.color = i === 0 ? '#fff' : '#000';
      tab.style.border = '1px solid #ccc';
      tab.style.borderRadius = '5px';
      tab.style.fontSize = '16px';
      tab.style.transition = 'background-color 0.3s, color 0.3s';
      tab.style.minWidth = '40px';
      tab.style.textAlign = 'center';

      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(btn => {
          btn.style.backgroundColor = '#f0f0f0';
          btn.style.color = '#000';
        });
        tab.style.backgroundColor = '#007bff';
        tab.style.color = '#fff';
        renderPage(i);
      });

      tabContainer.appendChild(tab);
    }

    // Render the first page
    renderPage(0);
  }

  modal.style.display = 'flex';
}

function actualizarBadgeCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carritoLibros")) || [];
  const badge = document.getElementById('carritoBadge');
  if (badge) badge.textContent = carrito.length;
}

function vaciarCarrito() {
  localStorage.removeItem("carritoLibros");
  actualizarBadgeCarrito();
  alert("Carrito vaciado.");
}

function cerrarCarrito() {
    document.getElementById('carritoModal').style.display = 'none';
}

function loadBooks() {
  let book = []
  fetch('../server/fronts.php')
  .then(response => response.json())
  .then(data => {
    for(i=0; i<data.count; i++){
      book.push({
        id: data.id[i],
        name: data.name[i],
        url: data.url[i],
        gender: data.gender[i]
      })
    }
    const bookString = JSON.stringify(book);
    document.cookie = `book=${encodeURIComponent(bookString)}; max-age=3600; path=/`;
    showBooks(book)
  })
  .catch(error => {
    console.error('Error al hacer fetch:', error);
  });

    const select = document.getElementById("orden")
    if(select.value == "a-z")
      book.sort((a, b) => a.name.localeCompare(b.name))
    else if(select.value == "z-a")
      book.sort((b, a) => a.name.localeCompare(b.name))
}
function showBooks(book){
  let i = 0
  while (true){
      if(book[i] == undefined)
        break

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
        p.style.fontSize = "1em";
      else 
        p.style.fontSize = "1em";

      const container = document.querySelector(".bookstorage")
      button.appendChild(img)
      button.appendChild(p)
      container.appendChild(button)

      i++
    }
}
