document.addEventListener("DOMContentLoaded", () => {
    // --- [PERSONALIZAR] CONFIGURACIÓN DE RESPUESTAS ---
    // Puedes poner varias opciones válidas por si lo escribe distinto.
    const respuestasValidas = ["elafonisi", "elafonissi", "playa de elafonisi"];
    // --------------------------------------------------

    const btnUnlock = document.getElementById("btn-unlock");
    const inputRiddle = document.getElementById("riddle-input");
    const errorText = document.getElementById("error-message");
    const lockScreen = document.getElementById("lock-screen");
    const unlockedScreen = document.getElementById("unlocked-screen");
    const bgMedia = document.getElementById("bg-media");
    const bgDarkness = document.getElementById("bg-darkness");
    const btnNextDoor = document.getElementById("btn-next-door");
    const appContainer = document.getElementById("app-puerta1");

    // Función para limpiar el texto (quita acentos y lo hace minúscula)
    function normalizarTexto(texto) {
        return texto.toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .trim();
    }

    // Función que comprueba si acertó
    function verificarRespuesta() {
        const respuestaUsuario = normalizarTexto(inputRiddle.value);
        
        // Comprueba si la respuesta del usuario está en nuestro array de válidas
        const esCorrecta = respuestasValidas.some(val => normalizarTexto(val) === respuestaUsuario);

        if (esCorrecta) {
            // ¡ACERTÓ!
            if (navigator.vibrate) navigator.vibrate([30, 50, 30]); // Doble vibración feliz
            
            // Ocultar error por si estaba visible
            errorText.classList.remove("show");

            // Magia: Quitamos el blur de la foto de fondo y la aclaramos
            bgMedia.classList.remove("blur-background");
            bgMedia.classList.add("unblurred");
            bgDarkness.classList.remove("opacity-heavy");
            bgDarkness.classList.add("opacity-light");

            // Hacemos fade-out de la pantalla de bloqueo
            lockScreen.classList.add("fade-out-fast");

            // A los 800ms, mostramos la pantalla del recuerdo
            setTimeout(() => {
                lockScreen.classList.add("hidden");
                unlockedScreen.classList.remove("hidden");
                // Añadimos una animación sutil de entrada al recuerdo
                unlockedScreen.style.animation = "fadeInUp 1s forwards"; 
            }, 800);

        } else {
            // ¡FALLÓ!
            if (navigator.vibrate) navigator.vibrate(200); // Vibración larga de error
            
            // Mostrar texto de error
            errorText.classList.add("show");
            
            // Animar temblor en el input
            inputRiddle.classList.remove("shake");
            void inputRiddle.offsetWidth; // Truco mágico para reiniciar la animación en JS
            inputRiddle.classList.add("shake");
        }
    }

    // Escuchar el clic en el botón
    btnUnlock.addEventListener("click", verificarRespuesta);

    // Escuchar si pulsa "Enter" en el teclado del móvil
    inputRiddle.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Evita que se recargue la página por error
            inputRiddle.blur(); // Oculta el teclado del móvil
            verificarRespuesta();
        }
    });

    // --- TRANSICIÓN A LA SIGUIENTE PUERTA ---
    btnNextDoor.addEventListener("click", () => {
        if (navigator.vibrate) navigator.vibrate(50);
        appContainer.classList.add("fade-out");

        setTimeout(() => {
            // Mandaremos a la puerta 2 (aún no la hemos creado)
            window.location.href = "puerta2.html";
        }, 1200);
    });
});