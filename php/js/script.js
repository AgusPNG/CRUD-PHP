function clickbook(){
    const p = document.createElement('p')
    p.textContent = 'asd'
    
    const div = document.createElement('div')
    div.id = 'bookdiv'

    const span = document.createElement('span')
    span.id = 'bookspan'

    div.appendChild(p)
    span.appendChild(div)

    document.body.appendChild(span);
// overlaySpan.remove();
}