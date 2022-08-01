const {promises: fs} = require("fs");

class Contenedor {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async save(obj) {
    const products = await this.getAll();
    if (products.length == 0) {
      const newProduct = {...obj, id: 1};
      products.push(newProduct);
      try {
        await fs.writeFile(
          this.ruta,
          JSON.stringify(products, null, 2),
          "utf-8"
        );
        console.log(
          `Producto guardado exitosamente con el id ${newProduct.id}`
        );
      } catch (error) {
        return console.log(
          `Ocurrio un error al intentar guardar el producto ${error}`
        );
      }
    } else if (products.length > 0) {
      const newId = products[products.length - 1].id + 1;
      const newProduct = {...obj, id: newId};
      products.push(newProduct);
      try {
        await fs.writeFile(this.ruta, JSON.stringify(products, null, 2));
        console.log(
          `Producto guardado exitosamente con el id ${newProduct.id}`
        );
      } catch (error) {
        return console.log(
          `Ocurrio un error al intentar guardar el producto ${error}`
        );
      }
    }
  }

  async getById(id) {
    try {
      const products = await this.getAll();
      const productById = products.find((p) => p.id == id);
      return productById;
    } catch (error) {
      return console.log(`Ocurrio un error ${error}`);
    }
  }

  async getAll() {
    try {
      const products = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      return [];
    }
  }

  async deleteById(id) {
    try {
      const products = await this.getAll();
      const productDelete = products.filter((product) => product.id != id);
      await fs.writeFile(this.ruta, JSON.stringify(productDelete, null, 2));
      console.log("Producto eliminado correctamente");
    } catch (error) {
      console.log(`Ocurrio un error al intentar eliminar el producto ${error}`);
    }
  }

  async deleteAll() {
    await fs.unlink(this.ruta, (error) => {
      if (error) {
        console.log(`Ocurrio un error al intentar borrar el archivo: ${error}`);
      } else {
        console.log("Archivo eliminado correctamente");
      }
    });
  }
}

module.exports = Contenedor;
