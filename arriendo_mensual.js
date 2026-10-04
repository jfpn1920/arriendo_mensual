const CLAVE = 'arriendoMensual';
// Lista con los id de todos los campos del formulario
const CAMPOS = ['arriendo', 'agua', 'luz', 'gas', 'internet', 'personas'];
// Valores por defecto (campos vacíos y 1 persona)
const VACIO = { arriendo: '', agua: '', luz: '', gas: '', internet: '', personas: 1 };
// ===== Referencias a elementos del HTML =====
const totalServicios = document.getElementById('total-servicios'); // texto de servicios
const totalMes = document.getElementById('total-mes');             // texto del total del mes
const porPersona = document.getElementById('por-persona');         // texto por persona
const btnLimpiar = document.getElementById('btn-limpiar');         // botón limpiar
// ===== Funciones auxiliares =====
// Convierte un número a formato de pesos colombianos (ej: $ 1.200.000)
function formatear(numero) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
    }).format(numero);
}
// Lee un campo y devuelve su valor como número (0 si está vacío o es inválido)
function valor(id) {
    return Number(document.getElementById(id).value) || 0;
}
// ===== Funciones de localStorage =====
// Guarda en el navegador lo que hay escrito en cada campo
function guardar() {
    const datos = {};
    CAMPOS.forEach(id => datos[id] = document.getElementById(id).value);
    localStorage.setItem(CLAVE, JSON.stringify(datos));
}
// Carga los datos guardados y los escribe en los campos
function cargar() {
    // Lee lo guardado; si no hay nada, usa los valores por defecto
    const guardado = localStorage.getItem(CLAVE);
    const datos = guardado ? JSON.parse(guardado) : VACIO;
    CAMPOS.forEach(id => document.getElementById(id).value = datos[id]);
}
// ===== Cálculo =====
// Suma todo y muestra los resultados en pantalla
function calcular() {
    // Suma de los cuatro servicios
    const servicios = valor('agua') + valor('luz') + valor('gas') + valor('internet');
    // Total del mes: arriendo + servicios
    const total = valor('arriendo') + servicios;
    // Personas: mínimo 1 para no dividir entre cero
    const personas = Math.max(1, Math.floor(valor('personas')));
    // Muestra los resultados con formato de pesos
    totalServicios.textContent = formatear(servicios);
    totalMes.textContent = formatear(total);
    porPersona.textContent = formatear(total / personas);
}
// Borra los datos guardados y deja el formulario como al inicio
function limpiar() {
    localStorage.removeItem(CLAVE);
    cargar();
    calcular();
}
// ===== Eventos =====
// Cada vez que se escribe en un campo: se guarda y se recalcula
CAMPOS.forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
        guardar();
        calcular();
    });
});
// Botón "Limpiar todo"
btnLimpiar.addEventListener('click', limpiar);
cargar();
calcular();