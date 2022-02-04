const { Sequelize, Datatypes } = require("sequelize");

module.exports = (sequelize, Datatypes) => {
  const Movie = sequelize.define(
    "Movie",
    {
      id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Datatypes.STRING,
        alowNull: false,
      },
      casts: {
        type: Datatypes.STRING,
        alowNull: false,
      },
      director: {
        type: Datatypes.STRING,
        alowNull: false,
      },
      poster: {
        type: Datatypes.STRING,
        alowNull: false,
      },
      rating: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
      tableName: "movies",
      schema: "public",
    }
  );
  return Movie;
}; 