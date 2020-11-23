
var product = {};

var comment = {};

var relatedProduct = {};

var userImg1 = "https://thispersondoesnotexist.com/image";
var userImg2 = "https://thishorsedoesnotexist.com";
var userImg3 = "https://thiscatdoesnotexist.com";
var userImg4 = "https://thisartworkdoesnotexist.com";
var userImg = [userImg1, userImg2, userImg3, userImg4];

$(document).ready(inicio);

//Esta función se encarga de mofidicar el DOM, agregando a este mismo una lista de imagenes relacionadas al producto visualizado

function showImagesGallery(array) {
  let htmlContentToAppend = "";
  let htmlContentToAppend2 = "";

  for (let i = 0; i < array.length; i++) { 
    let imageSrc = array[i];
    htmlContentToAppend = "";
    htmlContentToAppend += `<div class="carousel-item" id="carousel` + i + `">
                              <img src="` + imageSrc + `" class="d-block w-100" alt="...">
                            </div>`;

    $("#productImagesGallery").append(htmlContentToAppend);
  }
  $("#carousel0").addClass("active"); 


  for (let i = 0; i < array.length; i++) {
    htmlContentToAppend2 = "";
    htmlContentToAppend2 += `<li data-target="#carouselExampleIndicators" data-slide-to="` + i + `" id="carouselLi` + i + `"></li>`;

    $("#productImagesGalleryLi").append(htmlContentToAppend2);
  }
  $("#carouselLi0").addClass("active");


}

//Esta función se encarga de mofidicar el DOM, agregando a este mismo una lista de comentarios relacionados al producto visualizado


function showProductCommentary(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let comments = array[i];
    let img = userImg[i];

    htmlContentToAppend +=
      `
                    <div class="mb-2 mt-3 list-group-item shadow-lg">
                        <div class="row">
                            <div class="col-1 img-box">
                                <img src="` +
      img +
      `" class="img-user img-thumbnail">
                            </div>
                            <div class="comment-container col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">` +
      comments.user +
      `</h4>
          <small class="text-muted">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star star2` +
      i +
      `"></span>
          <span class="fa fa-star star3` +
      i +
      `"></span>
          <span class="fa fa-star star4` +
      i +
      `"></span>
          <span class="fa fa-star star5` +
      i +
      `"></span>
          </small>
          </div> 
 
                                
                                <p class="mb-1">` +
      comments.description +
      `</p>
                                <small class="text-muted">` +
      comments.dateTime +
      `</small>
                            </div> 
                        
                        </div>
                    </div>`;
    $("#commentarys").html(htmlContentToAppend);
  }
}

//Esta función se encarga de mofidicar el DOM, agregando a este mismo una lista de imagenes relacionadas al producto visualizado


function starScore(array) {
  for (let i = 0; i < array.length; i++) {
    let number = array[i].score;

    let selector = ".star2" + i;
    let selector2 = ".star3" + i;
    let selector3 = ".star4" + i;
    let selector4 = ".star5" + i;

    if (number == 2) {
      $(selector).addClass("checked");
    }
    if (number == 3) {
      $(selector).addClass("checked");
      $(selector2).addClass("checked");
    }
    if (number == 4) {
      $(selector).addClass("checked");
      $(selector2).addClass("checked");
      $(selector3).addClass("checked");
    }
    if (number == 5) {
      $(selector).addClass("checked");
      $(selector2).addClass("checked");
      $(selector3).addClass("checked");
      $(selector4).addClass("checked");
    }
  }
}

//Esta función se encarga de mofidicar el DOM, agregando a este mismo una lista de productos relacionados al producto visualizado


function showRelatedProducts(){
  let relatedPosition = product.relatedProducts;
  let htmlContentToAppend = "";

  for (let i = 0; i < relatedPosition.length; i++){
    let pos = "";
    pos = relatedPosition[i];

    htmlContentToAppend += `
                <br>
                <div class="mb-4 card-style custom-card card mr-4 mb-2 shadow-lg ml-3" style="width: 18rem;">
                  <img src="` + relatedProduct[pos].imgSrc   + `"alt="` + relatedProduct[pos].name  + `" class="img-thumbnail image-card-style">
                  <div class="card-body" >
                    <div class="row">  
                      <div class="col-7">
                        <h5 class="card-title ">`+ relatedProduct[pos].name  +`</h5>
                      </div> 
                      <div class="col-5 " style="text-align:right">
                        <p> `+ relatedProduct[pos].currency + " " + relatedProduct[pos].cost  + `</p>
                      </div> 
                    </div>  
                      <p class="card-text">` + relatedProduct[pos].description  + `</p>
                      </div>
                      <a href="product-info.html" class="btn btn-dark">Ver producto</a> 
                  
                </div>
                `;
    $("#productRelated").html(htmlContentToAppend);

  }
}

//Esta función es la encargada de cargar los elementos HTML y eventos relacionados a la sección de información del producto

function inicio() {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data;
      $("#productName").html(product.name);
      $("#productDescription").html(product.description);
      $("#productCost").html(product.currency + " " + product.cost);
      $("#productSold").html(product.soldCount);
      $("#productCategory").html(product.category);
      showImagesGallery(product.images);
    }
  });

  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      comment = resultObj.data;

      showProductCommentary(comment);
      starScore(comment);
    }
  });
  
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      relatedProduct = resultObj.data;

      showRelatedProducts();
    }
    });



    $("#doComment").click(comentar);
}


//Esta función se encarga de mofidicar el DOM, agregando a este mismo comentarios creados por el usuario a traves de la interface para comentar dicho producto


function comentar() {
  let commentary = $("#commentText").val();

  if (commentary != "") {
    $("#commentVoid").text("");
    let user = sessionStorage.getItem("user");
    let img = "https://thispersondoesnotexist.com/image?1599265447976";
    userImg.unshift(img);
    let score = $("#star-select").val();
    var currentdate = new Date();
    var datetime =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate() +
      "  " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    var newComment = {
      score: score,
      description: commentary,
      user: user,
      dateTime: datetime,
    };

    comment.unshift(newComment);

    showProductCommentary(comment);
    starScore(comment);
    $("#commentText").val("");
  } else {
    $("#commentVoid").text("El campo no puede quedar vacío");
  }
}
