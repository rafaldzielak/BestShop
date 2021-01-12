import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesAction,
  getCategoryAction,
  resetCategoryAction,
  getProducts,
} from "../actions/productActions";
import { useHistory } from "react-router-dom";
import FadeIn from "react-fade-in";

const CurrentPathComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const getCategory = useSelector((state) => state.getCategory);
  const { category } = getCategory;

  const getSelectedCategory = (id) => {
    if (id) {
      dispatch(getCategoryAction(id));
      dispatch(getProducts({ category: id }));
      history.push(`/category/${id}`);
    } else {
      dispatch(resetCategoryAction());
      dispatch(getCategoriesAction());
      dispatch(getProducts({}));
      history.push(`/`);
    }
  };

  const arrowRight = <i className='fas fa-chevron-right'></i>;

  return (
    <FadeIn>
      <nav className='mt-3' style={{ fontSize: "1rem" }}>
        {category && (
          <nav>
            <span onClick={() => getSelectedCategory()} className='pr-3 pointer'>
              BestShop
            </span>
            {arrowRight}{" "}
            {category.parents.reverse().map((parent) => (
              <span key={parent._id}>
                <span onClick={() => getSelectedCategory(parent._id)} className='pr-3 pointer'>
                  {parent.name}
                </span>
                {arrowRight}{" "}
              </span>
            ))}
            <span onClick={() => getSelectedCategory(category._id)} className='pr-3 pointer'>
              {category.name}
            </span>
            <hr />
          </nav>
        )}
      </nav>
    </FadeIn>
  );
};

export default CurrentPathComponent;
