const ORDER_ASC_BY_PRICE = "AB";
const ORDER_DESC_BY_PRICE = "BA";
const ORDER_BY_PROD_RELEVANCE = "Relev.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;

$(document).ready(inicio);

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE){
        result = array.sort(function(a, b){
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);

            if (aPrice > bPrice) {return 1;}
            if (aPrice < bPrice) {return -1;}
            return 0;
        });
    }
    else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b){
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);

            if (aPrice > bPrice) {return -1;}
            if (aPrice < bPrice) {return 1;}
            return 0;
        });
    }
    else if (criteria === ORDER_BY_PROD_RELEVANCE){
        result = array.sort(function(a, b){
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);


            if (aSoldCount > bSoldCount) {return -1;}
            if (aSoldCount < bSoldCount) {return 1;}
            return 0;
        });
    }

    return result;
}
function showProductsList(){
    
    let htmlContentToAppend = "";

    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){
                htmlContentToAppend += 
                `<div class="col-lg-4">
                    <div class="card-style custom-card card mb-4 shadow-lg">
                    <img src="` + product.imgSrc + `"alt="` + product.name + `" class="img-thumbnail image-card-style">
                    <div class="card-body"style="height: 10rem;">
                        <div class="row">  
                        <div class="col-7">
                            <h5 class="card-title ">`+ product.name  +`</h5>
                        </div> 
                        <div class="col-5 " style="text-align:right">
                            <p> `+ product.currency + " " + product.cost + `</p>
                        </div> 
                        </div>  
                        <p class="card-text">` + product.description + `</p>
                        </div>
                        <a href="product-info.html" class="btn btn-dark">Ver producto</a>                 
                    </div>
                </div>`
            }
        $("#productsList").html(htmlContentToAppend);
    }  
}
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList();
}
function inicio(){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });
    
    $("#sortAscPrice").click(sortAscPrice);
    $("#sortDescPrice").click(sortDescPrice);
    $("#sortByRelev").click(sortByRelev);
    $("#rangeFilterPrice").click(rangeFilterPrice);
    $("#clearRangeFilterPrice").click(clearRangeFilterPrice);
}


function sortAscPrice(){
    sortAndShowProducts(ORDER_ASC_BY_PRICE);
}
function sortDescPrice(){
    sortAndShowProducts(ORDER_DESC_BY_PRICE);
}
function sortByRelev(){
    sortAndShowProducts(ORDER_BY_PROD_RELEVANCE);
}
function rangeFilterPrice(){
    minPrice = $("#rangeFilterPriceMin").val();
    maxPrice = $("#rangeFilterPriceMax").val();

    if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
        minPrice = parseInt(minPrice);
    }
    else{
        minPrice = undefined;
    }

    if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
        maxPrice = parseInt(maxPrice);
    }
    else{
        maxPrice = undefined;
    }

    showProductsList();
}
function clearRangeFilterPrice(){
    $("#rangeFilterPriceMin").val("");
    $("#rangeFilterPriceMax").val("");

    minPrice = undefined;
    maxPrice = undefined;

    showProductsList();
}


