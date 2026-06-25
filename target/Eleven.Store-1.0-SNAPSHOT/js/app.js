const carritoIcono =
document.querySelector('.carrito-icono');

const carrito =
document.querySelector('.carrito');

const btnCerrar =
document.querySelector('.cerrar-carrito');


if(carritoIcono){

    carritoIcono.addEventListener('click', ()=>{

        carrito.classList.toggle('activo');

    });

}
if(btnCerrar){

    btnCerrar.addEventListener('click', ()=>{

    carrito.classList.remove('activo');

    document.querySelectorAll('.metodo').forEach(metodo => {
    metodo.classList.remove('activo');
});

console.log("Métodos limpiados");
    });



}

const cerrarCarrito =
document.querySelector('.cerrar-carrito');



if(cerrarCarrito){

    cerrarCarrito.addEventListener('click', ()=>{

    carrito.classList.remove('activo');

    document.querySelectorAll('.metodo').forEach(metodo => {
        metodo.classList.remove('activo');
    });

});
}


let contador = 0;

let subtotal = 0;

const costoEnvio = 20000;
let carritoProductos =
JSON.parse(localStorage.getItem('carrito'))
|| [];

function agregarCarrito(producto, precio){

    const productoExistente =
    carritoProductos.find(item =>
    item.nombre === producto);

    if(productoExistente){

        productoExistente.cantidad++;

    }else{

        carritoProductos.push({

            nombre: producto,
            precio: precio,
            cantidad: 1

        });

    }

    actualizarCarrito();
    mostrarNotificacion(
    '✅ ' + producto + ' agregado al carrito'
);

}

function actualizarCarrito(){
localStorage.setItem(
    'carrito',
    JSON.stringify(carritoProductos)
);
    const contenido =
    document.querySelector('.carrito-contenido');

    contenido.innerHTML = '';

    subtotal = 0;
    contador = 0;

    carritoProductos.forEach((item, index)=>{

        subtotal +=
        item.precio * item.cantidad;

        contador += item.cantidad;

        contenido.innerHTML += `

        <div class="item-carrito">

            <div>

                <p>${item.nombre}</p>

                <small>
                    $${item.precio.toLocaleString()}
                </small>

            </div>

            <div class="controles">

                <button onclick="disminuirCantidad(${index})">
                    -
                </button>
     
                <span>
                    ${item.cantidad}
                </span>

                <button onclick="aumentarCantidad(${index})">
                    +
                </button>
           <button onclick="eliminarProducto(${index})">
🗑️
</button>

            </div>

        </div>

        `;

    });

    document.querySelector('.contador')
    .innerText = contador;

    document.querySelector('#subtotal')
    .innerText =
    '$' + subtotal.toLocaleString();

    document.querySelector('#total')
    .innerText =
    '$' + (subtotal + costoEnvio)
    .toLocaleString();

}



function aumentarCantidad(index){

    carritoProductos[index].cantidad++;

    actualizarCarrito();

}



function disminuirCantidad(index){

    if(carritoProductos[index].cantidad > 1){

        carritoProductos[index].cantidad--;

    }else{

        carritoProductos.splice(index,1);

    }

    actualizarCarrito();

}
const btnLogin =
document.querySelector('.btn-secundario');

const loginPopup =
document.querySelector('.login-popup');



if(btnLogin){

    btnLogin.addEventListener('click', ()=>{

        loginPopup.classList.toggle('activo');

    });

}
if(loginPopup){

    loginPopup.addEventListener('click', (e)=>{

        if(e.target === loginPopup){

            loginPopup.classList.remove('activo');

        }

    });

}

actualizarCarrito();

function procesarCompra(){

    const nombre =
    document.getElementById('nombre').value;

    const ciudad =
    document.getElementById('ciudad').value;

    const direccion =
    document.getElementById('direccion').value;

    const telefono =
    document.getElementById('telefono').value;

    const correo =
    document.getElementById('correo').value;

    if(
        nombre === '' ||
        ciudad === '' ||
        direccion === '' ||
        telefono === '' ||
        correo === ''
    ){

        alert('Por favor completa todos los campos.');

        return;

    }
console.log(document.querySelector('.metodo.activo'));
const metodoSeleccionado =
document.querySelector('.metodo.activo');

if(!metodoSeleccionado){
    alert('Seleccione un método de pago.');
    return;
}
    alert(
        '✅ Compra realizada con éxito.\n\nGracias por comprar en ELEVEN.STORE'
    );
    
document.querySelectorAll('.metodo').forEach(metodo => {
    metodo.classList.remove('activo');
});

    carritoProductos = [];
    actualizarCarrito();

    document.getElementById('nombre').value = '';
    document.getElementById('ciudad').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('correo').value = '';

}
function seleccionarMetodo(elemento){

    document.querySelectorAll('.metodo').forEach(metodo => {
        metodo.classList.remove('activo');
    });

    elemento.classList.add('activo');

    console.log("Seleccionado:", elemento);
}

