const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define(
    'PostCategory', 
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        reference: {
          model: 'BlogSpot',
          key: 'id',
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        reference: {
          model: 'Category',
          key: 'id',
        },
      },
    },
    {
      tableName: 'posts_categories',
      underscored: true,
      timestamps: false
    },
  );

  PostCategoryTable.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blog_posts',
      through: PostCategoryTable,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });

    models.BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        through: PostCategoryTable,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
  };

  return PostCategoryTable;
};

module.exports = PostCategorySchema;