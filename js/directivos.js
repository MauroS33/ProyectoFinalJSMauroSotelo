document.addEventListener(function() {
    fetch('data/jugadores.json')
        .then(response => response.json())
        .then(jugadores => {
            let jugadoresHtml = jugadores.map(j => `<p>${j.nombre}, Edad: ${j.edad}, Número: ${j.numero}, Categoría: ${j.categoria}, Faltas: ${j.faltas}</p>`).join('');
            document.getElementById('info-jugadores').innerHTML = jugadoresHtml;
        });

    fetch('data/directores_tecnicos.json')
        .then(response => response.json())
        .then(directores => {
            let directoresHtml = directores.map(d => `<p>${d.nombre}, Categoría: ${d.categoria}, Posición: ${d.posicion}</p>`).join('');
            document.getElementById('info-directores').innerHTML = directoresHtml;
        });
});
