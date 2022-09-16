const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('temper', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
};