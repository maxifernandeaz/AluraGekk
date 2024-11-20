export function mostrarAlerta(mensaje) {
    // Cambié la consulta para que busque las alertas con ambas clases correctamente
    const alerta = document.querySelector('.alert.alert-danger');

    if (!alerta) {
        const alerta = document.createElement('div');

        alerta.classList.add('alert', 'alert-danger', 'd-flex', 'align-items-center', 'rounded', 'bg-opacity-75', 'text-danger', 'text-center');
        
        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span>${mensaje}</span>`;

        // Asegúrate de que el contenedor de alertas tenga el ID correcto
        const alertContainer = document.querySelector('#alert-container');
        alertContainer.appendChild(alerta);

        setTimeout(() => {
            alerta.remove(); // Elimina la alerta después de 3 segundos
        }, 3000);
    }
}


