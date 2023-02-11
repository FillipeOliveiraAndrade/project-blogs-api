const BlogPostSchema = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define(
    'BlogPost', 
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncremente: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { 
        type: DataTypes.STRING,
        foreingKey: true,
      },
      published: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updated: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      tableName: 'blog_posts',
      underscored: true,
      timestamps: false
    },
  );

  BlogPostTable.associate = (models) => {
    BlogPostTable.belongsTo(models.User, {
      foreingKey: 'user_id', as: 'users',
    });
  };

  return BlogPostTable;
};

module.exports = BlogPostSchema;