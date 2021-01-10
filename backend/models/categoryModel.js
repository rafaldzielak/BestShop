import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: { type: String, required: true, default: "" },
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, required: true, default: null, unique: true }],
  parents: [{ type: mongoose.Schema.Types.ObjectId, unique: true }],
  level: { type: Number, required: true, default: 0 },
});

categorySchema.statics.assignOrCreateCategory = async function (
  categoryName = "Electronics,Laptops,Lap",
  subcategory
) {
  const categoryArr = categoryName.split(",");
  let category;
  if (categoryArr.length === 0) {
    throw new Error("Category length is 0");
  }
  let lastCategory = categoryArr[categoryArr.length - 1];

  category = await categoryModel.findOne({ name: lastCategory });
  if (category) {
    if (subcategory) category.subcategories.push(subcategory);
    category.save();
    return category;
  }

  if (categoryArr.length === 1) {
    category = await categoryModel.create({
      name: lastCategory,
      parents: [],
      subcategories: [subcategory],
      level: 0,
    });
    return category;
  } else {
    //1
    categoryArr.pop();
    category = await categoryModel.create({
      name: lastCategory,
      subcategories: subcategory ? [subcategory] : [],
      level: categoryArr.length,
    });
    const parent = await this.assignOrCreateCategory(categoryArr.join(","), category);
    const parents = [parent, ...parent.parents];
    category.parents = parents;
    const updatedCategory = await category.save();
    return updatedCategory;
  }
};
const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;
