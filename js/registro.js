// Definición de formularios
const forms = {
    jugador: {
        nombre: document.getElementById('nombre-jugador'),
        categoria: document.getElementById('categoria-jugador'),
        email: document.getElementById('email-jugador')
    },
    colaborador: {
        nombre: document.getElementById('nombre-colaborador'),
        categoria: document.getElementById('vacante-colaborador'),
        email: document.getElementById('email-colaborador')
    },
    sponsor: {
        nombre: document.getElementById('marca-sponsor'),
        categoria: document.getElementById('zona-sponsor'),
        email: document.getElementById('email-sponsor')
    }
};

// Función para validar emails
function esEmailValido(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

// Función de validación
function validarFormulario(tipo) {
    let form = forms[tipo];

    // Validar que todos los campos estén llenos
    for (let campo in form) {
        if (!form[campo].value) {
            Swal.fire({
                title: "Error",
                text: `Por favor, complete el campo ${campo.replace(/-/g, ' ')}.`,
                icon: "error"
            });
            return false;
        }
    }

    // Validar el campo de email
    if (!esEmailValido(form.email.value)) {
        Swal.fire({
            title: "Error",
            text: "Por favor, ingrese un correo electrónico válido.",
            icon: "error"
        });
        return false;
    }

    return true;
}

// Manejo de la autenticación
document.getElementById('btn-ingresar').addEventListener('click', function() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('registro-opciones').classList.add('hidden');
    document.querySelectorAll('.formulario').forEach(form => form.classList.add('hidden'));
});

document.getElementById('btn-login').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'Mauro' && password === '1234') {
        localStorage.setItem('nombreDirectivo', username); 
        window.location.href = 'html/directivos.html';
    } else {
        Swal.fire({
            title: "Error",
            text: "Credenciales incorrectas. Inténtalo de nuevo.",
            icon: "error"
        });
    }
});

// Mostrar los formularios al hacer clic en los botones correspondientes
document.getElementById('btn-jugador').addEventListener('click', function() {
    mostrarFormulario('jugador');
    document.getElementById('login-form').classList.add('hidden');
});

document.getElementById('btn-colaborador').addEventListener('click', function() {
    mostrarFormulario('colaborador');
    document.getElementById('login-form').classList.add('hidden');
});

document.getElementById('btn-sponsor').addEventListener('click', function() {
    mostrarFormulario('sponsor');
    document.getElementById('login-form').classList.add('hidden');
});

function mostrarFormulario(tipo) {
    document.querySelectorAll('.formulario').forEach(form => form.classList.add('hidden'));
    document.getElementById(`formulario-${tipo}`).classList.remove('hidden');
}

// Mostrar opciones de registro
document.getElementById('btn-nuevo-registro').addEventListener('click', function() {
    document.getElementById('registro-opciones').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
});

// Eventos de guardar con validación
document.getElementById('btn-guardar-jugador').addEventListener('click', function() {
    if (validarFormulario('jugador')) {
        guardarEnLocalStorage('jugador');
    }
});

document.getElementById('btn-guardar-colaborador').addEventListener('click', function() {
    if (validarFormulario('colaborador')) {
        guardarEnLocalStorage('colaborador');
    }
});

document.getElementById('btn-guardar-sponsor').addEventListener('click', function() {
    if (validarFormulario('sponsor')) {
        guardarEnLocalStorage('sponsor');
    }
});

// Manejador del botón "Salir"
document.getElementById('btn-salir').addEventListener('click', function() {
    document.getElementById('registro-opciones').classList.add('hidden');
    document.querySelectorAll('.formulario').forEach(form => form.classList.add('hidden'));
});

function guardarEnLocalStorage(tipo) {
    let form = forms[tipo];
    let registro = {};

    for (let campo in form) {
        registro[campo] = form[campo].value;
    }

    let registrosJSON = localStorage.getItem(tipo);
    let registros = registrosJSON ? JSON.parse(registrosJSON) : [];

    registros.push(registro);
    localStorage.setItem(tipo, JSON.stringify(registros));

    // Mostrar mensaje de éxito específico para cada tipo
    let mensajeExito;
    switch (tipo) {
        case 'jugador':
            mensajeExito = `${registro.nombre} ha sido registrado/a como jugador/a correctamente. Nos pondremos en contacto previo al proximo amistoso de la categoria.`;
            break;
        case 'colaborador':
            mensajeExito = `${registro.nombre} ha sido registrado/a como colaborador/a correctamente. ¡Gracias por tu apoyo! Nos pondremos en contacto a la brevedad.`;
            break;
        case 'sponsor':
            mensajeExito = `${registro.nombre} ha sido registrada como marca sponsor correctamente. ¡Gracias por ofrecernos tu patrocinio! Nos pondremos en contacto luego de la proxima junta directiva.`;
            break;
    }

    Swal.fire({
        title: "Éxito",
        text: mensajeExito,
        icon: "success"
    });

    // Limpiar el formulario después de guardar
    for (let campo in form) {
        form[campo].value = '';
    }
}
