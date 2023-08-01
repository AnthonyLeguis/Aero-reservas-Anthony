const nombreInput = document.querySelector('#Nombre');
const apellidoInput = document.querySelector('#Apellido');
const cedulaInput = document.querySelector('#Identificacion');
const vueloInput = document.querySelector('#NumeroVuelo');
const telefonoInput = document.querySelector('#NumeroTel');
const outInput = document.querySelector('#CiudadOrigen');
const llegadaInput = document.querySelector('#CiudadLLegada');
const fechaInput = document.querySelector('#Fecha');
const horaInput = document.querySelector('#Hora');
const formulario = document.querySelector('#formulario');
const boton = formulario.querySelector('button[type=submit]');


const contenCitas = document.querySelector('#citas');
const modal = document.querySelector('#modal');
const modalImg = document.querySelector('#Img_modal');
const modalTexto = document.querySelector('#mensajeModal');
const imagenModal = modal.querySelector('img');

//////Reset y condicion para el campo de fecha//////
// Obtener la fecha actual
const fechaActual = new Date();
// Agregar 1 día a la fecha actual
fechaActual.setDate(fechaActual.getDate()+1);
// Obtener la fecha en formato ISO (YYYY-MM-DD)
const fechaMinima = fechaActual.toISOString().split('T')[0];
// Establecer la fecha mínima en el atributo min del campo de entrada
fechaInput.setAttribute('min', fechaMinima);


let editar;

class citas{
    //Arreglo para las citas
    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas,cita];
        //console.log(this.citas)
    }

    eliminarCita(id){
        this.citas = this.citas.filter(citas=> citas.id !== id);
    }

    editarCita(citaA){
        this.citas = this.citas.map(citas=>citas.id === citaA.id ? citaA : citas);
    } 

}

class ui{

    imprimirAlerta(mensaje,tipo){
        //console.log(modal);
    
        if(tipo === 'error'){
            imagenModal.src = '';
            imagenModal.src = '/IMG/Check rojo.svg';
            modal.classList.remove('modal');
            modal.classList.add('modali');
            modalImg.classList.remove('Img_modal');
            modalImg.classList.add('Img_modali');
            modalTexto.classList.remove('mensajeModal');
            modalTexto.classList.add('mensajeModali');

        }else{
            imagenModal.src = '';
            imagenModal.src = '/IMG/Check verde.svg';
            modal.classList.remove('modal');
            modal.classList.add('modali');
            modalImg.classList.remove('Img_modal');
            modalImg.classList.add('Img_modali');
            modalTexto.classList.remove('mensajeModal');
            modalTexto.classList.add('mensajeModali');

        }

        //mensaje de error
        modalTexto.textContent = mensaje;

        setTimeout(()=>{
                modal.remove();
        },5000);
        
    }


    imprimirCitas({citas}){
        //console.log(citas)
        this.limpiarHTML()
    
        citas.forEach(citas=>{
            const {
                Nombre,
                Apellido,
                Identificacion,
                NumeroVuelo,
                NumeroTel,
                CiudadOrigen,
                CiudadLLegada,
                Fecha,
                Hora,
                id
            } = citas;
    
            const divCita = document.getElementById("divCita");
            divCita.classList.add('divCita')
    
            //atributo personalizado
            divCita.dataset.id = id;
    
            //textos que llevaran las citas
            const contenedor = document.createElement('div');
            contenedor.classList.add('content');

            const nombreParrafo = document.createElement('h3');
            nombreParrafo.classList.add('h3');
            nombreParrafo.textContent = Nombre;

            const apellidoParrafo = document.createElement('h3');
            apellidoParrafo.classList.add('h3');
            apellidoParrafo.textContent = Apellido;

            contenedor.appendChild(nombreParrafo);
            contenedor.appendChild(apellidoParrafo);    

            const identificacionParrafo = document.createElement('card');
            identificacionParrafo.classList.add('card');
            identificacionParrafo.innerHTML = `
                <span class="parrafo">Número de Identificación: ${Identificacion}</span> 
            `;

            const vueloParrafo = document.createElement('card');
            vueloParrafo.classList.add('card');
            vueloParrafo.innerHTML = `
                <span class="parrafo">Número de Vuelo: ${NumeroVuelo}</span> 
            `;

            const telParrafo = document.createElement('card');
            telParrafo.classList.add('card');
            telParrafo.innerHTML = `
                <span class="parrafo">Número de Teléfono: ${NumeroTel}</span>
            `;

            const origenParrafo = document.createElement('card');
            origenParrafo.classList.add('card');
            origenParrafo.innerHTML = `
                <span class="parrafo">Ciudad de salida: ${CiudadOrigen}</span>
            `;

            const llegadaParrafo = document.createElement('card');
            llegadaParrafo.classList.add('card');
            llegadaParrafo.innerHTML = `
                <span class="parrafo">Ciudad de llegada:  ${CiudadLLegada}</span>
            `;

            const fechaParrafo = document.createElement('card');
            fechaParrafo.classList.add('card');
            fechaParrafo.innerHTML = `
                <span class="parrafo">Fecha de su vuelo: ${Fecha}</span>
            `;

            const horaParrafo = document.createElement('card');
            horaParrafo.classList.add('card');
            
            // Dividir la cadena de Hora en partes separadas (formato "HH:MM")
            const [horas, minutos] = Hora.split(':');

            // Crear un nuevo objeto Date con las partes de la hora
            const fechaHora = new Date();
            fechaHora.setHours(horas);
            fechaHora.setMinutes(minutos);

            // Formatear la hora en el formato deseado
            const horaFormateada = fechaHora.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });            
            horaParrafo.innerHTML = `
              <span class="parrafo">Hora de su vuelo: ${horaFormateada}</span>
            `;

            //botones//
            const contenedorBtn = document.createElement('div');
            contenedorBtn.classList.add('contenedorBtn')

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn_Eliminar');
            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnEliminar.onclick = () => eliminarCita(id);

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn_Actualizar');
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            btnEditar.onclick = ()=> cargarEdicion(citas);

            contenedorBtn.appendChild(btnEliminar);
            contenedorBtn.appendChild(btnEditar);


            divCita.appendChild(contenedor);
            divCita.appendChild(identificacionParrafo);
            divCita.appendChild(vueloParrafo);
            divCita.appendChild(telParrafo);
            divCita.appendChild(origenParrafo);
            divCita.appendChild(llegadaParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(contenedorBtn);

        })
    }

    limpiarHTML(){
        while(divCita.firstChild){
            divCita.removeChild(divCita.firstChild)
        }
    }  
}

