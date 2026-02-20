import { cardComponent } from "../../components/card.js";


fetch("/data/productos.json")
  .then(res => res.json())
  .then(productos => {
    
    const autos = productos
      .filter(p => p.categoria === "autos")
      .slice(0, 2);

    const lanchas = productos
      .filter(p => p.categoria === "lanchas")
      .slice(0, 2);

    const motos = productos
      .filter(p => p.categoria === "motos")
      .slice(0, 2);
    document.getElementById("home-autos").innerHTML =
      autos.map(cardComponent).join("");

    document.getElementById("home-lanchas").innerHTML =
      lanchas.map(cardComponent).join("");

    document.getElementById("home-motos").innerHTML =
      motos.map(cardComponent).join("");
   
  })
  