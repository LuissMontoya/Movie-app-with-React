import "../App.css";
import Pelicula from "./Pelicula";
import PageWrapper from "./PageWrapper";
import Paginacion from "./Paginacion";
import { useEffect, useState } from "react";

function ListadoPeliculas() {
  const [paginaActual, setPaginaActual] = useState(1);
  const [peliculas, setPeliculas] = useState([]);
  const total_por_pagina = 7;

  useEffect(() => {
    buscarPeliculas();
  }, []);

  const buscarPeliculas = async () => {
    let url =
      "https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/lucasmoy-dev/Curso-de-React/main/Proyecto%202%20-%20Web%20de%20Peliculas/Proyecto%20Terminado/src/peliculas.json";

    //https://cors-anywhere.herokuapp.com/

    let respuesta = await fetch(url, {
      method: "GET",
      //mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Origin: "https://raw.githubusercontent.com/",
      },
    });

    let json = await respuesta.json();
    setPeliculas(json);
    //alert(json);
    //alert(json);
  };

  const cargarPeliculas = () => {
    //Paginas[0-4]
    //Paginas[5-9]
    peliculas = peliculas.slice(
      (paginaActual - 1) * total_por_pagina,
      paginaActual * total_por_pagina
    );
  };

  //peliculas.map((pelicula) => {
  //  return "";
  //});

  const getTotalPaginas = () => {
    let cantidadTotalDePeliculas = peliculas.length;
    return Math.ceil(cantidadTotalDePeliculas / total_por_pagina);
  };

  let peliculasPorPagina = peliculas.slice(
    (paginaActual - 1) * total_por_pagina,
    paginaActual * total_por_pagina
  );


  return (
    <PageWrapper>
      {peliculasPorPagina.map((pelicula) => (
        <Pelicula
          titulo={pelicula.titulo}
          calificacion={pelicula.calificacion}
          director={pelicula.director}
          actores={pelicula.actores}
          fecha={pelicula.fecha}
          duracion={pelicula.duracion}
          img={pelicula.img}
        >
          {pelicula.descripcion}
        </Pelicula>
      ))}

      <Paginacion
        pagina={paginaActual}
        total={getTotalPaginas()}
        onChange={(pagina) => {
          setPaginaActual(pagina);
        }}
      />
    </PageWrapper>
  );
}

export default ListadoPeliculas;
