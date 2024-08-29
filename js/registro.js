// Definición de formularios
const forms = {
    jugador: {
        nombre: document.getElementById('nombre-jugador'),
        edad: document.getElementById('edad-jugador'),
        categoria: document.getElementById('categoria-jugador'),
        email: document.getElementById('email-jugador')
    },
    colaborador: {
        nombre: document.getElementById('nombre-colaborador'),
        vacante: document.getElementById('vacante-colaborador'),
        email: document.getElementById('email-colaborador')
    },
    sponsor: {
        marca: document.getElementById('marca-sponsor'),
        zona: document.getElementById('zona-sponsor'),
        email: document.getElementById('email-sponsor')
    }
};

// Función de validación con retorno booleano
function validarFormulario(tipo) {
    let form = forms[tipo];
    for (let campo in form) {
        if (!form[campo].value) {
            return false; // Retorna false si algún campo está vacío
        }
    }
    return true; // Retorna true si todos los campos están llenos
}

// Función para mostrar el aviso de error
function mostrarError(tipo) {
    Swal.fire({
        title: "Error",
        text: `Por favor, complete todos los campos en el formulario de ${tipo}.`,
        icon: "error"
    });
}

// Guardar datos en LocalStorage
function guardarEnLocalStorage(tipo) {
    let form = forms[tipo];
    let datos = {};

    for (let campo in form) {
        datos[campo] = form[campo].value;
    }

    localStorage.setItem(tipo, JSON.stringify(datos));
    Swal.fire({
        title: "Éxito",
        text: `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} registrado correctamente.`,
        icon: "success"
    });
}

// Eventos de guardar con validación
document.getElementById('btn-guardar-jugador').addEventListener('click', function() {
    if (validarFormulario('jugador')) {
        guardarEnLocalStorage('jugador');
    } else {
        mostrarError('jugador');
    }
});

document.getElementById('btn-guardar-colaborador').addEventListener('click', function() {
    if (validarFormulario('colaborador')) {
        guardarEnLocalStorage('colaborador');
    } else {
        mostrarError('colaborador');
    }
});

document.getElementById('btn-guardar-sponsor').addEventListener('click', function() {
    if (validarFormulario('sponsor')) {
        guardarEnLocalStorage('sponsor');
    } else {
        mostrarError('sponsor');
    }
});

// Manejo de la autenticación
document.getElementById('btn-ingresar').addEventListener('click', function() {
    document.getElementById('login-form').classList.remove('hidden'); // Mostrar el formulario de login
    document.getElementById('registro-opciones').classList.add('hidden'); // Ocultar opciones de nuevo registro
    document.querySelectorAll('.formulario').forEach(form => form.classList.add('hidden'));// Ocultar formulario de nuevo registro
});

document.getElementById('btn-login').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verificar credenciales (lógica simple de ejemplo)
    if (username === 'admin' && password === '1234') {
        window.location.href = '/html/directivos.html'; // Redirigir a directivos.html si las credenciales son correctas
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
    document.getElementById('login-form').classList.add('hidden'); // Ocultar ingreso de directivos
});

document.getElementById('btn-colaborador').addEventListener('click', function() {
    mostrarFormulario('colaborador');
    document.getElementById('login-form').classList.add('hidden');  // Ocultar ingreso de directivos
});

document.getElementById('btn-sponsor').addEventListener('click', function() {
    mostrarFormulario('sponsor');
    document.getElementById('login-form').classList.add('hidden');    // Ocultar ingreso de directivos

});

function mostrarFormulario(tipo) {
    // Ocultar todos los formularios y mostrar solo el seleccionado
    document.querySelectorAll('.formulario').forEach(form => form.classList.add('hidden'));
    document.getElementById(`formulario-${tipo}`).classList.remove('hidden');
}

// Mostrar opciones de registro
document.getElementById('btn-nuevo-registro').addEventListener('click', function() {
    document.getElementById('registro-opciones').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden'); // Ocultar el formulario de login
});

// Manejador del botón "Salir"
document.getElementById('btn-salir').addEventListener('click', function() {
    document.getElementById('registro-opciones').classList.add('hidden');
    document.querySelectorAll('.formulario').forEach(form => form.classList.add('hidden')); // Ocultar todos los formularios
});

// Función de validación
function validarFormulario(tipo) {
    let form = forms[tipo];
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
    return true;
}

// Guardar datos en LocalStorage
function guardarEnLocalStorage(tipo) {
    let form = forms[tipo];
    let datos = {};

    for (let campo in form) {
        datos[campo] = form[campo].value;
    }

    localStorage.setItem(tipo, JSON.stringify(datos));
    Swal.fire({
        title: "Éxito",
        text: `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} registrado correctamente.`,
        icon: "success"
    });
}

// Eventos de guardar con validación
document.getElementById('btn-guardar-jugador').addEventListener('click', function() {
    if (validarFormulario('jugador')) {
        guardarEnLocalStorage('jugador');
    } else {
        mostrarError('jugador');
    }
});

document.getElementById('btn-guardar-colaborador').addEventListener('click', function() {
    if (validarFormulario('colaborador')) {
        guardarEnLocalStorage('colaborador');
    } else {
        mostrarError('colaborador');
    }
});

document.getElementById('btn-guardar-sponsor').addEventListener('click', function() {
    if (validarFormulario('sponsor')) {
        guardarEnLocalStorage('sponsor');
    } else {
        mostrarError('sponsor');
    }
});

// Función de validación con retorno booleano
function validarFormulario(tipo) {
    let form = forms[tipo];
    for (let campo in form) {
        if (!form[campo].value) {
            return false; // Retorna false si algún campo está vacío
        }
    }
    return true; // Retorna true si todos los campos están llenos
}

// Función para mostrar el aviso de error
function mostrarError(tipo) {
    Swal.fire({
        title: "Error",
        text: `Por favor, complete todos los campos en el formulario de ${tipo}.`,
        icon: "error"
    });
}

// Guardar datos en LocalStorage
function guardarEnLocalStorage(tipo) {
    let form = forms[tipo];
    let datos = {};

    for (let campo in form) {
        datos[campo] = form[campo].value;
    }

    localStorage.setItem(tipo, JSON.stringify(datos));
    Swal.fire({
        title: "Éxito",
        text: `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} registrado correctamente.`,
        icon: "success"
    });
}
