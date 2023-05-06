const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tool extends Model {}

Tool.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        modifier: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                max: 1.0,
                min: 0.4
            }
        },
        purchased: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'tool'
    }
);

module.exports = Tool;