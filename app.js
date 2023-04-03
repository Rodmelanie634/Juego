//Estructura que mantiene las palabras del juego
let bd = new Array(4);
bd[0] =['PERA','BANANA','MELON','SANDIA','MANDARINA','KIWI'];
bd[1] =['PIANO','GUITARRA','PIANO','BAJO','TROMPETA','SAXOFON','BATERIA'];
bd[2] =['LEON','GALLINA','PERRO','LEOPARDO','MURCIELAGO','MONO','ELEFANTE'];
bd[3] =['CUBA','BRASIL','COLOMBIA','VENEZUELA','ECUADOR','MEXICO','ARGENTINA'];

//CATEGORIAS
let categorias = ['FRUTAS','MÚSICA','ANIMALES','PAISES']
//cantidad de palabras con las que jugará cada categoria
const cantidadPalabras = 5;
//Este arreglo guarda las 5 palabras para jugar
let palabras = [];
//Este arreglo guarda las palabras desordenadas del arreglo de palabras
let desordenadas = [];
//mantengo el nivel actual
let pos=0;

//tomo una categoria y selecciono 5 palabras randome para jugar
function agregarPalabra(categoria){
    for(i=0; i < cantidadPalabras;i++){
        let x = Math.floor(Math.random()*categoria.length);
        palabras.push(categoria[x]);
        //elimino del arreglo categoría para que la próxima ya no esté para elegir
        categoria.splice(x,1);
    }
}
//la primera vez le envio la categoría frutas
agregarPalabra(bd[pos]);

//función para desordenar las palabras. Quedarán guardadas en el arreglo desordenadas
function desordenarPalabras(){
    for(i=0;i<palabras.length;i++){
        //convertimos en un arreglo
        let palabra = palabras[i];
        palabra = palabra.split('');
        
        let palabraDesordenada;
        palabraDesordenada = palabra.sort(function(){return Math.random()-0.5});
        //convertimos el arreglo a string (ya que nos quedó letra y coma)
        palabraDesordenada = palabraDesordenada.toString();
        //quitamos las comas
        palabraDesordenada = palabraDesordenada.replace(/,/g,"");

        //controlamos que la palabra desordenada no haya quedado igual que la ordenada
        if(palabraDesordenada==palabra[i]){
            i = i-1;
        }else{
            //guardamos la palabra desordenada
            desordenadas.push(palabraDesordenada);
        }
    }
}

//función para agregar la palabra y el input
function agregarPalabras(){
    //agregamos el titulo
    let h2 = document.createElement("h2");
    h2.textContent = categorias[pos];
    document.querySelector("#container").appendChild(h2);
    for(var i = 0; i<desordenadas.length;i++){
        let div = document.createElement("div");
        div.className = "fila";
        let palabra = document.createElement("div");
        palabra.textContent = desordenadas[i];
        palabra.className = "palabra";
        div.appendChild(palabra);
        let input = document.createElement("input");
        input.id = i;
        //al input le agrego el evento onkeyup para detectar cuando se presiona una tecla
        input.setAttribute("onkeyup", "corregir("+i+")");
        div.appendChild(input);
        document.querySelector("#container").appendChild(div);
    }
}

desordenarPalabras();
agregarPalabras();

//funciòn para corregir la palabra hasta el momento ingresada
function corregir(i){
    p = document.getElementById(i).value;
    //caso que no haya ingresado nada
    if(p==""){
        return;
    }
    if(p==palabras[i]){//caso que coincida
      document.getElementById(i).className = "correcta";
      //controlamos si terminó
      controlFin();
    }else{
        document.getElementById(i).className ="";
    }
}

let btnCreado = false;
function controlFin(){
    //obtengo la cantidad de clases ‘correcta’ que hay hasta el momento
    let total = document.getElementsByClassName("correcta").length;
    if(total == cantidadPalabras && btnCreado==false){//se completaron las palabras
        let button = document.createElement("button");
        button.textContent = "Siguiente";
        button.setAttribute("onclick","siguiente()");
        document.querySelector("#container").appendChild(button);
        btnCreado = true;

        //desbloqueamos el nivel
        let niveles = document.getElementsByClassName("nivel");
        niveles[pos].classList = "nivel completado";
    }
}

function siguiente(){
    //asi limpio los arreglos palabras y desordenadas, para cargarlos con las nuevas palabras
    palabras.length = 0;
    desordenadas.length = 0;
    document.querySelector("#container").textContent ="";
    pos++;
    //controlo si termino el juego
    if(pos<bd.length){//no terminó
     btnCreado = false;
     agregarPalabra(bd[pos]);
     desordenarPalabras();
     agregarPalabras();
    }else{//terminó
        let h2 = document.createElement("h2");
        h2.textContent = "JUEGO FINALIZADO! MUY BIEN!!";
        document.querySelector("#container").appendChild(h2);
}
}
