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

// FILTRADO Y DESCARGUE

document.getElementById('startButton').addEventListener('click', function () {
    const fileInput = document.getElementById('fileInput');

    // Asegura de que se haya seleccionado un archivo
    if (!fileInput.files.length) {
        alert('Por favor selecciona un archivo CSV.');
        return;
    }

    const file = fileInput.files[0];

    // Verifica que el archivo sea en formato .CSV
    const fileExtension = file.name.split('.').pop();
    if (fileExtension !== 'csv') {
        alert('Solo se permiten archivos CSV.');
        return;
    }

    // Usar PapaParse para leer el archivo CSV y que sea entendida y manipulable para el programa 
    Papa.parse(file, {
        header: true,  // Leer la primera fila como encabezados
        complete: function(results) {
            const data = results.data;

            // Validar que el archivo contiene la columna "Nombre"
            if (!data[0].hasOwnProperty('Asignado a: - Técnico')) {
                alert('El archivo CSV no contiene la columna "Nombre".');
                return;
            }

            // Procesar la columna "Nombre" y crear la nueva columna "Cod_Nom"
            const modifiedData = data.map(row => {
                const asignado = row['Asignado a: - Técnico'];  // Obtener valor de "Nombre"

                if (asignado) {
                    // Usar expresión regular para extraer el código entre paréntesis
                    const match = asignado.match(/\((\d+)\)/);
                    row['Cod_Nom'] = match ? match[1] : '';  // Capturar solo los números
                    row['Asignado a: - Técnico'] = asignado.replace(/\s*\(\d+\)/, '');  // Quitar el cogodi del nombre
                }

                return row;
            });

            // Convertir los datos modificados de vuelta a CSV
            const csv = Papa.unparse(modifiedData);

            // Crear un blob y descargar el CSV modificado
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Archivo filtrado.csv';  // Nombre del archivo descargado
            document.body.appendChild(link);  // Agregar el link temporalmente al DOM
            link.click();  // Simular click para iniciar la descarga
            document.body.removeChild(link);  // Remover el link después de la descarga
        }
    });
});
