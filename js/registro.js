// Definición de formularios
const forms = {
    jugador: {
        nombre: document.getElementById('nombre-jugador'),
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

// Manejo de la autenticación
document.getElementById('btn-ingresar').addEventListener('click', function() {
    document.getElementById('login-form').classList.remove('hidden'); // Mostrar el formulario de login
    document.getElementById('registro-opciones').classList.add('hidden'); // Ocultar opciones de nuevo registro
    document.querySelectorAll('.formulario').forEach(form => form.classList.add('hidden')); // Ocultar formulario de nuevo registro
});

document.getElementById('btn-login').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'Mauro' && password === '1234') {
        // Guardar el nombre del usuario en el Local Storage
        localStorage.setItem('usuario', username); // Cambiar de 'usuario' a 'nombreDirectivo'
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

// Manejador del botón "Salir"
document.getElementById('btn-salir').addEventListener('click', function() {
    document.getElementById('registro-opciones').classList.add('hidden');
    document.querySelectorAll('.formulario').forEach(form => form.classList.add('hidden')); // Ocultar todos los formularios
});


function guardarEnLocalStorage(tipo) {
    let form = forms[tipo];
    let datos = {};

    for (let campo in form) {
        datos[campo] = form[campo].value;
    }

    localStorage.setItem(tipo, JSON.stringify(datos));

    // Selecciona el mensaje de éxito adecuado basado en el tipo
    let mensajeExito = '';
    let nombre = '';

    if (tipo === 'jugador') {
        nombre = datos['nombre'];
        let categoria = datos['categoria']; // Obtiene la categoría del jugador
        mensajeExito = `${nombre} ha sido registrado/a correctamente como jugador/a en la categoría ${categoria}. Nos pondremos en contacto contigo para el próximo amistoso.`;
    } else if (tipo === 'colaborador') {
        nombre = datos['nombre'];
        mensajeExito = `${nombre} ha sido registrado/a correctamente como colaborador/a. Gracias por unirte a nuestra familia. Bienvenido/a`;
    } else if (tipo === 'sponsor') {
        nombre = datos['marca'];
        mensajeExito = `La marca ${nombre} ha sido registrada correctamente como Sponsor. Gracias por apoyar a nuestro club. Nos pondremos en contacto luego de la proxima junta directiva`;
    }

    // Mostrar el mensaje de éxito correspondiente
    Swal.fire({
        title: "Éxito",
        text: mensajeExito,
        icon: "success"
    });
}
