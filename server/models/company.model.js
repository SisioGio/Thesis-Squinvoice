module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define(
    "company",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "name is required" },
        },
      },
      identificator: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "identificator is required" },
        },
      },
    },
    {
      paranoid: true,
    }
  );

  return Company;
};
