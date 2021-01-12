import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesAction,
  getCategoryAction,
  resetCategoryAction,
  getProducts,
} from "../actions/productActions";
import { useHistory } from "react-router-dom";
import FadeIn from "react-fade-in";

const CategoryComponent = ({ startCategory, keyword, setCategory }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (startCategory) dispatch(getCategoryAction(startCategory));
    dispatch(getCategoriesAction());
    return () => dispatch(resetCategoryAction());
  }, [dispatch, startCategory]);

  const getCategories = useSelector((state) => state.getCategories);
  const { loading, categories } = getCategories;
  const getCategory = useSelector((state) => state.getCategory);
  const { loading: loadingCategory, category } = getCategory;

  const getSelectedCategory = (category) => {
    const id = category._id;
    if (id) {
      dispatch(getCategoryAction(id));
      if (setCategory) {
        setCategory(category);
      } else {
        const searchObj = { category: id };
        if (keyword) searchObj.keyword = keyword;
        // dispatch(getProducts(searchObj));
        const redirectPage = keyword ? `/search/${keyword}/category/${id}` : `/category/${id}`;
        history.push(redirectPage);
      }
    } else {
      dispatch(resetCategoryAction());
      dispatch(getCategoriesAction());
      if (setCategory) {
        setCategory(category);
      } else {
        dispatch(getProducts({}));
        history.push(`/`);
      }
    }
  };
  return (
    <nav
      className='border px-3 py-3 mt-2 mx-0'
      style={{ minHeight: "300px", width: "100%", fontSize: "1.15rem" }}>
      {!loading && !loadingCategory && (
        <FadeIn delay={20}>
          {!category && categories.length > 0 && (
            <>
              <div>
                <b>Categories</b>
              </div>
              <hr className='py-0 my-1' />
              {categories.map((category) => (
                <div
                  key={category._id}
                  className='category-elem pointer pl-1 py-1'
                  onClick={() => getSelectedCategory(category)}>
                  {category.name}
                </div>
              ))}
            </>
          )}
        </FadeIn>
      )}

      {category && (
        <>
          <FadeIn delay={20}>
            <div
              className='pointer'
              onClick={() =>
                getSelectedCategory(
                  category.parents.length > 0 ? category.parents[category.parents.length - 1] : ""
                )
              }>
              <i className='fas fa-chevron-left orange-font'></i> Go Back
            </div>
            <hr className='py-0 my-1' />
            <div className='category-elem pl-1 py-1'>
              <b>{category.name}</b>
            </div>
            {category.subcategories.map((category) => (
              <div
                key={category._id}
                className='category-elem pointer pl-3 py-1'
                onClick={() => getSelectedCategory(category)}>
                {category.name}
              </div>
            ))}
          </FadeIn>
        </>
      )}
      {}
    </nav>
  );
};

export default CategoryComponent;
