const ingresos = [
    new Ingreso('Sueldo', 2100),
    new Ingreso('Venta coche', 1500),
    new Ingreso('Coperacha', 1000)
];

const egresos = [
    new Egreso('Renta departamento', 900),
    new Egreso('Ropa', 400)
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngreso = 0;

    for (let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }

    return totalIngreso;
}

let totalEgresos = () =>{
    let totalEgreso = 0;

    for (let egreso of egresos){
        totalEgreso += egreso.valor;
    }

    return totalEgreso;
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() -totalEgresos();
    let porcentaje = totalEgresos() / totalIngresos();

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentaje);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

formatoMoneda = (valor)=>{
    return valor.toLocaleString('en-GB', {style:'currency', currency:'MXN', minimumFractionDigits: 2});
}

formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-GB', {style:'percent', minimumFractionDigits: 2});
}

cargarIngresos = () =>{
    let ingresosHTML = '';

    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

function crearIngresoHTML(ingreso){
    let ingresoHTML =`
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;

    return ingresoHTML;
}

eliminarIngreso = (id) => {
    let indiceEliminado = ingresos.findIndex(ingreso => ingreso.id == id);
    ingresos.splice(indiceEliminado,1);
    cargarCabecero();
    cargarIngresos();
}

cargarEgresos = () =>{
    let egresosHTML = '';

    for (let egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }

    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

function crearEgresoHTML(egreso){
    let egresoHTML =`
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;

    return egresoHTML;
}

eliminarEgreso = (id) => {
    let indiceEliminado = egresos.findIndex(egreso => egreso.id == id);
    egresos.splice(indiceEliminado,1);
    cargarCabecero();
    cargarEgresos();
}