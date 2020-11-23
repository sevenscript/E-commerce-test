






var buscar = $("#searchTable").DataTable();





$("#searchInput").keyup(function(){
    buscar.search($(this).val()).draw();

    $("body").css({
        "height":"100hv",
        "background":"rgba(0,0,0,0.5)"
    })
    if ($("#searchInput").val() == ""){
        $("body").css({
            "height":"auto",
            "background":"none"
        })

        $("#search").hide();

    } else {
        $("#search").fadeIn("fast");
    }
})


