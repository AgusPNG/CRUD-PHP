function clickbook(){
    const p = document.createElement('p')
    p.textContent = 'Librito epico'
    
    const div = document.createElement('div')
    div.id = 'bookdiv'

    div.addEventListener('click', (e) => e.stopPropagation());

    const span = document.createElement('span')
    span.id = 'bookspan'
    span.onclick = function closespan(){
      const div = document.getElementById("bookdiv");
      div.style.animation = 'moveright 0.3s ease-out forwards';
      const span = document.getElementById("bookspan")
      span.style.animation = 'disapear 0.3s ease-out forwards';
      setTimeout(() => {
        span.remove();
      }, 300)
    }

    div.appendChild(p)
    span.appendChild(div)
    document.body.appendChild(span);
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