var URL_API = 'https://dragonball-api.com/api/characters';

function obtenerPersonajes() {
    fetch(URL_API)
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            var personajes = datos.items || datos;
            mostrarPersonajes(personajes);
        })
        .catch(function(error) {
            console.error('Error al obtener personajes:', error);
            document.getElementById('contenedorPersonajes').innerHTML = 
                '<p class="cargando">Error al cargar los personajes</p>';
        });
}

function formatearNumero(numero) {
    if (!numero || numero === 'unknown') {
        return numero;
    }
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function crearTarjetaPersonaje(personaje) {
    var tarjeta = document.createElement('a');
    tarjeta.className = 'tarjeta-personaje';
    tarjeta.href = 'personaje.html?id=' + personaje.id;
    
    var html = '<div class="contenedor-imagen">' +
               '<img src="' + personaje.image + '" alt="' + personaje.name + '" class="imagen-personaje">' +
               '</div>' +
               '<div class="info-personaje">' +
               '<h2 class="nombre-personaje">' + personaje.name + '</h2>' +
               '<p class="raza-personaje">' + personaje.race + ' - ' + personaje.gender + '</p>' +
               '<div class="estadisticas-personaje">' +
               '<div class="fila-estadistica">' +
               '<span class="etiqueta-estadistica">Base KI:</span>' +
               '<span class="valor-estadistica">' + formatearNumero(personaje.ki) + '</span>' +
               '</div>' +
               '<div class="fila-estadistica">' +
               '<span class="etiqueta-estadistica">Total KI:</span>' +
               '<span class="valor-estadistica">' + formatearNumero(personaje.maxKi) + '</span>' +
               '</div>' +
               '<div class="fila-estadistica">' +
               '<span class="etiqueta-estadistica">Affiliation:</span>' +
               '<span class="valor-estadistica valor-afiliacion">' + (personaje.affiliation || 'Unknown') + '</span>' +
               '</div>' +
               '</div>' +
               '</div>';
    
    tarjeta.innerHTML = html;
    return tarjeta;
}

function mostrarPersonajes(personajes) {
    var contenedor = document.getElementById('contenedorPersonajes');
    contenedor.innerHTML = '';
    
    if (personajes.length === 0) {
        contenedor.innerHTML = '<p class="cargando">No se encontraron personajes</p>';
        return;
    }
    
    for (var i = 0; i < personajes.length; i++) {
        var tarjeta = crearTarjetaPersonaje(personajes[i]);
        contenedor.appendChild(tarjeta);
    }
}

function inicializar() {
    var contenedor = document.getElementById('contenedorPersonajes');
    contenedor.innerHTML = '<p class="cargando">Cargando personajes...</p>';
    obtenerPersonajes();
}

document.addEventListener('DOMContentLoaded', inicializar);