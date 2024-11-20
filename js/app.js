import { mostrarAlerta } from './funciones.js';
import { nuevoProducto } from '../services/db.js';

const url = 'http://localhost:4000/producto'; // Asegúrate de que esta URL sea correcta

(async function() {
    const formulario = document.querySelector('#formulario');
    const productosContainer = document.querySelector('#productos-container');

    formulario.addEventListener('submit', validarProducto);

    
    
    // Cargar productos al inicio
    await cargarProductos();

    async function cargarProductos() {
        try {
            const response = await fetch(url);
            const productos = await response.json();
            productos.forEach(producto => {
                agregarProducto(producto);
            });
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    }

        // se realiza la validacion

    async function validarProducto(e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const precio = document.querySelector('#precio').value;
        const imagen = document.querySelector('#imagen').value;

        const producto = {
            nombre,
            precio,
            imagen
        };

        if (!validar(producto)) {
            mostrarAlerta('Todos los campos son obligatorios');
            return;
        }

        // Agregar producto a la base de datos
        await nuevoProducto(producto);
        
        // Agregar producto al DOM
        agregarProducto(producto);
        
        // Limpiar el formulario
        formulario.reset();
    }

    function validar(Obj) {
        return Object.values(Obj).every(input => input !== '');
    }


    // funcion para agregar producto
    function agregarProducto(producto) {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-3');
        card.setAttribute('data-id', producto.id); // Añadimos un atributo data-id para identificar la tarjeta
        card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <button class="btn btn-danger" id="eliminar-btn">Eliminar</button>
                </div>
            </div>
        `;


        // Agregar el producto al contenedor
        productosContainer.appendChild(card);
    
        // Agregar el listener de eliminación
        const eliminarBtn = card.querySelector('#eliminar-btn');
        eliminarBtn.addEventListener('click', () => eliminarProducto(producto.id, card)); // Pasar el id y la card para eliminarla
        
    }
    async function eliminarProducto(id, card) {
        try {
            // Elimino el producto en mi base de dato (en API)
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json"
                }  // Usamos DELETE para eliminar el producto
            });
    
            if (!response.ok) {
                throw new Error('No se pudo eliminar el producto');
            }
    
            //  Se elimina la card del producto
            card.remove();
    
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            mostrarAlerta('Hubo un error al eliminar el producto. Intenta de nuevo.');
        }
    }
    
    
    }
    
)();
