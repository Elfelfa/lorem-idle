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
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        exp_reward: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        seconds_to_complete: {
            //////////////////////////////////////////////////////////////////////////////////
            //                               IMPORTANT!!!                                   //
            //                                                                              //
            //  This parameter needs to be even. Due to the tick based system of the game   //
            //  all completion times need to be able to be cleanly divisible by 0.6 seconds //
            //                                                                              //
            //////////////////////////////////////////////////////////////////////////////////

            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                // Custom validator to ensure that the integer is even.
                isEven(value) {
                    if(parseInt(value) % 2 !== 0) {
                        throw new Error('Only even values are allowed!');
                    }
                }
            }
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