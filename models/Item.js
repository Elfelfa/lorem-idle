const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Item extends Model {}

Item.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        skill_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'skills',
                key: 'id'
           }
        },
        skill_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        item_icon: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'item'
    }
);

module.exports = Item;