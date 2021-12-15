class Contenedor {
    constructor() {
        this.productos = []
        this.id = 0
    }

    allProducts() {
        return this.productos
    }

    save(producto) {
        const newProducto = { ...producto, id: ++this.id }
        this.productos.push(newProducto)
        return newProducto
    }
}

module.exports = Contenedor
