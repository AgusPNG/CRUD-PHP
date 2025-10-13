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