const Category = require("../models/Category");

exports.getAll = async () => {
  const categories = await Category.find();

  return categories;
};
