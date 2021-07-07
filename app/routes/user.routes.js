const { users } = require("../models/index.js");

module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Supplier
    router.post("/", users.create);
  
    // Retrieve all Suppliers
    router.get("/", users.findAll);
  
    //lalala
    // Retrieve all /api/supplier/1/products Suppliers
    // router.get("/:id/products", users.findSuppliersProduct);
  
    // Retrieve a single Supplier with id
    router.get("/:id", users.findOne);

    // Retrieve a single Supplier with id
    router.get("/:id", users.findOne);

      // Update a Supplier with id
  router.put("/:id", users.update);

  // Delete a Supplier with id
  router.delete("/:id", users.delete);

  // Delete all Suppliers
  router.delete("/", users.deleteAll);

  app.use('/api/users', router);
}