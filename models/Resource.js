const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Resource extends Model {}

Resource.init(
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
        skill_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'skills',
                key: 'id'
            }
        },
        skill_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        exp_reward: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        lvl_required: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        seconds_to_complete: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
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
        modelName: 'resource'
    }
);

module.exports = Resource;