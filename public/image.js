const storage = firebase.storage();

document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const storageRef = storage.ref();
        const imagesRef = storageRef.child('images/' + file.name);
        
        imagesRef.put(file).then(function(snapshot) {
            console.log('Image uploaded successfully!');
            // You can do something after successful upload, like displaying a message to the user
        }).catch(function(error) {
            console.error('Error uploading image:', error);
        });
    } else {
        console.error('No file selected');
    }
});