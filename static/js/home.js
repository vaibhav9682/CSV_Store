const fileInput = document.getElementById('csvFile');
const fileInfoContainer = document.getElementById('fileInfoContainer');

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileInfo = `
          <p>Selected File: ${file.name}</p>
          <p>File Size: ${formatBytes(file.size)}</p>
          <p>File Type: ${file.type}</p>
        `;
        fileInfoContainer.innerHTML = fileInfo;
    } else {
        fileInfoContainer.innerHTML = '<p>No file selected.</p>';
    }
});

// Function to format file size 

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}