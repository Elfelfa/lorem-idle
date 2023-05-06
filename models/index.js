const Experience = require('./Experience');
const Skill = require('./Skill');
const Tool = require('./Tool');
const Resource = require('./Resource');
const Users = require('./User');

//TODO: create relationships between tables

// Sequelize should be able to create required keys to complete associations below.
// Also not including CASCADE as we do not want to delete material from other tables. As in if a user is deleted, we would not want to remove what type of pickaxe they have from the tool table.

Users.hasMany(Resource);

Users.hasMany(Skill);

Users.hasMany(Tool);

Users.hasOne(Experience);

// Consider having an association between tool and skill. Depends on where we want to put our equip lvl requirement logic.

module.exports = { Experience, Skill, Tool, Resource, Users };