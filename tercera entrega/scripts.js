// Define el array de plantas
const plantas = [
    {
      nombre: "Orquídea",
      region: "América",
      tipoPlanta: "Flor",
      habitat: "Selva",
      descripcion: "Una de las flores más populares por su belleza y colorido.",
      tipoFlor: "Epidendra"
    },
    {
      nombre: "Cactus",
      region: "América",
      tipoPlanta: "Suculenta",
      habitat: "Desierto",
      descripcion: "Plantas que almacenan agua en sus tejidos para sobrevivir en ambientes secos.",
      tipoFlor: "Flor pequeña"
    },
    {
      nombre: "Helecho",
      region: "Europa",
      tipoPlanta: "Follaje",
      habitat: "Bosque",
      descripcion: "Planta ornamental que puede crecer tanto en interior como en exterior.",
      tipoFlor: "No tiene"
    },
    {
        nombre: "Lavanda",
        region: "Mediterránea",
        tipoPlanta: "Hierba",
        habitat: "Campo",
        descripcion: "Planta aromática conocida por su perfume relajante y propiedades medicinales.",
        tipoFlor: "Espiga"
      },
      {
        nombre: "Monstera",
        region: "América",
        tipoPlanta: "Follaje",
        habitat: "Selva",
        descripcion: "Planta tropical con hojas grandes y perforadas, muy popular en decoración de interiores.",
        tipoFlor: "No tiene"
      },
      {
        nombre: "Rosa",
        region: "Europa",
        tipoPlanta: "Flor",
        habitat: "Jardín",
        descripcion: "Una de las flores más populares por su belleza y fragancia, con múltiples variedades de color.",
        tipoFlor: "Pétalos"
      },
      {
        nombre: "Begonia",
        region: "América",
        tipoPlanta: "Flor",
        habitat: "Bosque",
        descripcion: "Planta ornamental con hojas y flores de colores vibrantes, que puede crecer tanto en interior como en exterior.",
        tipoFlor: "Pétalos"
      },
      {
        nombre: "Aloe vera",
        region: "África",
        tipoPlanta: "Suculenta",
        habitat: "Desierto",
        descripcion: "Planta con hojas carnosas que contienen un gel con propiedades medicinales y cosméticas.",
        tipoFlor: "Espiga"
      }
      
  ];
  
  // Obtener las referencias de los elementos del DOM
  const regionSelect = document.getElementById("region");
  const tipoSelect = document.getElementById("tipo");
  const habitatSelect = document.getElementById("habitat");
  const botonBuscar = document.getElementById("buscar");
  const resultadoDiv = document.getElementById("resultado");

  console.log(regionSelect);
  console.log(tipoSelect);
  console.log(habitatSelect);
  console.log(botonBuscar);
  console.log(resultadoDiv);
  
  // Alimentar las listas desplegables
  const regiones = new Set();
  const tiposPlantas = new Set();
  const habitats = new Set();
  plantas.forEach((planta) => {
    regiones.add(planta.region);
    tiposPlantas.add(planta.tipoPlanta);
    habitats.add(planta.habitat);
  });
  regiones.forEach((region) => {
    const opcion = document.createElement("option");
    opcion.value = region;
    opcion.textContent = region;
    regionSelect.appendChild(opcion);
  });
  tiposPlantas.forEach((tipoPlanta) => {
    const opcion = document.createElement("option");
    opcion.value = tipoPlanta;
    opcion.textContent = tipoPlanta;
    tipoSelect.appendChild(opcion);
  });
  habitats.forEach((habitat) => {
    const opcion = document.createElement("option");
    opcion.value = habitat;
    opcion.textContent = habitat;
    habitatSelect.appendChild(opcion);
  });
  console.log(regiones);
  if (!localStorage.getItem("historialBusquedas")) {
    localStorage.setItem("historialBusquedas", JSON.stringify([]));
  }
  


  // Agregar evento click al botón buscar
  botonBuscar.addEventListener("click", (event) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    
    const resultados = plantas.filter((planta) => {
      const regionSeleccionada = regionSelect.value;
      const tipoSeleccionado = tipoSelect.value;
      const habitatSeleccionado = habitatSelect.value;
      
      if (
        (regionSeleccionada && planta.region !== regionSeleccionada) ||
        (tipoSeleccionado && planta.tipoPlanta !== tipoSeleccionado) ||
        (habitatSeleccionado && planta.habitat !== habitatSeleccionado)
      ) {
        return false; // La planta no cumple con los criterios de búsqueda
      }
      
      return true; // La planta cumple con los criterios de búsqueda
    });
    
    console.log(resultados);

    if (resultados.length === 0) {
      resultadoDiv.textContent = "No se encontraron resultados"; // Mostrar un mensaje si no se encontraron resultados
    } else {
      resultadoDiv.innerHTML = ""; // Limpiar el contenido del elemento de resultados
      resultados.forEach((planta) => {
        const resultado = document.createElement("div");
        resultado.innerHTML = `
          <h3>${planta.nombre}</h3>
          <p><strong>Región:</strong> ${planta.region}</p>
          <p><strong>Tipo de planta:</strong> ${planta.tipoPlanta}</p>
          <p><strong>Hábitat:</strong> ${planta.habitat}</p>
          <p><strong>Descripción:</strong> ${planta.descripcion}</p>
          <p><strong>Tipo de flor:</strong> ${planta.tipoFlor}</p>
        `;
        resultadoDiv.appendChild(resultado);
      });
      
      const historial = JSON.parse(localStorage.getItem("historialBusquedas"));
      historial.push(resultados);
      localStorage.setItem("historialBusquedas", JSON.stringify(historial));
        console.log(historial);
    }
  
  });
