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

const CategoryComponent = ({ startCategory, keyword }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (startCategory) dispatch(getCategoryAction(startCategory));
    dispatch(getCategoriesAction());
    return () => dispatch(resetCategoryAction());
  }, []);

  const getCategories = useSelector((state) => state.getCategories);
  const { loading, error, categories } = getCategories;
  const getCategory = useSelector((state) => state.getCategory);
  const { loading: loadingCategory, error: errorCategory, category } = getCategory;

  const getSelectedCategory = (id) => {
    if (id) {
      dispatch(getCategoryAction(id));
      const searchObj = { category: id };
      if (keyword) searchObj.keyword = keyword;
      dispatch(getProducts(searchObj));
      const redirectPage = keyword ? `/search/${keyword}/category/${id}` : `/category/${id}`;
      history.push(redirectPage);
    } else {
      dispatch(resetCategoryAction());
      dispatch(getCategoriesAction());
      dispatch(getProducts({}));
      history.push(`/`);
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
                  onClick={() => getSelectedCategory(category._id)}>
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
              onClick={() => getSelectedCategory(category.parents[0] ? category.parents[0]._id : "")}>
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
                onClick={() => getSelectedCategory(category._id)}>
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
