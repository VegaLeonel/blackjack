
//PATRON MODULO

const miModulo = (() => {
    'use strict'

    
    let deck = []
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K']

    let puntosJugadores = []

    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo')

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHtml = document.querySelectorAll('small')

    const iniciliarJuego = ( numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = []
        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0)
        }

        puntosHtml.forEach( elem => elem.innerText = 0)
        divCartasJugadores.forEach( elem => elem.innerHTML = '')

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    //crea una nueva baraja
    const crearDeck = () => {
        deck = []
        for( let i = 2; i <= 10 ; i++){
            for ( let tipo of tipos){
                deck.push ( i + tipo )
            }
        }

        for ( let tipo of tipos){
            for ( let esp of especiales){
                deck.push ( esp + tipo )
            }
        }
        return _.shuffle( deck );
    }

    // funcion para tomar una nueva carta
    const pedirCarta = () => {

        if ( deck.length === 0) {
            throw 'No hay mas carta en la baraja'
        }
        return deck.pop() 
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1)
        return (isNaN( valor )) ?
                (valor === 'A') ? 11: 10
                : valor * 1;
    }

    // 0 el primer jugador y el ultimo la computadora
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta )
        puntosHtml[turno].innerText = puntosJugadores[turno]
        return puntosJugadores[turno]
    }

    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/cartas/${ carta }.png`
        imgCarta.classList.add('cartas')
        divCartasJugadores[turno].append( imgCarta )
    }

    const determinarGanador = () => {
        setTimeout(() => {

            const [puntosMinimos, puntosComputadora] = puntosJugadores

            if ( puntosComputadora === puntosMinimos) {
                alert('Nadie gana')
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana')
            } else if ( puntosComputadora > 21 ) {
                alert(`Jugador Gana`)
            } else {
                alert('Computadora gana')
            }
        }, 10 ) 
    }

    // turno computadora
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1 )
            crearCarta(carta, puntosJugadores.length -1 )

        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) )

        determinarGanador();
    }


    //const valor = valorCarta2( pedirCarta() )
    //console.log( {valor} )

    //EVENTOS
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0 )

        crearCarta(carta, 0 )

        
        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho, perdiste')
            btnPedir.disabled = true
            btnDetener.disabled = true
            turnoComputadora( puntosJugador )
        } else if ( puntosJugador === 21 ) {
            console.warn('21, genial')
            btnPedir.disabled = true
            btnDetener.disabled = true
            turnoComputadora( puntosJugador )
        }
    })

    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true
        btnDetener.disabled = true
        turnoComputadora( puntosJugadores[0] )
    })

    btnNuevo.addEventListener ('click', () => {
        iniciliarJuego();
    })

    return {
        nuevoJuego: iniciliarJuego
    }

})();

