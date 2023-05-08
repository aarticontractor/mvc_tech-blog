const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: require('./user'),
        key: 'id',
      },
    },
    blogpost_id: {
      type: DataTypes.INTEGER,
      references: {
        model: require('./blogpost'),
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'comment',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Comment;
