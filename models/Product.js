// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {
    // define our model's structure
  static structure() {
    return {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      product_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      product_stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      product_image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    };
  }
  
  // define our model's options
  static options() {
    return {
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'product',
      // define our associations
      associations: [ 
        'ProductTag',
        'ProductCategory'
      ]
    };
  }

  // add a method to the Product class
  static async getAllProducts() {
    // return all products
    return await Product.findAll({
      attributes: [
        'id',
        'product_name',
        'price',
        'stock',
        'category_id',
        'created_at',
        'updated_at'
      ],
      include: [
        {
          model: Category,
          attributes: ['category_name']
        }
      ]
    });
  }
  
  static async getProductById(id) {
    // return a product by id
    return await Product.findOne({
      attributes: [
        'id',
        'product_name',
        'price',
        'stock',
        'category_id',
        'created_at',
        'updated_at'
      ],
      where: { id },
      include: [
        {
          model: Category,
          attributes: ['category_name']
        }
      ]
    });
  }

  static async getProductByCategory(category_id) {
    // return a product by category
    return await Product.findAll({
      attributes: [
        'id',
        'product_name',
        'price',
        'stock',
        'category_id',
        'created_at',
        'updated_at'
      ],
      where: { category_id },
      include: [
        {
          model: Category,
          attributes: ['category_name']
        }
      ]
    });
  }

  static async createProduct(newProduct) {
    // create a new product and return the new product
    return await Product.create(newProduct);
  }

  static async updateProduct(id, updatedProduct) {
    // update a product by id and return the updated product
    return await Product.update(updatedProduct, {
      where: { id }
    });
  }

  static async deleteProduct(id) {
    // delete a product by id
    return await Product.destroy({
      where: { id }
    });
  }

  static async getProductTags(id) {
    // return all tags for a product
    return await Product.findOne({
      attributes: [],
      where: { id },
      include: [
        {
          model: Tag,
          attributes: ['tag_name'],
          through: {
            attributes: []
          }
        }
      ]
    });
  }

  static async addProductTag(id, tag_id) {
    // add a tag to a product
    return await Product.findOne({
      attributes: [],
      where: { id },
      include: [
        {
          model: Tag,
          attributes: [],
          through: {
            attributes: []
          }
        }
      ]
    }).then(product => {
      product.addTag(tag_id);
    });
  }

  static async removeProductTag(id, tag_id) {
    // remove a tag from a product
    return await Product.findOne({
      attributes: [],
      where: { id },
      include: [
        {
          model: Tag,
          attributes: [],
          through: {
            attributes: []
          }
        }
      ]
    }).then(product => {
      product.removeTag(tag_id);
    });
  }
}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    product_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    product_stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;