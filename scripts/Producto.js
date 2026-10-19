class Producto{
    constructor(sku, titulo, precio, cantidad){
        this.sku = sku
        this.titulo = titulo
        this.precio = precio
        this.cantidad = cantidad
    }

    precioTotal() {
        return cantidad * precio;
    }

}