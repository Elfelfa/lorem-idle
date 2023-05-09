const Skill = require('./Skill');
const Item = require('./Item');
const User = require('./User');
const Tool = require('./Tool');
const Resource = require('./Resource');
const Progress = require('./Progress');
const Inventory = require('./Inventory');
const Active_Resource = require('./Active_Resource');

//TODO: create relationships between tables

// Sequelize should be able to create required keys to complete associations below.
// Also not including CASCADE as we do not want to delete material from other tables. As in if a user is deleted, we would not want to remove what type of pickaxe they have from the tool table.

User.hasMany(Progress, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Inventory, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Skill.hasMany(Progress, {
    foreignKey: 'skill_id'
});

Skill.hasMany(Tool, {
    foreignKey: 'skill_id'
});

Skill.hasMany(Item, {
    foreignKey: 'skill_id'
});

Skill.hasMany(Resource, {
    foreignKey: 'skill_id'
});

Progress.belongsTo(User, {
    foreignKey: 'user_id'
});

Inventory.belongsTo(User, {
    foreignKey: 'user_id'
});

Progress.belongsTo(Skill, {
    foreignKey: 'skill_id',    
});

Resource.belongsTo(Skill, {
    foreignKey: 'skill_id',    
});

Tool.belongsTo(Skill, {
    foreignKey: 'skill_id',
});

Item.belongsTo(Skill, {
    foreignKey: 'skill_id',
});

User.belongsToMany(Resource, {
    through: {
        model: Active_Resource,
        unique: false
    },

    as: 'active_resource'
});

Resource.belongsToMany(User, {
    through: {
        model: Active_Resource,
        unique: false
    },

    as: 'active_resource'
});

// Consider having an association between tool and skill. Depends on where we want to put our equip lvl requirement logic.

module.exports = { Skill, Item, User, Tool, Resource, Progress, Inventory, Active_Resource };