let a = document.getElementById('login')
a.addEventListener('click', login)

let b = document.getElementById('submit')
b.addEventListener('click', submit)


function login() {
    var em_check = document.getElementById('email').value
    var psw_check = document.getElementById('password').value
    let submitobj=[];
    if (em_check === "") {
        alert("Email cannot be blank")
    } else {
        if (psw_check === "") {
            console.log("Please fill your password")
        } 
        else {
            let submit = localStorage.getItem('submit')
            let check = 0;
             if(submit!=null){
                submitobj = JSON.parse(submit);
                submitobj.forEach(element => {
                    if(element[0]==em_check && element[1]==psw_check){
                        alert("Account Found");
                        check=1;
                    } 
                });
                if(!check){
                    alert("Incorrect Credentials")
                }
            }
            else {
                alert("Account not found")
            }
        }
    }
}

function submit() {
    let em = document.getElementById('email').value
    let psw = document.getElementById('password').value
    let submitobj=[];
    if (em === "") {
        alert("Email cannot be blank")
    } else {
        if (psw === "") {
            console.log("Password cannot be blank")
        }
         else {
            let confirm = ValidateEmail(em)
            if (confirm === true) {
                let recheck = ValidatePassword(psw)
                if (recheck === true) {
                    let submit = localStorage.getItem('submit')
                    let check = 0;
                    if(submit!=null){
                        submitobj = JSON.parse(submit);
                        submitobj.forEach(element => {
                            if(element[0]==em){
                                alert("Account Already Taken");
                                check=1;
                            } 
                        });
                    }
                     if(!check){
                        submitobj.push([em,psw]); 
                        localStorage.setItem('submit',JSON.stringify(submitobj));
                        alert("Account Created");
                    }
                }
            }
        }
    }
}

function ValidateEmail(text) {
    var emailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (text.match(emailformat)) {
        return true
    } else {
        console.log("You have entered an invalid email address!")
        return false
    }
}

function ValidatePassword(text) {
    if (text.length < 8) {
        console.log("Password is too small")
        return false
    }
    if (text.length > 14) {
        console.log("Password is too big")
        return false
    }

    var i
    var lowercase = 0
    var uppercase = 0
    var number = 0
    var symbol = 0

    // Allowed symbols = ['@', '!', '_', '#']

    for (i = 0; i < text.length; i++) {
        var tester = text.charCodeAt(i)

        if (tester >= 48 && tester <= 57) {
            number += 1
        }
        if (tester >= 65 && tester <= 90) {
            uppercase += 1
        }
        if (tester >= 97 && tester <= 112) {
            lowercase += 1
        }
        if (tester === 33 || tester === 64 || tester === 46 || tester === 35) {
            symbol += 1
        }
    }

    if (lowercase !== 0 && number !== 0 && uppercase !== 0 && symbol !== 0) {
        return true
    } else {
        if (lowercase === 0) {
            alert("Password should contain lowercases")
        } else if (number === 0) {
            alert("Password should contain numbers")
        } else if (uppercase === 0) {
            alert("Password should contain uppercases")
        } else if (symbol === 0) {
            alert("Password should contain symbols[@!#.]")
        } else {
            alert("Password should be a combination")
        }
    }
}