//Instancias para las clases creadas
const administrarCitas = new citas();
const usuario = new ui();

//eventos
eventos();
function eventos(){
    nombreInput.addEventListener('input', datosCitas);
    apellidoInput.addEventListener('input', datosCitas);
    cedulaInput.addEventListener('input', datosCitas);
    outInput.addEventListener('input', datosCitas);
    llegadaInput.addEventListener('input', datosCitas);
    fechaInput.addEventListener('input', datosCitas);
    horaInput.addEventListener('input', datosCitas);
    formulario.addEventListener('submit', nuevaCita);

}

//Estructura para guardar la informacion
const citasObj = {
    Nombre: '',
    Apellido: '',
    Identificacion: '',
    NumeroVuelo: '',
    NumeroTel: '',
    CiudadOrigen: '',
    CiudadLLegada: '',
    FechaHora: '',
    Fecha: '',
    Hora: ''
}

function datosCitas(e){
    //console.log(e.target.name);
    citasObj[e.target.name] = e.target.value;
    //console.log(citasObj);
}

function nuevaCita(e) {
    
    //validar agregando una nueva cita a la clase de citas
    e.preventDefault();

    //tomar la informacion de citasObj
    const {Nombre,Apellido,Identificacion,NumeroVuelo,NumeroTel,CiudadOrigen,CiudadLLegada,Fecha,Hora} = citasObj;
    //console.log(NumeroTel)

    //validaciones
    if(Nombre === '' || Apellido === '' || Identificacion === '' || NumeroVuelo === '' || NumeroTel === '' || CiudadOrigen === '' || CiudadLLegada === '' || Fecha === '' || Hora === ''){

        //console.log('Todos los campos son obligatorios');
        usuario.imprimirAlerta('Todos los campos son obligatorios','error')
        return;
    }

    if (editar) {
        //console.log('estoy editando')

        boton.classList.remove('btn_Actualizar');
        boton.classList.add('btn_Agendar');
        boton.textContent = 'Agendar vuelo';
        editar = false;

        administrarCitas.editarCita({...citasObj});

        //mensaje para datos correctos
        usuario.imprimirAlerta('Se ha modificado la reserva');
    } else {
        //console.log('estoy creando una nueva cita');

        //crear nuevo id
        //mensaje para datos correctos
        citasObj.id = Date.now();
        administrarCitas.agregarCita({...citasObj});
        usuario.imprimirCitas(administrarCitas);
        usuario.imprimirAlerta('Se ha agregado la reserva');
    }

    //crear nuevas citas
    //console.log(citasObj)

    //resetear el formulario
    formulario.reset();
    reiniciarObjeto();
    usuario.imprimirCitas(administrarCitas);
}

function reiniciarObjeto(){
    citasObj.Nombre = '';
    citasObj.Apellido = '';
    citasObj.Identificacion = '';
    citasObj.NumeroVuelo = '';
    citasObj.NumeroTel = '';
    citasObj.CiudadOrigen = '';
    citasObj.CiudadLLegada = '';
    citasObj.Fecha = '';
    citasObj.Hora = '';

}

function eliminarCita(id){
    //console.log(id)
    administrarCitas.eliminarCita(id);
    //mostrar el mensaje
    usuario.imprimirAlerta('La reserva se ha elimminado')
    //actualizar el objeto
    usuario.imprimirCitas(administrarCitas);

}

function cargarEdicion(cita){
    //console.log(cita);

    const {Nombre,Apellido,Identificacion,NumeroVuelo,NumeroTel,CiudadOrigen,CiudadLLegada,Fecha,Hora,id} = cita;

    //llenar los inputs
    nombreInput.value = Nombre;
    apellidoInput.value = Apellido;
    cedulaInput.value = Identificacion;
    vueloInput.value = NumeroVuelo;
    telefonoInput.value = NumeroTel;
    outInput.value = CiudadOrigen;
    llegadaInput.value = CiudadLLegada;
    fechaInput.value = Fecha;
    horaInput.value = Hora;

    //llenar el objeto
    citasObj.Nombre = Nombre;
    citasObj.Apellido = Apellido;
    citasObj.Identificacion = Identificacion;
    citasObj.NumeroVuelo = NumeroVuelo;
    citasObj.NumeroTel = NumeroTel;
    citasObj.CiudadOrigen = CiudadOrigen;
    citasObj.CiudadLLegada = CiudadLLegada;
    citasObj.Fecha = Fecha;
    citasObj.Hora = Hora;
    citasObj.id = id;

    //cambiar el texto del boton

    boton.classList.remove('btn_Agendar');
    boton.classList.add('btn_Actualizar');
    boton.style.width = '15rem';
    boton.textContent = 'Guardar cambio';

    editar = true;
}
