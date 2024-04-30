// Initialize recording functionality
const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
const uploadButton = document.getElementById('uploadButton');
const uploadSavedAudioButton = document.getElementById('uploadSavedAudioButton');
const recordingStatus = document.getElementById('recordingStatus');
const alarmDateInput = document.getElementById('alarmDate');
const alarmTimeInput = document.getElementById('alarmTime');
let recorder;

// Event listener for record button
recordButton.addEventListener('click', async () => {
    recordingStatus.innerText = "Recording in progress...";
    stopButton.style.display = 'inline-block';
    recordButton.disabled = true;
    uploadButton.disabled = true;
    uploadSavedAudioButton.disabled = true;

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
        uploadSavedAudioButton.disabled = false;
        stopButton.style.display = 'none';

        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

        // Generate a unique filename
        const filename = generateUniqueFilename();

        const audioFile = new File([audioBlob], filename);

        // Get alarm date and time
        const alarmDate = alarmDateInput.value;
        const alarmTime = alarmTimeInput.value;

        // Construct alarm object
        const alarmData = {
            audioFileName: filename,
            alarmDateTime: `${alarmDate} ${alarmTime}`
        };

        // Show the upload button
        uploadButton.style.display = 'inline-block';

        uploadButton.addEventListener('click', async () => {
            await uploadFileToStorage(audioFile, alarmData);
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
    uploadSavedAudioButton.disabled = false;
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

// Function to upload a file to Firebase Storage and create an alarm
async function uploadFileToStorage(file, alarmData) {
    const storageRef = firebase.storage().ref();
    const audioRef = storageRef.child('audio/' + file.name);
    const uploadTask = audioRef.put(file);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Do nothing while uploading
        },
        async (error) => {
            console.error('Upload error:', error);
        },
        async () => {
            // Upload completed successfully
            const downloadURL = await audioRef.getDownloadURL();
            recordingStatus.innerText = "Alarm created successfully!";
            
            // Store alarm data in Firebase database
            await firebase.database().ref('alarms').push({
                audioFileName: alarmData.audioFileName,
                alarmDateTime: alarmData.alarmDateTime,
                audioURL: downloadURL // Save the URL to the database
            });
        }
    );
}

// Event listener for upload saved audio button
uploadSavedAudioButton.addEventListener('click', () => {
    const audioFileInput = document.getElementById('audioFileInput');
    audioFileInput.click(); // Click the hidden file input element
});

// Event listener for when a file is selected
document.getElementById('audioFileInput').addEventListener('change', async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        // Continue with your upload logic here, e.g., uploadSelectedFile(selectedFile);
        const alarmDate = alarmDateInput.value;
        const alarmTime = alarmTimeInput.value;

        // Construct alarm object
        const alarmData = {
            audioFileName: selectedFile.name,
            alarmDateTime: `${alarmDate} ${alarmTime}`
        };

        await uploadFileToStorage(selectedFile, alarmData);
    }
});
