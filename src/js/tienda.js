const store_default = [{
    nombre: "PlayStation 5",
    descripcion: "Consola de ultima generacion, diseñada para jugar videojuego",
    imagen: "../../public/assets/imagen 4.jpg",
    precio: "590",
    categoria: "Tecnologia",
    moneda: "$",
    id: uuidv4()
}]
let tienda = document.getElementById("tienda")
let closeModal = document.getElementById("closeModal")
let openModal = document.getElementById("openModal")
let formStore = document.getElementById("formStore")
let formStoreEdit = document.getElementById("formStoreEdit")
let logout = document.getElementById("logout")
let todos = document.getElementById("todos")
let login = JSON.parse(localStorage.getItem("login"));
let store = JSON.parse(localStorage.getItem("store"));

todos.checked = true
let new_store = ``

function uuidv4() {
    return "10000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 16 >> +c / 4).toString(16)
    );
}

logout.addEventListener('click', e => {
    localStorage.removeItem("login");
    location.href ="";
})

formStoreEdit.addEventListener('submit', e => {
    e.preventDefault()
    let nombre = document.getElementById("nombreEdit")
    let categoria = document.getElementById("categoriaEdit")
    let precio = document.getElementById("precioEdit")
    let moneda = document.getElementById("monedaEdit")
    let descripcion = document.getElementById("descripcionEdit")
    let imagen = document.getElementById("imagenEdit")
    let id = document.getElementById("idEdit")

    let data = {
        "nombre": nombre.value,
        "categoria": categoria.value,
        "precio": precio.value,
        "moneda": moneda.value,
        "descripcion": descripcion.value,
        "imagen": imagen.value,
        "id": id.value
    }
    console.log(data)
    for (let i = 0; i < store.length; i++) {
        if (store[i].id == id.value) {
            store[i] = data
        }
    }
    localStorage.setItem("store", JSON.stringify(store));
    new_store = ``
    loadStore()
    alertaCorrecto("Se ha editado con exito el producto con el id: " + id.value)
});

formStore.addEventListener('submit', e => {
    e.preventDefault()
    let nombre = document.getElementById("nombre")
    let categoria = document.getElementById("categoria")
    let precio = document.getElementById("precio")
    let moneda = document.getElementById("moneda")
    let descripcion = document.getElementById("descripcion")
    let imagen = document.getElementById("imagen")

    let data = {
        "nombre": nombre.value,
        "categoria": categoria.value,
        "precio": precio.value,
        "moneda": moneda.value,
        "descripcion": descripcion.value,
        "imagen": imagen.value,
        "id": uuidv4()
    }

    nombre.value = ''
    categoria.value = ''
    precio.value = ''
    moneda.value = ''
    descripcion.value = ''
    imagen.value = ''
    store.push(data);
    localStorage.setItem("store", JSON.stringify(store));
    new_store = ``
    loadStore()
    alertaCorrecto("Se ha agregado con exito el producto con el id: " + data.id)
});

openModal.addEventListener('click', function () {
    let modal = document.getElementById('modal');
    modal.className = "fixed top-0 left-0 bg-opacity-40 bg-negro w-[100vw] h-[100vh] flex items-center justify-center"
});

closeModal.addEventListener('click', function () {
    let modal = document.getElementById('modal');
    modal.className = "fixed invisible top-0 left-0 bg-opacity-40 bg-negro w-[100vw] h-[100vh] flex items-center justify-center"
});

closeModalEditar.addEventListener('click', function () {
    let modalEditar = document.getElementById('modalEditar');
    modalEditar.className = "fixed invisible top-0 left-0 bg-opacity-40 bg-negro w-[100vw] h-[100vh] flex items-center justify-center"
});

function buscar() {
    let search = document.getElementById('search');
    if (search.value.trim() === '') {
        store = JSON.parse(localStorage.getItem("store"));
        new_store = ``
        loadStore()
        alertaCorrecto("Se han encontrado los siguientes resultados")
    } else {
        store = store.filter(item => item.nombre == search.value);
        new_store = ``
        loadStore()
        alertaCorrecto("Se han encontrado los siguientes resultados")
    }
}

