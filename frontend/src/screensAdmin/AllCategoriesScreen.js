import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button, Image, Fade, ListGroup } from "react-bootstrap";
import { getCategoriesAction, getCategoryAction, resetCategoryAction } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import FadeIn from "react-fade-in";

const AllCategoriesScreen = ({ history }) => {
  const [currentCategory, setcurrentCategory] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);
  const [open, setOpen] = useState(false);

  const getCategories = useSelector((state) => state.getCategories);
  const { loading, error, categories } = getCategories;
  const getCategory = useSelector((state) => state.getCategory);
  const { loading: loadingCategory, error: errorCategory, category } = getCategory;
  console.log(categories);

  const getSelectedCategory = (id) => {
    if (id) {
      setcurrentCategory(id);
      dispatch(getCategoryAction(id));
    } else {
      setcurrentCategory("");
      dispatch(resetCategoryAction());
      dispatch(getCategoriesAction());
    }
  };
  return (
    <nav className='border px-3 py-3' style={{ minHeight: "300px", width: "300px", fontSize: "1rem" }}>
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
            <div className='pointer' onClick={() => getSelectedCategory(category.parents[0])}>
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

export default AllCategoriesScreen;
