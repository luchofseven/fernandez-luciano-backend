const express = require("express");
const Contenedor = require("./Contenedor");

const app = express();

const data = new Contenedor("./productos.txt");

app.get("/productos", async (req, res) => {
  try {
    const products = await data.getAll();
    console.log("Lectura exitosa");
    res.send(products);
  } catch (error) {
    console.log(`Ocurrio un error al leer los archivos ${error}`);
  }
});

app.get("/productoRandom", async (req, res) => {
  const products = await data.getAll();
  try {
    const randomProduct = await data.getById(
      Math.ceil(Math.random() * products.length)
    );
    res.send(randomProduct);
  } catch (error) {
    console.log(`Ocurrio un error al intentar leer el archivo ${error}`);
  }
});

const server = app.listen(8080, () => {
  console.log(`Servidor hhtp escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
