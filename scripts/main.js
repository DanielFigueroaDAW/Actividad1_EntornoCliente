const productosJSON = `[
  {
    "SKU": "0K3QOSOV4V",
    "title": "iFhone 13 Pro",
    "price": "938.99"
  },
  {
    "SKU": "TGD5XORY1L",
    "title": "Cargador",
    "price": "49.99"
  },
  {
    "SKU": "IOKW9BQ9F3",
    "title": "Funda de piel",
    "price": "79.99"
  }
]`;

let carrito = new Carrito(productosJSON)

const listaProductos = document.getElementById('lista-productos');
// En los button hay que aplicar los onclick

const productos = carrito.getProductos();


for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];
    agregarProductoATabla(producto);
    actualizarView(producto.sku);
}


function onclickSumar(sku){
  const productoJSON = carrito.obtenerInformacionProducto(sku);
  if (!productoJSON) return;
  const producto = JSON.parse(productoJSON);

  carrito.actualizarUnidades(sku, Number(producto.cantidad) + 1);
  actualizarView(sku);

}

function onclickRestar(sku){
  const productoJSON = carrito.obtenerInformacionProducto(sku);
  if (!productoJSON) return;
  const producto = JSON.parse(productoJSON);
  if (Number(producto.cantidad) === 0) return;

    carrito.actualizarUnidades(sku, Number(producto.cantidad) - 1);
    actualizarView(sku);

}

function actualizarView(sku){
  const productoJSON = carrito.obtenerInformacionProducto(sku);
  const fila = listaProductos.querySelector(`tr[data-sku="${sku}"]`);
  if (!productoJSON || !fila) return;
  const producto = JSON.parse(productoJSON);

  const cantidad = Number(producto.cantidad);
  const precio = Number(producto.precio);

  fila.querySelector(".cantidad").textContent = cantidad;
  fila.cells[2].textContent = `${precio.toFixed(2)}€`;
  fila.cells[3].textContent = `${(precio * cantidad).toFixed(2)}€`;

  let totalCarrito = 0;
  for (const producto of carrito.getProductos()) {
    totalCarrito += Number(producto.precio) * Number(producto.cantidad);
  }
  document.getElementById("precio-total").textContent = `${totalCarrito.toFixed(2)}€`;

}




function agregarProductoATabla(productoJson){
  const sku = productoJson.sku;
  const titulo = productoJson.titulo;
  const precio = Number(productoJson.precio);
  const cantidad = productoJson.cantidad;
    const tr = document.createElement('tr');
    tr.dataset.sku = sku;
    tr.innerHTML =  `
    <td>
      <strong>${titulo}</strong><br>
      <small>REF: ${sku}</small>
    </td>
    <td>
      <button class="btn-restar">-</button>
      <span class="cantidad">${cantidad}</span>
      <button class="btn-sumar">+</button>
    </td>
    <td>${precio}€</td>
    <td>${precio*cantidad}</td>
  `;

    listaProductos.appendChild(tr);

    tr.querySelector(".btn-sumar").addEventListener("click", () => {
      onclickSumar(sku);
    });

    tr.querySelector(".btn-restar").addEventListener("click", () => {
      onclickRestar(sku);
    });



}

