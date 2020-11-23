
var perfilJSON = {
    "name" : "",
    "age" : "",
    "email" : "",
    "phone" : ""
};




$(document).ready(inicio);

function inicio(){
    dataLoad();
    $("#dataChangeBtn").click(changeData);
}

function dataLoad(){
    if(window.localStorage.getItem("perfil") == null){
        window.localStorage.setItem("perfil", JSON.stringify(perfilJSON));
        perfilJSON = JSON.parse(window.localStorage.getItem("perfil"));
        $("#profileYears").html(`<span id="profileYearsSpan">` + perfilJSON.age + `</span> años` );
        $("#profileEmail").html(perfilJSON.email);
        $("#profileName").html(perfilJSON.name);
        $("#profileNumber").html(`+598 <span id="profileNumberSpan">` + perfilJSON.phone + `</span>`);
    }
    else {
        let datosPerfil = JSON.parse(window.localStorage.getItem("perfil"));

        $("#profileYears").html(`<span id="profileYearsSpan">` + datosPerfil.age + `</span> años` );
        $("#profileEmail").html(datosPerfil.email);
        $("#profileName").html(datosPerfil.name);
        $("#profileNumber").html(`+598 <span id="profileNumberSpan">` + datosPerfil.phone + `</span>`);
        
    }
    
}

function changeData(){
  

    if($("#dataChangeSpan").text() == "Guardar datos personales"){
        let profileYear = parseInt($("#yearsInput").val());
        let profileEmail = $("#emailInput").val();
        let profileNumber = parseInt($("#numberInput").val());
        let profileName = $("#nameInput").val();

        perfilJSON.name = profileName;
        perfilJSON.age = profileYear;
        perfilJSON.email = profileEmail;
        perfilJSON.phone = profileNumber;
        window.localStorage.setItem("perfil", JSON.stringify(perfilJSON));
    
        $("#profileYears").html(`<span id="profileYearsSpan">` + profileYear + `</span> años` );
        $("#profileEmail").html(profileEmail);
        $("#profileName").html(profileName);
        $("#profileNumber").html(`+598 <span id="profileNumberSpan">` + profileNumber + `</span>`);
    
        $("#dataChangeSpan").text("Modificar datos personales");

    }
    else if($("#dataChangeSpan").text() == "Modificar datos personales"){
        let inputFillName = 
        `<div class="form-group">
            <label for="emailInput">Ingresar Nombre y apellido</label>
            <input type="text" class="form-control" id="nameInput" placeholder="Leopold Stotch">
            <small id="nameHelp" class="form-text text-muted"></small>
        </div>` 

        let inputFillEmail = 
        `<div class="form-group">
            <label for="emailInput">Ingresar email</label>
            <input type="email" class="form-control" id="emailInput" placeholder="ejemplo@ejmail.com">
            <small id="emailHelp" class="form-text text-muted"></small>
        </div>`   
        
        let inputFillYear = 
        `<div class="form-group">
            <label for="yearsInput">Ingresar edad</label>
            <input type="number" class="form-control" id="yearsInput" placeholder="69 años">
            <small id="yearsHelp" class="form-text text-muted"></small>
        </div>`
    
        let inputFillNumber = 
        `<div class="form-group">
            <label for="numberInput">Ingresar número telefónico</label>
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">+598</div>
                </div>
                <input type="number" class="form-control" id="numberInput" placeholder="99564871">
            </div>
        </div>`
    
        let profileYear = $("#profileYearsSpan").text();
        let profileEmail = $("#profileEmail").text();
        let profileNumber = $("#profileNumberSpan").text();
        let profileName = $("#profileName").text();
    
    
        $("#profileYears").html(inputFillYear);
        $("#yearsInput").val(profileYear);
        $("#profileEmail").html(inputFillEmail);
        $("#emailInput").val(profileEmail);
        $("#profileNumber").html(inputFillNumber);
        $("#numberInput").val(profileNumber);
        $("#profileName").html(inputFillName);
        $("#nameInput").val(profileName);
    
        $("#dataChangeSpan").text("Guardar datos personales");
    } 
}