document.addEventListener("DOMContentLoaded", () => {
    const compartirWhatsApp = document.querySelector("#compartirWhatsApp");

    const formatearFechaHora = (fechaHora) => {
        if (!fechaHora) return "No especificado";
        const fecha = new Date(fechaHora);
        const opcionesFecha = { day: "2-digit", month: "2-digit", year: "numeric" };
        const opcionesHora = { hour: "2-digit", minute: "2-digit" };
        return `${fecha.toLocaleDateString("es-ES", opcionesFecha)} ${fecha.toLocaleTimeString("es-ES", opcionesHora)}`;
    };

    const obtenerDatosFormularios = () => {
        const fechaCita = formatearFechaHora(document.querySelector("#fechaCita")?.value);
        const especialista = document.querySelector("#especialista")?.value || "No especificado";
        const motivo = document.querySelector("#motivo")?.value || "No especificado";

        const medicamento = document.querySelector("#medicamento")?.value || "No especificado";
        const dosis = document.querySelector("#dosis")?.value || "No especificado";
        const frecuencia = document.querySelector("#frecuencia")?.value || "No especificado";

        const tipoDocumento = document.querySelector("#tipoDocumento")?.value || "No especificado";
        const fechaDocumento = formatearFechaHora(document.querySelector("#fechaDocumento")?.value);

        const nombreMedico = document.querySelector("#nombreMedico")?.value || "No especificado";
        const especialidadMedico = document.querySelector("#especialidadMedico")?.value || "No especificado";
        const contactoMedico = document.querySelector("#contactoMedico")?.value || "No especificado";

        const nota = document.querySelector("#nota")?.value || "No especificado";

        return `
        CITAS MÉDICAS:
        - Fecha y hora: ${fechaCita}
        - Especialista: ${especialista}
        - Motivo: ${motivo}

        MEDICACIÓN:
        - Medicamento: ${medicamento}
        - Dosis: ${dosis}
        - Frecuencia: ${frecuencia}

        DOCUMENTOS MÉDICOS:
        - Tipo de documento: ${tipoDocumento}
        - Fecha y hora: ${fechaDocumento}

        MÉDICOS:
        - Nombre: ${nombreMedico}
        - Especialidad: ${especialidadMedico}
        - Contacto: ${contactoMedico}

        NOTAS DE SALUD:
        - Nota: ${nota}

        Compartido desde la aplicación Mis citas Médicas By Gerardo López.
        `;
    };

    const actualizarEnlaces = () => {
        const mensaje = obtenerDatosFormularios();
        if (compartirWhatsApp) {
            compartirWhatsApp.href = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
        }
    };

    document.querySelectorAll("input, textarea, select").forEach((input) => {
        input.addEventListener("input", actualizarEnlaces);
    });

    actualizarEnlaces();

    const inputArchivo = document.querySelector("#archivo");
    const archivoSeleccionado = document.querySelector("#archivoSeleccionado");

    if (inputArchivo && archivoSeleccionado) {
        inputArchivo.addEventListener("change", () => {
            if (inputArchivo.files.length > 0) {
                archivoSeleccionado.textContent = `Archivo seleccionado: ${inputArchivo.files[0].name}`;
            } else {
                archivoSeleccionado.textContent = "No se ha seleccionado ningún archivo.";
            }
        });
    }

    const tipoDocumento = document.querySelector("#tipoDocumento");
    const fechaDocumento = document.querySelector("#fechaDocumento");
    const guardarDocumento = document.querySelector("#guardarDocumento");
    const mensajeDocumento = document.querySelector("#mensajeDocumento");

    if (guardarDocumento && tipoDocumento && fechaDocumento && mensajeDocumento) {
        guardarDocumento.addEventListener("click", () => {
            if (tipoDocumento.value && fechaDocumento.value) {
                const fechaFormateada = formatearFechaHora(fechaDocumento.value);

                mensajeDocumento.textContent = `Has seleccionado: ${tipoDocumento.options[tipoDocumento.selectedIndex].text} con fecha y hora: ${fechaFormateada}`;
                mensajeDocumento.style.display = "block";
                mensajeDocumento.classList.remove("text-danger");
                mensajeDocumento.classList.add("text-success");

                console.log(`Tipo de documento: ${tipoDocumento.value}`);
                console.log(`Fecha y hora: ${fechaFormateada}`);
            } else {
                mensajeDocumento.textContent = "Por favor, selecciona un tipo de documento y una fecha y hora.";
                mensajeDocumento.style.display = "block";
                mensajeDocumento.classList.remove("text-success");
                mensajeDocumento.classList.add("text-danger");
            }
        });
    }

    const actualizarFechaHoraActual = () => {
        const fechaHoraActual = document.querySelector("#fechaHora");
        if (!fechaHoraActual) return;

        const ahora = new Date();
        const opcionesFecha = { day: "2-digit", month: "2-digit", year: "numeric" };
        const opcionesHora = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
        const fechaFormateada = ahora.toLocaleDateString("es-ES", opcionesFecha);
        const horaFormateada = ahora.toLocaleTimeString("es-ES", opcionesHora);

        fechaHoraActual.textContent = `${fechaFormateada} ${horaFormateada}`;
    };

    actualizarFechaHoraActual();
    setInterval(actualizarFechaHoraActual, 1000);
});
