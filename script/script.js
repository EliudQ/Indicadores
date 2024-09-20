        // Aquí puedes agregar la lógica para procesar el archivo
document.getElementById('fileInput').addEventListener('change', function(event) {
    const fileName = event.target.files[0]?.name || 'No se ha seleccionado un archivo';
    document.getElementById('fileName').innerText = fileName;
});

document.getElementById('startButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
        alert('Archivo seleccionado: ' + fileInput.files[0].name);
        // Aquí puedes agregar la lógica para procesar el archivo
    } else {
        event.preventDefault();
        alert('Por favor, selecciona un archivo CSV antes de comenzar.');
    }
});
