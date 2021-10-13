const UserModel = require("./user");
const PlantModel = require("./plant");
const CommentModel = require("./comment");

UserModel.hasMany(PlantModel);
PlantModel.belongsTo(UserModel);

PlantModel.hasMany(CommentModel);
CommentModel.belongsTo(PlantModel);

UserModel.hasMany(CommentModel);
CommentModel.belongsTo(UserModel);

module.exports = { UserModel, PlantModel, CommentModel };
