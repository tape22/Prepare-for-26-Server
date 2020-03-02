(function(){
    var preloaded = window.__PRELOADED__
    if (preloaded == null) {
        return
    }
    var global = preloaded.global
    if (global == null) {
        return
    }
    var btnRegister = $("#btn-register");
    if (btnRegister == null) {
        return
    }

    $("#btn-register").click(function(e) {
        if(e) {
            e.preventDefault()
        }
        var visitor = {
            firstName: $('#edd-user-name').val().trim(),
            email: $('#edd-user-email').val().trim(),
            subject: $('#edd-user-subject').val().trim(),
            message: $('#edd-user-message').val().trim()
        }

        if(visitor.firstName.length == 0){
            alert("Enter name")
            return
        }

        if(visitor.email.length == 0){
            alert("Enter email")
            return
        }

        if(visitor.subject.length == 0){
            alert("Enter subject")
            return
        }

        if(visitor.message.length == 0){
            alert("Enter message")
            return
        }

        $.ajax({
            url: "/api/subscriber",
            type: 'POST',
            data: visitor,
            success: function(response){
                if(response.confirmation != 'success') {
                    alert("Error: "+ response.message)
                    return
                }
                alert(global.subscriber_confirmation)
            },
            error: function(response){
                console.log("Error-" + JSON.stringify(response))
            }
        })

        console.log("test-" + JSON.stringify(visitor))
    })
})()