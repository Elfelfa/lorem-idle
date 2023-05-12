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
        modifier: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                max: 1.0,
                min: 0.4
            }
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tool_icon: {
            type: DataTypes.STRING,
            allowNull: true
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