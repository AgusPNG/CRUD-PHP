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
    
}