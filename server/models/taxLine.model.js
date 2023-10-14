module.exports = (sequelize, Sequelize) => {
  const TaxLine = sequelize.define(
    "taxLine",
    {
      taxDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "description is required" },
        },
      },
      taxPercentage: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notNull: { msg: "taxPercentage is required" },
        },
      },

      netAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notNull: { msg: "netAmount is required" },
        },
      },
      taxAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notNull: { msg: "taxAmount is required" },
        },
      },
    },
    {
      paranoid: true,
    }
  );

  return TaxLine;
};
