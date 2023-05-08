const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model { 
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// TODO: format User table to have all necessary parameters
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            // TODO: reformat this variable to properly validate
            // TODO: figure out password hashing
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [12],
            },
        },
        progress_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'progress',
                key: 'id'
            }
        },
        inventory_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'inventory',
                key: 'id'
            }
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(udatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;
