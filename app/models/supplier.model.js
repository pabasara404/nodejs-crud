module.exports = (sequelize, Sequelize) => {
    const Supplier = sequelize.define("supplier", {
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Supplier;
  };