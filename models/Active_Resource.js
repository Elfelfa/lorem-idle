const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Active_Resource extends Model {}

Active_Resource.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        resource_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'resources',
                key: 'id'
            }
        },
        progress: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'activeResource'
    }
);

module.exports = Active_Resource;