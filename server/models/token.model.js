module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define(
    "token",
    {
      token: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "token is required" },
        },
      },
    },
    {
      paranoid: true,
    }
  );

  return Token;
};
