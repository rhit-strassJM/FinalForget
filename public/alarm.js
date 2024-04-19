// Initialize recording functionality
const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
const uploadButton = document.getElementById('uploadButton');
const recordingStatus = document.getElementById('recordingStatus');
let recorder;

// Event listener for record button
recordButton.addEventListener('click', async () => {
    recordingStatus.innerText = "Recording in progress...";
    stopButton.style.display = 'inline-block';
    recordButton.disabled = true;
    uploadButton.disabled = true;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener("stop", async () => {
        recordingStatus.innerText = "Recording completed!";
        recordButton.disabled = false;
        uploadButton.disabled = false;
        stopButton.style.display = 'none';

        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

        // Generate a unique filename
        const filename = generateUniqueFilename();

        const audioFile = new File([audioBlob], filename);

        // Show the upload button
        uploadButton.style.display = 'inline-block';

        uploadButton.addEventListener('click', async () => {
            const storageRef = firebase.storage().ref();
            const audioRef = storageRef.child('audio/' + audioFile.name);
            await audioRef.put(audioFile);
            recordingStatus.innerText = "Audio uploaded successfully!";
        });
    });

    recorder = mediaRecorder;
    mediaRecorder.start();
});

// Event listener for stop button
stopButton.addEventListener('click', () => {
    recorder.stop();
    recordButton.disabled = false;
    uploadButton.disabled = false;
    stopButton.style.display = 'none';
    recordingStatus.innerText = "Recording stopped.";

    // Hide the upload button
    uploadButton.style.display = 'none';
});

// Function to generate a unique filename
function generateUniqueFilename() {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 8);
    return 'audio_' + timestamp + '_' + randomString + '.wav';
}
