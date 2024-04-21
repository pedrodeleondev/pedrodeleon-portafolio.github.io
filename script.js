document.addEventListener('DOMContentLoaded', function () {
    // Configuración de cada contenedor de carpeta
    setupDragAndDrop('carpeta-container1');
    setupDragAndDrop('carpeta-container2');
    setupDragAndDrop('carpeta-container3');

    // Función para configurar el arrastre y asignar posiciones aleatorias
    function setupDragAndDrop(containerId) {
        const carpetaContainer = document.getElementById(containerId);
        let isDragging = false;
        let isMoved = false; // Variable para rastrear si se mueve
        let offsetX, offsetY;
        let clickTimeout; // Variable para manejar el temporizador del clic

        // Evento de mousedown para iniciar el arrastre
        carpetaContainer.addEventListener('mousedown', function (event) {
            isDragging = true;
            isMoved = false; // Inicializa la variable de seguimiento
            carpetaContainer.style.cursor = 'grabbing';

            // Calcular la diferencia entre el cursor y la esquina superior izquierda del contenedor
            offsetX = event.clientX - carpetaContainer.offsetLeft;
            offsetY = event.clientY - carpetaContainer.offsetTop;

            // Prevenir la selección de texto accidental
            event.preventDefault();

            // Establecer un temporizador para permitir el clic después de un breve retraso
            clickTimeout = setTimeout(function () {
                if (!isMoved) {
                    // Si no ha habido movimiento, maneja el clic
                    handleFolderClick(containerId);
                }
            }, 200); // 200 ms es el tiempo de espera
        });

        // Evento de mousemove para mover la carpeta y el texto
        document.addEventListener('mousemove', function (event) {
            if (isDragging) {
                // Calcular la nueva posición del contenedor
                let newLeft = event.clientX - offsetX;
                let newTop = event.clientY - offsetY;

                // Limitar el movimiento dentro de la ventana visible
                newLeft = Math.max(0, Math.min(window.innerWidth - carpetaContainer.offsetWidth, newLeft));
                newTop = Math.max(0, Math.min(window.innerHeight - carpetaContainer.offsetHeight, newTop));

                // Actualizar la posición del contenedor
                carpetaContainer.style.left = `${newLeft}px`;
                carpetaContainer.style.top = `${newTop}px`;

                // Marcar que ha habido movimiento
                isMoved = true;
                // Cancela el temporizador
                clearTimeout(clickTimeout);
            }
        });

        // Evento de mouseup para finalizar el arrastre
        document.addEventListener('mouseup', function () {
            if (isDragging) {
                isDragging = false;
                carpetaContainer.style.cursor = 'grab';

                // Si no se ha movido y no se ha hecho clic, verifica si el temporizador está activo
                if (!isMoved && clickTimeout) {
                    clearTimeout(clickTimeout);
                    handleFolderClick(containerId);
                }
            }
        });

        // Asignar posiciones aleatorias a la carpeta
        const maxLeft = window.innerWidth - carpetaContainer.offsetWidth;
        const maxTop = window.innerHeight - carpetaContainer.offsetHeight;
        const randomLeft = Math.random() * maxLeft;
        const randomTop = Math.random() * maxTop;

        carpetaContainer.style.left = `${randomLeft}px`;
        carpetaContainer.style.top = `${randomTop}px`;
    }

    // Función para manejar clics sin movimiento
    function handleFolderClick(containerId) {
        if (containerId === 'carpeta-container1') {
            window.location.href = 'aboutme.html';
        } else if (containerId === 'carpeta-container2') {
            window.location.href = 'contact.html';
        } else if (containerId === 'carpeta-container3') {
            window.location.href = 'technologies.html';
        }
    }
});
