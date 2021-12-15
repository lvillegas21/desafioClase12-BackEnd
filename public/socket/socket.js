const socket = io.connect();

//------------------------------------------------------------------------------------

const nuevoProducto = document.getElementById('nuevoProducto')
nuevoProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: nuevoProducto[0].value,
        price: nuevoProducto[1].value,
        thumbnail: nuevoProducto[2].value
    }
    socket.emit('update', producto);
    nuevoProducto.reset()
})

socket.on('productos', productos => {
    listaProductos(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});

function listaProductos(productos) {
    return fetch('hbs/productos.hbs')
        .then(res => res.text())
        .then(listadoProductos => {
            const tpl = Handlebars.compile(listadoProductos);
            const html = tpl({ productos })
            return html
        })
}



socket.on('mensajes',function(data){
    console.log(data)
    render(data)
})

function render(data){
    let html=data
    .map(function(elem){
        return `<div>
                <b style="color:blue;">${elem.author}</b>
                [<span style="color:brown;">${elem.fecha}</span>]:
                <i style="color:green;">${elem.text}</i>
                </div>
        `
    })
    .join(" ")
    document.getElementById('mensajes').innerHTML=html
}

function addMessage(e){
    let message={
        author:document.getElementById('email').value,
        text:document.getElementById('texto').value,
        fecha:new Date().toLocaleString()
    }
    socket.emit('mensajeNuevo',message)
    return false
}
