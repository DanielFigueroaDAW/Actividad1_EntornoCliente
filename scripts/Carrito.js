class Carrito{

    // productos será el json
    constructor(productos){
        this.productosList = this.jsonToObjectsList(productos)
    }

    jsonToObjectsList(jsonProductos) {
        const productosPlanos = JSON.parse(jsonProductos);
        
        let listaObjetosReales = [];

        for (let productoPlano of productosPlanos) {

            let objetoClase = new Producto(productoPlano.SKU, productoPlano.title, productoPlano.price,0);
            
            listaObjetosReales.push(objetoClase);
        }

        return listaObjetosReales; 
    }



    productosToJSONList() {
        return JSON.stringify(this.productosList);
    }


    getProductos(){
        return this.productosList
    }


    actualizarUnidades(sku,unidades){
        for(let producto of this.productosList){
            if(producto.sku == sku){
                producto.cantidad = unidades
                break
            }
        }
    }
    obtenerInformacionProducto(sku){
        for(let producto of this.productosList){
            if(producto.sku == sku){
                return this.productToJson(producto)

            }
        }
        return null
    }

    productToJson(producto){
        return JSON.stringify(producto)
    }

    obtenerCarrito(){
        let precioTotal = 0
        for(let producto of this.productosList){
            precioTotal += producto.precioTotal()
        }

        stringCabecera = '{"procudtoTotal":'+precioTotal.toString()+'}'


        const json = JSON.parse(stringCabecera);

        json.productos = productosToJSONList(this.productosList)

        return jsonFinalString = JSON.stringify(json, null, 2);
    }

}