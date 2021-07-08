const db = require("../models");
const Supplier = db.suppliers;
const Op = db.Sequelize.Op;
const Product = db.products;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Supplier
  const supplier = {
    id:req.body.id,
    name: req.body.name
  };

  // Save Supplier in the database
  Supplier.create(supplier)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Supplier."
      });
    });

    var prod = req.body.product;
    if(prod){
    for(i=0;i<prod.length;i++){
      
        const product ={
          id:prod[i].id,
          name: prod[i].name,
          supplierId:req.body.id
        }
       
        // console.log(req.body.id);
        Product.create(product)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Product."
          });
        });
    }
    }
   
};

  exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Supplier.findAll({ where: condition})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving suppliers."
        });
      });
  };


  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Supplier.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Supplier with id=" + id
        });
      });
  };



  exports.update = (req, res) => {
    const id = req.params.id;
  
    Supplier.update(req.body, {
      where: { id: id  }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Supplier was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Supplier with id=${id}. Maybe Supplier was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Supplier with id=" + id
        });
      });
  };


  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Supplier.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Supplier was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Supplier with id=${id}. Maybe Supplier was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Supplier with id=" + id
        });
      });
  };

  
  exports.deleteAll = (req, res) => {
    Supplier.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Suppliers were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all suppliers."
        });
      });
  };

  
  //lalala
  //api/products/1/supplier GET
  exports.findSuppliersProduct = (req, res) => {
    const id = req.params.id;
    Product.findAll({ where: { supplierId: id }})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
      });
  };
  