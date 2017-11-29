// getID: función que me retorna un id correspondiente a un elemnto
// elemeto: nombre del elemento a buscar el id
// retorna el id del elemento requerido
function getID(elemento){ return document.getElementById(elemento); }
function time(inicio){
	var str='';
	var ahora = new Date().getTime()/1000;
	str+= (Math.floor((ahora - inicio)/3600)<10? '0':'') + Math.floor((ahora - inicio)/3600) + ' : ';
	str+= (Math.floor((ahora - inicio)/60)<10? '0':'') + Math.floor((ahora - inicio)/60) + ' : ';
	str+= (Math.floor((ahora - inicio))<10? '0':'') + Math.floor((ahora - inicio));

	return str;
}
// Game: objeto/función principal del juego
// Equipo: rubro seleccionado por el usuario
// por los momentos galleta
function Game(equipo){
	var equipo = equipo;
	var dineroActual = 0;
	var dineroTotal = 0;
	var cps = 0;
	var tiempo = new Date().getTime()/1000;
	getID(equipo).innerHTML = "<img id='producto' src='img/perfectCookie.png'>"; //colocar este src dinámico cuando se incluyan los otros rubros
	getID(equipo).onclick=function(){clickNormal()};

	//Actualizar Dinero actualiza el inner del dinero actual y de los cps
	function actualizarDinero(){
		getID("dinero").innerHTML = '$ '+ Math.floor(dineroActual);
		getID("cps").innerHTML = '$ ' + cps + ' por segundo';
	}
	//Click Normal incrementa en 1 (por los momentos) la cantidad de dinero
	function clickNormal(){
		dineroTotal+=1;
		dineroActual+=1;
		actualizarDinero();
	}

	//Ciclo principal del juego
	function cicloPrincipal(){
		dineroTotal+=cps;
		dineroActual+=cps;
		actualizarDinero();
		getID("tiempo").innerHTML = "Tiempo de juego: " + time(tiempo);
		//Se actualiza cada segundo (temporal)
		setTimeout(cicloPrincipal,1000);
	}

	cicloPrincipal();
}

//cargo los elementos en la página
window.onload=function(){
	var juego = new Game("galleta");
}