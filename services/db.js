const url = 'http://localhost:4000/producto'
// const url = 'https://67349bd8a042ab85d11ae74d.mockapi.io/productos';


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


export const nuevoProducto = async producto => {
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(producto),
            Headers: {
                'Content-Type': 'application/Json'
            }
        });
        window.location.href = 'index.html';
    } catch (error) {
        console.log(error);
        
        
    }
    
}

export const serviceProducts = {
    cargarProductos
}