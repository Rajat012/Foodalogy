var database = firebase.database();
function writeUserData() {
    
    database.ref('users/' + curUser.email).set({
      email: email,
      profile_picture : imageUrl
    });
  }