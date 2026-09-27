document.addEventListener("DOMContentLoaded", () => {
    // Referencias a los elementos
    const step1 = document.getElementById("step-1");
    const step2 = document.getElementById("step-2");
    
    const btnNextStep = document.getElementById("btn-next-step");
    const btnStartGame = document.getElementById("btn-start-game");
    
    const appContainer = document.getElementById("app");

    // LÓGICA BOTÓN 1: Pasar de "Feliz Aniversario" a "Explicación"
    btnNextStep.addEventListener("click", () => {
        // Vibración háptica si el móvil lo permite
        if (navigator.vibrate) navigator.vibrate(50);

        // Desvanece el paso 1
        step1.classList.add("fade-out-fast");

        // Espera a que termine la animación (800ms) y cambia el display
        setTimeout(() => {
            step1.classList.add("hidden");
            step2.classList.remove("hidden");
            // Al quitar el "hidden", las animaciones CSS del paso 2 se disparan solas
        }, 800);
    });

    // LÓGICA BOTÓN 2: Salir de la portada e ir a la Puerta 1
    btnStartGame.addEventListener("click", () => {
        if (navigator.vibrate) navigator.vibrate(50);
        
        // Desvanece toda la aplicación a negro
        appContainer.classList.add("fade-out");

        // Redirige al siguiente HTML
        setTimeout(() => {
            window.location.href = "carta.html";
        }, 1200);
    });
}); 