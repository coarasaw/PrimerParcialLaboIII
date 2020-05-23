var http = new XMLHttpRequest(); 
window.onload = function(){  
        var modificar = document.getElementById("btnModificar");
        modificar.onclick = ejecutarPost;

        http.onreadystatechange = callback;
        http.open("GET","http://localhost:3000/materias",true);
        http.send();    
}

function callback(){
        if (http.readyState==4 && http.status==200) {
            armarGrilla(JSON.parse(http.responseText));
        }
}

function armarGrilla(jsonObj){
    //console.log("Entro Armar Tabla");

    var tbody = document.getElementById("tbody");
    var personas = jsonObj;  //JSON.parse(jsonObj);
    
    for (var i = 0; i < personas.length; i++){    
       //Creo la fila
       var tr = document.createElement("tr");
       //Creamos las colunmnas
       var td4 = document.createElement("td");  
       var nodoText4 = document.createTextNode(personas[i].id);    
       td4.appendChild(nodoText4);
       tr.appendChild(td4);

       var td = document.createElement("td");  
       var nodoText = document.createTextNode(personas[i].nombre);      
       td.appendChild(nodoText);
       td4.style.display="none";
       tr.appendChild(td);

       var td1 = document.createElement("td");  
       var nodoText1 = document.createTextNode(personas[i].cuatrimestre);      
       td1.appendChild(nodoText1);
       tr.appendChild(td1);

       var td2 = document.createElement("td");  
       var nodoText2 = document.createTextNode(personas[i].fechaFinal);      
       td2.appendChild(nodoText2);
       tr.appendChild(td2);

       var td3 = document.createElement("td");  
       var nodoText3 = document.createTextNode(personas[i].turno);      
       td3.appendChild(nodoText3);
       tr.appendChild(td3);
        
       tr.addEventListener("dblclick",clickGrilla);
       tbody.appendChild(tr);
    }     
} 

function clickGrilla(event){

    var contAgregar = document.getElementById("contAgregar");
    var btn = document.getElementById("btn");

    btn.hidden = true;
    contAgregar.hidden = false;
    
    var trClick = event.target.parentNode; 
    document.getElementById("id").value = trClick.childNodes[0].innerHTML;
    document.getElementById("name").value = trClick.childNodes[1].innerHTML;
    document.getElementById("cuatrimestre").value = trClick.childNodes[2].innerHTML;
    // Transfomo la fecha
    fecha = trClick.childNodes[3].innerHTML;
    fechaFormato = fecha.substr(6,4)+"-"+fecha.substr(3,2)+"-"+fecha.substr(0,2);   
    document.getElementById("idfecha").value = fechaFormato;
    document.getElementById("idTurno").value = trClick.childNodes[4].innerHTML;
    // Selecciona el turno en un boton radio
    if(document.getElementById("idTurno").value == "Mañana"){
          document.querySelector('#radiobuttonset > [value="Mañana"]').checked = true;
    }
    else{
        document.querySelector('#radiobuttonset > [value="Noche"]').checked = true;
    }
    
    document.getElementById("Scuatrimestre").value = trClick.childNodes[2].innerHTML;
    
}

function ejecutarPost(){
    var httpPost = new XMLHttpRequest();

    var id = document.getElementById("id").value;
    var nombreString = document.getElementById("name").value;
    var cuatrimestreString = document.getElementById("cuatrimestre").value;
    var fechaString = document.getElementById("idfecha").value;
    //Fecha
    //fechaFormato = fechaString.substr(0,2)+"/"+fechaString.substr(3,2)+"/"+fechaString.substr(6,4); 
    //fechaString = fechaFormato;
    
    var radiobutton = document.querySelector('input[name = "radiobutton"]:checked').value;
    var trunoString = radiobutton;

    //Validación de Datos
    if(nombreString == "" || nombreString.length < 6){
        document.getElementById("name").className="error";
        alert("Nombre es obligatorios / minimo 6 caracteres");
        return ;
    }
    else {
        document.getElementById("name").className="sinError";
    }

    httpPost.onreadystatechange=function(){
        if(httpPost.readyState == 4 && httpPost.status == 200){
                alert(httpPost.responseText);
            }  
    }

    httpPost.open("POST","http://localhost:3000/editar",true);
    httpPost.setRequestHeader("Content-Type","application/json");
    var json = {"id":id,"nombre":nombreString,"cuatrimestre":cuatrimestreString,"fechaFinal":fechaString,"turno":trunoString};
    httpPost.send(JSON.stringify(json));    
    
    /* tbody.innerHTML = tbody.innerHTML +
        "<tr>" +
            "<td hidden>" + id + "</td>" +
            "<td>" + nombreString + "</td>" +
            "<td>" + cuatrimestreString + "</td>" +
            "<td>" + fechaString + "</td>" +
            "<td>" + trunoString + "</td>" +
        "</tr>" ; */
        
        cerrar();
}

function eliminar(){
    var httpPost = new XMLHttpRequest();

    var id = document.getElementById("id").value;
    
    httpPost.onreadystatechange=function(){
        if(httpPost.readyState == 4 && httpPost.status == 200){
            alert(httpPost.responseText);
        }
    }
    httpPost.open("POST","http://localhost:3000/eliminar",true);
    httpPost.setRequestHeader("Content-Type","application/json");
    var json = {"id":id};
    httpPost.send(JSON.stringify(json));    

    tbody.innerHTML = tbody.innerHTML +
        "<tr>" +
            "<td hidden>" + id + "</td>" +
            "<td>" + nombreString + "</td>" +
            "<td>" + cuatrimestreString + "</td>" +
            "<td>" + fechaString + "</td>" +
            "<td>" + trunoString + "</td>" +
        "</tr>" ;
        
        cerrar();
}

function abrir(){
    var contAgregar = document.getElementById("contAgregar");
    var btn = document.getElementById("btn");

    btn.hidden = true;
    contAgregar.hidden = false;
}

function cerrar(){
    var contAgregar = document.getElementById("contAgregar");
    var btn = document.getElementById("btn");
    
    btn.hidden = false;
    contAgregar.hidden = true;
    //document.getElementById("contenedor_carga").hidden = false;
    
}
