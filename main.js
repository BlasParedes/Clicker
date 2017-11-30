// getID: función que me retorna un id correspondiente a un elemnto
// elemeto: nombre del elemento a buscar el id
// retorna el id del elemento requerido
function getID(elemento){ return document.getElementById(elemento); }
function time(inicio){
	var str='';
	var ahora = new Date().getTime()/1000;
	if (ahora < inicio) {
		alert("trampa");
	}
	var segundos = ahora - inicio;
	var minutos= segundos/60;
	var horas=minutos/60;
	do{
		do{
			if(segundos%60===0){
				minutos++;
			}
			if(segundos>=60){
				segundos-=60;
			}		
		}while(segundos>=60);
		if(minutos%60===0){
			horas++;
		}
		if(minutos>=60){
			minutos-=60;
		}
	}while(minutos>=60);

	str+= (Math.floor(horas)<10? '0':'') + Math.floor(horas) + ':';
	str+= (Math.floor(minutos)<10? '0':'') + Math.floor(minutos) + ':';
	str+= (Math.floor(segundos)<10? '0':'') + Math.floor(segundos);

	return str;
}


// Game: objeto/función principal del juego
// Equipo: rubro seleccionado por el usuario
// por los momentos galleta
function Game(equipo){
	var activo;
	var equipo = equipo;
	var dineroActual = 0;
	var dineroTotal = 0;
	var cps = 1;
	var cpsActual;
	var tiempo = new Date().getTime()/1000;
	var actual;
	var pasado;
	var racha = 1;
	activo=actual=tiempo;
	getID(equipo).innerHTML = "<img id='producto' src='img/perfectCookie.png'>"; //colocar este src dinámico cuando se incluyan los otros rubros
	getID(equipo).onclick=function(){clickNormal()};

	//Actualizar Dinero actualiza el inner del dinero actual y de los cps
	function actualizarDinero(){
		getID("dinero").innerHTML = '$ '+ Math.floor(dineroActual);
		getID("cps").innerHTML = '$ ' + cps + ' por segundo';
		getID("racha").innerHTML = 'Multiplicador x' + racha.toFixed(1);  
	}
	//Click Normal incrementa en 1 (por los momentos) la cantidad de dinero
	function clickNormal(){
		dineroTotal+=1;
		dineroActual+=1;
		activo=new Date().getTime()/1000;
		actualizarDinero();
	}

	//Jugador activo determina si han pasado 5 minutos desde la ultima vez que se le dio click
	function jugadorActivo(){
		var tiempoActual = new Date().getTime()/1000;
		return (tiempoActual-activo)<=300;
	}

	function tiempoCorrecto(){ //arreglar
		return Math.floor(actual)-Math.floor(pasado) === 1;
	}

	function incrementarRacha(incremento=0.1){
		racha+=incremento;

	}
	//Ciclo principal del juego
	function cicloPrincipal(){
		pasado=actual;
		actual=new Date().getTime()/1000;
		//Se actualiza cada segundo (temporal)
		if( Math.floor(actual-tiempo)%300===0 && Math.floor(actual-tiempo) !== 0){
			incrementarRacha();
		}
		actualizarDinero();
		getID("tiempo").innerHTML = "Tiempo de juego: " + time(tiempo);
		cpsActual = cps*racha.toFixed(1);
		dineroTotal += cpsActual;
		dineroActual += cpsActual;
		pasado = new Date().getTime()/1000;

		if( jugadorActivo() === false ){ 
			alert('jugador inactivo');//reiniciar juegoS
		}
		//alert(Math.floor(actual-tiempo));

		setTimeout(cicloPrincipal,1000);
	}

	cicloPrincipal();
}

//cargo los elementos en la página
window.onload=function(){
	var juego = new Game("galleta");
}