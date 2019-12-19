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
            $(".navbar").show();
            $("#buong").show();
            $("#second").hide();
        }
        else{
            alert("You need to enter all your details to proceed");
            return false;
        }
    })

    $("#go-to-main").click(function(){
        var name = $("#name").val();
        var days = $("#days").val();
        var pills = $("#pills").val();
        var time = $("#times").val();
        $(".timer").show();
        $("#buong").hide();
        $(".navbar").hide();

        $("#showName").text(name);
        $("#showDays").text(days);
        $("#showPills").text(pills);
        $("#showTimes").text(time);
    })

    $("#showRive").click(function(){
        $("#rivescript").show();

    })

    
});

