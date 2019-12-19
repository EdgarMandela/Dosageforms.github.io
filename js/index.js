$(document).ready(function(){
    $("#start").click(function(){
        $("#first").toggle();
        $("#second").show();
    });

    $("#signup").click(function(){
        var name = $("#form3").val();
        var email = $("#form2").val();
        var password=$("#form4").val();
        if(name != "" && email != "" && password != ""){
            $("#main-page").show();
        }
        else{
            alert("You need to enter all your details to proceed");
            return false;
        }
    })
});