function filtrar(categoria) {
    let search = document.getElementById('search');
    search.value = ''
    if (categoria === 'Todos') {
        store = JSON.parse(localStorage.getItem("store"));
    } else {
        let data = JSON.parse(localStorage.getItem("store"));
        store = []
        data.forEach(item => {
            if (item.categoria === categoria) {
                store.push(item)
            }
        });
    }
    new_store = ``
    loadStore()
    alertaCorrecto("Se han filtrado con exito en la categoria " + categoria)
}

function editar(id) {
    console.log(id)
    store.forEach(item => {
        if (item.id == id) {
            let modalEditar = document.getElementById('modalEditar');
            modalEditar.className = "fixed top-0 left-0 bg-opacity-40 bg-negro w-[100vw] h-[100vh] flex items-center justify-center"
            let nombre = document.getElementById("nombreEdit")
            let categoria = document.getElementById("categoriaEdit")
            let precio = document.getElementById("precioEdit")
            let moneda = document.getElementById("monedaEdit")
            let descripcion = document.getElementById("descripcionEdit")
            let imagen = document.getElementById("imagenEdit")
            let id = document.getElementById("idEdit")

            id.value = item.id
            nombre.value = item.nombre
            categoria.value = item.categoria
            precio.value = item.precio
            moneda.value = item.moneda
            descripcion.value = item.descripcion
            imagen.value = item.imagen
        }
    });
}

function eliminar(id) {
    Swal.fire({
        title: "Estas seguro de elimar el producto?",
        text: "Ten mucho cuidado si te estas equivocando!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
            for (let i = 0; i < store.length; i++) {
                if (store[i].id == id) {
                    store.splice(i, 1);
                }
            }
            localStorage.setItem("store", JSON.stringify(store));
            new_store = ``
            loadStore()
            Swal.fire({
                title: "Eliminado con exito!",
                text: "Has eliminado el producto con el id: " + id,
                icon: "success"
            });
        }
    });
}

function vender(id) {
    alertaCorrecto("Has realizado una venta del producto que posee el id: " + id)
}

function loadStore() {
    let cantidad = document.getElementById("cantidad")
    cantidad.textContent = store.length
    store.forEach(item => {
        new_store = new_store + `<div class=" max-w-sm bg-blanco border-2 border-naranja rounded-xl w-[100%] md:w-[40%] lg:w-[30%] min-h-[550px] ">
                        <img class="rounded-t-lg border-b-2 border-naranja" src="${item.imagen}" alt="product image" />
                    <div class="px-5 pb-5 pt-5 flex flex-col gap-4">
                        <h3 class="text-xl font-breeSerif font-bold text-center">${item.nombre}</h3>
                        <h5 class="font-breeSerif text-negro text-md">${item.descripcion}</h5>
                        <div class="flex items-center justify-between">
                            <span class="text-3xl font-lato font-bold text-negro">${item.precio}${item.moneda}</span>
                        </div>
                        <div class="flex gap-2 flex-wrap">
                            <button class="border-2 border-azul rounded-lg p-2 font-breeSerif text-negro hover:text-blanco hover:bg-azul transition-all duration-500" onclick="vender(${item.id})">Vender</button>
                            <button class="border-2 border-rojasio rounded-lg p-2 font-breeSerif text-negro hover:text-blanco hover:bg-rojasio transition-all duration-500" onclick="editar(${item.id})">Editar</button>
                            <button class="border-2 border-red-600 rounded-lg p-2 font-breeSerif text-negro hover:text-blanco hover:bg-red-600 transition-all duration-500" onclick="eliminar(${item.id})">Eliminar</button>
                        </div>
                    </div>
                </div>`
    });

    tienda.innerHTML = new_store
}

function alertaCorrecto(title) {
    Swal.fire({
        position: "center",
        icon: "success",
        title: title,
        showConfirmButton: false,
        timer: 1500,
        background: "#f2f2f2",
    });
}

if (store === null) {
    localStorage.setItem("store", JSON.stringify(store_default));
    store = store_default
    loadStore()
}

if (login === null) {
    location.href = "../index.html"
} else {
    loadStore()
}
