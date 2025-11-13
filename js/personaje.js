function obtenerIdPersonaje() {
    var parametros = new URLSearchParams(window.location.search);
    return parametros.get('id');
}

function obtenerDetallePersonaje(id) {
    fetch('https://dragonball-api.com/api/characters/' + id)
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(personaje) {
            mostrarDetallePersonaje(personaje);
            mostrarPlanetaOrigen(personaje);
            mostrarTransformaciones(personaje);
        })
        .catch(function(error) {
            console.error('Error al obtener detalle del personaje:', error);
            document.getElementById('detallePersonaje').innerHTML = 
                '<p class="mensaje-carga">No se pudo cargar la información del personaje</p>';
        });
}

function crearTarjetaDetalle(personaje) {
    var html = '<div class="tarjeta-detalle-personaje">' +
               '<div class="contenedor-imagen-detalle">' +
               '<img src="' + personaje.image + '" alt="' + personaje.name + '" class="imagen-detalle-personaje">' +
               '</div>' +
               '<div class="info-detalle-personaje">' +
               '<h1 class="nombre-detalle-personaje">' + personaje.name + '</h1>' +
               '<p class="raza-detalle-personaje">' + personaje.race + ' - ' + personaje.gender + ' - ' + (personaje.affiliation || 'Unknown') + '</p>' +
               '<div class="grid-estadisticas">' +
               '<div class="item-estadistica">' +
               '<div class="etiqueta-estadistica">BASE KI</div>' +
               '<div class="valor-estadistica">' + formatearNumero(personaje.ki) + '</div>' +
               '</div>' +
               '<div class="item-estadistica">' +
               '<div class="etiqueta-estadistica">MAX KI</div>' +
               '<div class="valor-estadistica">' + formatearNumero(personaje.maxKi) + '</div>' +
               '</div>' +
               '<div class="item-estadistica">' +
               '<div class="etiqueta-estadistica">ID</div>' +
               '<div class="valor-estadistica">' + personaje.id + '</div>' +
               '</div>' +
               '</div>' +
               '<p class="descripcion-personaje">' + (personaje.description || 'No hay descripción disponible.') + '</p>' +
               '</div>' +
               '</div>';
    
    return html;
}

function formatearNumero(numero) {
    if (!numero || numero === 'unknown') {
        return numero;
    }
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function mostrarDetallePersonaje(personaje) {
    var contenedor = document.getElementById('detallePersonaje');
    contenedor.innerHTML = crearTarjetaDetalle(personaje);
}

function mostrarPlanetaOrigen(personaje) {
    var seccionPlaneta = document.getElementById('planetaOrigen');
    
    if (personaje.originPlanet && personaje.originPlanet.name) {
        seccionPlaneta.style.display = 'block';
        
        document.getElementById('nombrePlaneta').textContent = personaje.originPlanet.name;
        document.getElementById('estadoPlaneta').textContent = personaje.originPlanet.isDestroyed ? 'PLANETA DESTRUIDO' : 'PLANETA ACTIVO';
        document.getElementById('descripcionPlaneta').textContent = personaje.originPlanet.description || 'No hay descripción disponible del planeta.';
        document.getElementById('imagenPlaneta').src = personaje.originPlanet.image || '';
        
        var elementoEstado = document.getElementById('estadoPlaneta');
        if (personaje.originPlanet.isDestroyed) {
            elementoEstado.style.color = '#e74c3c';
        } else {
            elementoEstado.style.color = '#2ecc71';
        }
    }
}

function crearTarjetaTransformacion(transformacion) {
    var html = '<div class="tarjeta-transformacion">' +
               '<img src="' + transformacion.image + '" alt="' + transformacion.name + '" class="imagen-transformacion">' +
               '<div class="info-transformacion">' +
               '<div class="nombre-transformacion">' + transformacion.name + '</div>' +
               '<div class="ki-transformacion">Ki: ' + formatearNumero(transformacion.ki) + '</div>' +
               '</div>' +
               '</div>';
    
    return html;
}

function mostrarTransformaciones(personaje) {
    var seccionTransformaciones = document.getElementById('transformaciones');
    var gridTransformaciones = document.getElementById('gridTransformaciones');
    var tituloTransformaciones = document.getElementById('tituloTransformaciones');
    
    if (personaje.transformations && personaje.transformations.length > 0) {
        seccionTransformaciones.style.display = 'block';
        tituloTransformaciones.textContent = 'Transformaciones de ' + personaje.name;
        
        gridTransformaciones.innerHTML = '';
        
        for (var i = 0; i < personaje.transformations.length; i++) {
            var htmlTransformacion = crearTarjetaTransformacion(personaje.transformations[i]);
            gridTransformaciones.innerHTML += htmlTransformacion;
        }
    }
}

function cargarPersonaje() {
    var idPersonaje = obtenerIdPersonaje();
    
    if (!idPersonaje) {
        document.getElementById('detallePersonaje').innerHTML = 
            '<p class="mensaje-carga">No se especificó ningún personaje</p>';
        return;
    }
    
    obtenerDetallePersonaje(idPersonaje);
}

document.addEventListener('DOMContentLoaded', cargarPersonaje);