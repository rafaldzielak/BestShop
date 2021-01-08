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
  const categoryArr = categoryName.split(","); //1: ["Electronics", "Laptops", "Lap"] 2: ["Electronics", "Laptops"]
  let category;
  if (categoryArr.length === 0) {
    throw new Error("Category length is 0");
  }
  console.log(categoryArr);
  let lastCategory = categoryArr[categoryArr.length - 1]; //1: "Lap" 2: "Laptops"

  console.log("lastCategory: " + lastCategory);

  category = await categoryModel.findOne({ name: lastCategory }); //1: null //2: null
  console.log("category");
  console.log(category);
  if (category) {
    if (subcategory) category.subcategories.push(subcategory);
    category.save();
    return category;
  }
  console.log("categoryArr: " + categoryArr);

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
    console.log(categoryArr.join(","));
    const parent = await this.assignOrCreateCategory(categoryArr.join(","), category);
    const parents = [parent, ...parent.parents];
    category.parents = parents;
    const updatedCategory = await category.save();
    return updatedCategory;
  }
};
const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;
