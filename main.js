// Creamos dos constantes con los iconos que van a colocar los jugadores al hacer click
const jugadorUno = "🔴";
const jugadorDos = "🟢";

// Creamos una variable para controlar los turnos del juego
let turnos = "Primero";

// Seleccionamos todos los cuadrados
const espacios = document.querySelectorAll(".espacio");

// Recorremos todos los cuadrados y le agregamos una función al hacer clic en cada uno de ellos
espacios.forEach((espacio, i) => {
    espacio.addEventListener("click", () => {
        if(turnos === "FIN"){
            return
        }
        if(espacio.textContent !== "") return
        // Insertamos circulo rojo o verde según el turno sea Primero o Segundo
        if(turnos === "Primero"){
            espacio.innerText = jugadorUno;
        }else{
            espacio.innerText = jugadorDos;
        }
        const ubicacionGanador = hayGanador();

        if(typeof ubicacionGanador === "object"){
            unGanador(ubicacionGanador);
            return
        }
        if(ubicacionGanador === "empate"){
            mostrarInformacion("EMPATE");
        }
        // Cambiamos el turno cada una ronda
        if(turnos === "Primero"){
            turnos = "Segundo";
        }else{
            turnos = "Primero";
        }
    });
});

// Verificamos si hay un ganador en el Ta Te Ti
function hayGanador(){
    //Convertimos a un array los espacios
    const arrayEspacios = [...espacios].map(espacio => espacio.textContent);

    // Lineas horizontales

    for(let i = 0; i < 9; i+= 3){
        if(arrayEspacios[i] && arrayEspacios[i] === arrayEspacios[i+1] && arrayEspacios[i] === arrayEspacios[i+2]){
            return ([i, i+1, i+2])
        }
    }
    // Lineas verticales
    for(let i = 0; i < 3; i++){
        if(arrayEspacios[i] && arrayEspacios[i] === arrayEspacios[i+3] && arrayEspacios[i] === arrayEspacios[i+6]){
            return ([i, i+3, i+6])
        }
    }
    // Revisar las dos formas cruzadas
    if(arrayEspacios[0] && arrayEspacios[0] === arrayEspacios[4] && arrayEspacios[0] === arrayEspacios[8]){
        return ([0, 4, 8])
    }
    if(arrayEspacios[2] && arrayEspacios[2] === arrayEspacios[4] && arrayEspacios[2] === arrayEspacios[6]){
        return ([2, 4, 6])
    }

    // Revisar empate
    if(arrayEspacios.includes("")) return false;
    return "empate";
}

// Esto sucede cuando hay un ganador y nos llegan las posiciones de ese ganador
function unGanador(posicionDelGanador){

    posicionDelGanador.forEach(posicion => {
        espacios[posicion].classList.toggle("posiciones-ganadoras", true);
        espacios[posicion].innerText = "❤";
        if(turnos === "Primero"){
            espacios[posicion].classList.add("color-uno");
            espacios[posicion].classList.remove("color-dos");
        }else{
            espacios[posicion].classList.add("color-dos");
            espacios[posicion].classList.remove("color-uno");
        }
    })
    mostrarInformacion(turnos);
    turnos = "FIN";
}

// Mostrar información del resultado de juego

const informacion = document.getElementById("contenedor-informacion");
const textoInfo = document.getElementById("info");

function mostrarInformacion(resultado){
    if(turnos === "Primero"){
        info.innerText = "El Ganador del juego es el Rojo";
    }
    if(turnos === "Segundo"){
        info.innerText = "El Ganador del juego es el Verde";
    }
    if(resultado === "EMPATE"){
        info.innerText = "El juego ha finalizado en Empate";
    }

    informacion.style.display = "block";
}

// Reiniciar juego
document.getElementById("reiniciar").addEventListener("click", () => {
    espacios.forEach(espacio => {
        espacio.textContent = "";
        espacio.classList.toggle("posiciones-ganadoras", false);
        informacion.style.display = "none";
        turnos = "Primero";
    })
})