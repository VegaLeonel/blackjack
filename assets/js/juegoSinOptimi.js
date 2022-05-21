
/*
C treboles
D diamante
H corazones
S pica
*/ 

//PATRON MODULO

(() => {
    'use strict'

    
    let deck = []
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K']

    let puntosJugador = 0,
        puntosComputadora = 0;

    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo')
    //computadora-cartas
    const divCartasJugador = document.querySelector('#jugador-cartas'),
          divCartasComputadora = document.querySelector('#computadora-cartas'),
          puntosHtml = document.querySelectorAll('small')



    //crea una nueva baraja
    const crearDeck = () => {

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
        //console.log( deck )
        deck = _.shuffle( deck )
        //console.log( deck )
        return deck;
    }

    // funcion para tomar una nueva carta

    const pedirCarta = () => {

        if ( deck.length === 0) {
            throw 'No hay mas carta en la baraja'
        }

        const carta = deck.pop() //remueve el ultimo elemento y lo regresa
        //console.log(carta)
        //console.log(deck)
        return carta 
    }

    crearDeck()
    //pedirCarta()

    //for ( let i = 0; i < 60 ; i++){
    //    pedirCarta()
    //}


    const valorCarta2 = (carta) => {

        const valor = carta.substring(0, carta.length - 1)
        let puntos = 0;

        if (isNaN( valor )){

            puntos = ( valor === 'A') ? 11 : 10;
        } else {
            puntos = valor * 1
        }

        console.log(puntos)

    }


    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1)
        return (isNaN( valor )) ?
                (valor === 'A') ? 11: 10
                : valor * 1;
    }

    // turno computadora

    const turnoComputadora = ( puntosMinimos ) => {

        do {
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta( carta )
            puntosHtml[1].innerText = puntosComputadora

            const imgCarta = document.createElement('img')
            imgCarta.src = `assets/cartas/cartas/${ carta }.png`
            imgCarta.classList.add('cartas')
            //<img class="cartas" src="assets/cartas/cartas/2C.png" alt="">
            divCartasComputadora.append( imgCarta )

            if( puntosMinimos > 21){
                break
            }
        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) )
        
        setTimeout(() => {
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


    //const valor = valorCarta2( pedirCarta() )
    //console.log( {valor} )

    //EVENTOS
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta( carta )
        puntosHtml[0].innerText = puntosJugador

        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/cartas/${ carta }.png`
        imgCarta.classList.add('cartas')
        //<img class="cartas" src="assets/cartas/cartas/2C.png" alt="">
        divCartasJugador.append( imgCarta )
        
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
        turnoComputadora( puntosJugador )

    })


    //const smallPuntos = document.querySelector('small')
    //const agregatPuntos = smallPuntos.append()

    btnNuevo.addEventListener ('click', () => {

        console.clear();
        deck = [];
        deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;

        puntosHtml[0].innerText = 0;
        puntosHtml[1].innerHTML = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    })

})();

