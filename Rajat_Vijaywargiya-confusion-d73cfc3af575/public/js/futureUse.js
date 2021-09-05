var nam = document.getElementById('Forname2').value;

function uploadimg() {
    var metadata = {
        contentType: 'image/jpeg'
    };
    var file = document.getElementById("files").files[0];
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var storage = firebase.storage();
    var storageRef = storage.ref();
    if (nam) {
        var thisref = storageRef.child('users/' + nam + '.jpg').put(file, metadata);
        thisref.on("state_changed", function(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById("progress").value = percentage;
            document.getElementById("status").innerHTML = Math.floor(percentage);
            console.log("Uploading");
        }, function(error) {}, function() {
            thisref.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                document.getElementById("url").value = downloadURL;
                alert("File Uploaded Successfully!");
            });
        });
    } else {
        document.getElementById('message3').textContent = "Please enter a name";
    }
}

/*  
<div class="md-form1">
Profile Image:
<input type="file" name="files[]" id="files" required>
<input type="hidden" name="url" id="url">
<button type="button" onclick="uploadimg()">Upload File</button>
<span id="message3" class="text-danger"></span>
<br><br>
<progress value="0" max="100" id="progress"></progress> Upload Status : <strong id="status">0</strong>%<br><br>
</div> 
*/