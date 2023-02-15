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
      createdAt: 'published',
      updatedAt: 'updated',
    },
  );

  BlogPostTable.associate = (models) => {
    BlogPostTable.belongsTo(models.User, {
      foreingKey: 'userId', as: 'user',
    });
  };

  return BlogPostTable;
};

module.exports = BlogPostSchema;