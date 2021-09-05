var curUser = "";

const successNotification = window.createNotification({
    theme: "success",
    showDuration: 3000,
    positionClass: "nfc-bottom-right",
});
const warningNotification = window.createNotification({
    theme: "warning",
    showDuration: 3000,
    positionClass: "nfc-bottom-right",
});
const errorNotification = window.createNotification({
    theme: "error",
    showDuration: 3000,
    positionClass: "nfc-bottom-right",
});

function login() {
    let email = document.getElementById("Formail1").value;
    let password = document.getElementById("Forpass1").value;
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {

            var user = userCredential.user;
            console.log(user);
            $('#login').modal('hide');
            $('.modal-backdrop').remove();
            successNotification({ message: "Logged In Successfully" });
        })
        .catch((error) => {
            console.log(error.code);
            errorNotification({ message: error.message });
        });
}

var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
    firebase
        .auth()

    .signInWithPopup(provider)
        .then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
            console.log(user);
            $('#login').modal('hide');
            document.getElementById('avatar').setAttribute('src', user.photoURL);
            successNotification({ message: "Logged In Successfully" });
        })
        .catch(function(error) {
            console.log(error.code);
            errorNotification({ message: error.message });
        });
}

firebase.auth().onAuthStateChanged(function(user) {
    var a = document.getElementById("loggedout");
    var b = document.getElementById("loggedin");

    if (user) {
        curUser = user;
        a.style.display = "flex";
        b.style.display = "none";
        if (user.photoURL) {
            document.getElementById('img01').setAttribute('src', user.photoURL);
            document.getElementById('avatar').setAttribute('src', user.photoURL);
        }
    } else {
        curUser = "";
        a.style.display = "none";
        b.style.display = "block";
        document.getElementById('avatar').setAttribute('src', 'img/avatar.png');
    }
});

function signup() {
    if (myfunc()) {
        var email = document.getElementById("Formail2").value;
        var password = document.getElementById("Forpass2").value;

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log(user);
                $('#login').modal('hide');
                successNotification({ message: "Account Created Successfully!" });
            })
            .catch((error) => {
                console.log(error.code);
                errorNotification({
                    message: error.message,
                });
            });
    }
}

function myfunc() {
    var a = document.getElementById("Forpass2").value;
    console.log(a.length);
    var b = document.getElementById("Forpass3").value;
    if ((a.length <= 5) || (a.length >= 20)) {
        document.getElementById("message1").innerHTML = "Password length must be between 5-20";
        return false;
    } else {
        document.getElementById("message1").innerHTML = "";
    }

    if (a != b) {
        document.getElementById("message2").innerHTML = "Passwords do not match";
        return false;
    } else {
        document.getElementById("message2").className = "text-success";
        document.getElementById("message2").innerHTML = "Passwords matched sucessfully";
        return true;
    }
}

function signout() {
    firebase.auth().signOut().then(() => {
        document.getElementById('avatar').setAttribute('src', 'img/avatar.png');
        document.getElementById('img01').setAttribute('src', 'img/avatar.png');
        successNotification({ message: "Logged Out Successfully!" });
    }).catch((error) => {});
}

function loggedout() {
    firebase.auth().signOut().then(() => {
        document.getElementById('avatar').setAttribute('src', 'img/avatar.png');
        successNotification({ message: "Logged Out Successfully!" });
        window.location = './index.html';
    }).catch((error) => {});
}