function buscarProductos(){

    const texto =
    document.getElementById('buscador')
    .value
    .toLowerCase();

    const cards =
    document.querySelectorAll('.card');

    let encontrados = 0;

    cards.forEach(card => {

        const nombre =
        card.querySelector('h3')
        .innerText
        .toLowerCase();

        if(nombre.includes(texto)){

            card.style.display = 'block';

            encontrados++;

        }else{

            card.style.display = 'none';

        }

    });

    document.getElementById('contador-productos')
    .innerText =
    encontrados + ' perfumes encontrados';

}
function mostrarNotificacion(mensaje){

    const notificacion =
    document.getElementById('notificacion');

    notificacion.innerText = mensaje;

    notificacion.classList.add('mostrar');

    setTimeout(()=>{

        notificacion.classList.remove('mostrar');

    },2000);

}
function filtrarPrecio(){

    const filtro =
    document.getElementById('filtro-precio').value;

    const cards =
    document.querySelectorAll('.card');

    cards.forEach(card => {

        const textoPrecio =
        card.querySelector('p')
        .innerText
        .replace('$','')
        .replace(/\./g,'');

        const precio =
        parseInt(textoPrecio);

        let mostrar = true;

        if(filtro === '300000'){

            mostrar = precio < 300000;

        }

        else if(filtro === '500000'){

            mostrar =
            precio >= 300000 &&
            precio <= 500000;

        }

        else if(filtro === '500001'){

            mostrar = precio > 500000;

        }

        card.style.display =
        mostrar ? 'block' : 'none';

    });

}
function ordenarProductos(){

    const contenedor =
    document.querySelector('.contenedor-productos');

    const cards =
    Array.from(
        document.querySelectorAll('.card')
    );

    const criterio =
    document.getElementById('ordenar-productos').value;

    cards.sort((a,b)=>{

        const nombreA =
        a.querySelector('h3').innerText;

        const nombreB =
        b.querySelector('h3').innerText;

        const precioA =
        parseInt(
            a.querySelector('p')
            .innerText
            .replace('$','')
            .replace(/\./g,'')
        );

        const precioB =
        parseInt(
            b.querySelector('p')
            .innerText
            .replace('$','')
            .replace(/\./g,'')
        );

        if(criterio === 'az'){

            return nombreA.localeCompare(nombreB);

        }

        if(criterio === 'za'){

            return nombreB.localeCompare(nombreA);

        }

        if(criterio === 'menor'){

            return precioA - precioB;

        }

        if(criterio === 'mayor'){

            return precioB - precioA;

        }

    });

    cards.forEach(card => {

        contenedor.appendChild(card);

    });

}
function eliminarProducto(index){

    carritoProductos.splice(index,1);

    actualizarCarrito();

}
function registrarUsuario(){

    const nombre =
    document.getElementById('nombre').value;

    const correo =
    document.getElementById('correo').value;

    const password =
    document.getElementById('password').value;

    if(
        nombre === '' ||
        correo === '' ||
        password === ''
    ){

        alert('Completa todos los campos.');

        return;

    }

    alert(
        'Usuario registrado correctamente.'
    );

}
function iniciarSesion(){

    const correo =
    document.getElementById('loginCorreo').value;

    const password =
    document.getElementById('loginPassword').value;

    if(
        correo === '' ||
        password === ''
    ){

        alert('Completa todos los campos.');

        return;

    }

    if(
        correo === 'fidel@email.com' &&
        password === '123456'
    ){

        sessionStorage.setItem(
            'usuario',
            'Fidel Junior'
        );

        window.location.href =
        'index.html';

        return;

    }

    if(
        correo === 'prueba@email.com' &&
        password === '654321'
    ){

        sessionStorage.setItem(
            'usuario',
            'Usuario Prueba'
        );

        window.location.href =
        'index.html';

        return;

    }

    alert(
        'Correo o contraseña incorrectos.'
    );

}

const usuarioActivo =
document.getElementById('usuarioActivo');

const usuarioLogueado =
sessionStorage.getItem('usuario');

if(
    usuarioActivo &&
    usuarioLogueado
){

    usuarioActivo.innerText =
    usuarioLogueado;

}
function cerrarSesion(){

    sessionStorage.removeItem('usuario');

    window.location.href =
    'login.html';

}