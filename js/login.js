

$("#btnLogin").click(function () {
  console.log("usuariodeprueba@user.com");
  console.log("pass: 12345678");
  

  $("#mensaje").text("");
 
  camposVacios();
  validarUsuario();
  $("#inputEmail").val("");
  $("#inputPassword").val("");
  
});

$(".user-nav-span").text(sessionStorage.getItem("user"));

function validarUsuario() {
  var user = $("#inputEmail").val();
  var password = $("#inputPassword").val();
  if (user == "usuariodeprueba@user.com" && password == 12345678) {
    window.sessionStorage.setItem("user", $("#inputEmail").val());
    location.href = "inicio.html";
  };
  if (user != "usuariodeprueba@user.com" && user != "" || password != 12345678 && password != "") {
    $("#mensaje").html("El usuario y/o la contraseña  <br>son incorrectos");
    alert("user: usuariodeprueba@user.com | pass: 12345678");
  }
  if (user == "" || password == "") {
    $("#mensaje").html("Los campos no pueden <br>quedar vacios");
  }
}

function camposVacios() {
  let user = $("#inputEmail").val();
  let password = $("#inputPassword").val();

  if (user == "" || password == "") {
    $("#mensaje").html("Los campos no pueden <br>quedar vacios");
  }
}

$("#logOut").on("click", function(){
  sessionStorage.clear();
})

