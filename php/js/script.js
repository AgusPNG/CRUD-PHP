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
function register(){
    const info = {
      password: document.getElementById('password').value,
      user: document.getElementById('user').value
    }
    fetch("high.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(info)
  })
  .then(response => response.json())
  .then(data => {
    console.log("Respuesta del PHP:", data);
  })
  .catch(error => console.error("Error:", error));
}
function books(){
    fetch('../server/portadas.php')
    .then(response => response.json())
    .then(data => {
      if(data.imageUrl) {
        document.getElementById('indbook').sr = data.imageUrl;
      } else {
        console.error('No se encontró la imagen:', data.error);
      }
    })
    .catch(error => console.error('Error en fetch:', error));
}