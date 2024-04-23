const storage = firebase.storage();

document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const storageRef = storage.ref();
        const imagesRef = storageRef.child('images/' + file.name);
        
        imagesRef.put(file).then(function(snapshot) {
            console.log('Image uploaded successfully!');
            // Reset file input and display upload message
            document.getElementById('fileInputLabel').innerHTML = 'Choose file';
            document.getElementById('uploadMessage').innerHTML = 'Image uploaded successfully!';
        }).catch(function(error) {
            console.error('Error uploading image:', error);
            // Display error message if upload fails
            document.getElementById('uploadMessage').innerHTML = 'Error uploading image: ' + error.message;
        });
    } else {
        console.error('No file selected');
    }
});
