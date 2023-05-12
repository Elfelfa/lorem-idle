const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Experience extends Model {}

Experience.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        exp: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'experience'
    }
);

module.exports = Experience;