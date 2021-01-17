import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesAction,
  getCategoryAction,
  resetCategoryAction,
  createCategoryAction,
  removeCategoryAction,
} from "../actions/productActions";
import { Form, Button } from "react-bootstrap";
import FadeIn from "react-fade-in";
import Loader from "../components/Loader";
import Message from "../components/Message";

const AddCategoriesScreen = ({ history }) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoriesAction());
  }, [dispatch]);

  const getCategories = useSelector((state) => state.getCategories);
  const { loading, error, categories } = getCategories;
  const getCategory = useSelector((state) => state.getCategory);
  const { loading: loadingCategory, error: errorCategory, category } = getCategory;
  const createCategory = useSelector((state) => state.createCategory);
  const { loading: loadingCreate, error: errorCreate, success } = createCategory;
  const removeCategory = useSelector((state) => state.removeCategory);
  const { loading: loadingRemove, error: errorRemove, success: successRemove } = removeCategory;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategoryAction({ name: newCategoryName, parentId: parentCategory }));
  };
  const removeHandler = (e, id) => {
    if (window.confirm("Are you sure to delete this category with all it's subcategories?")) {
      e.stopPropagation();
      dispatch(removeCategoryAction(id));
    }
  };

  useEffect(() => {
    if (success || successRemove) {
      if (parentCategory) dispatch(getCategoryAction(parentCategory));
      else dispatch(getCategoriesAction());
      setNewCategoryName("");
    }
  }, [dispatch, success, parentCategory, successRemove]);

  const getSelectedCategory = (id) => {
    if (id) {
      setParentCategory(id);
      dispatch(getCategoryAction(id));
    } else {
      setParentCategory(null);
      dispatch(resetCategoryAction());
      dispatch(getCategoriesAction());
    }
  };

  return (
    <>
      {(error || errorCategory || errorCreate) && <Message>{errorCategory || errorCreate || error}</Message>}
      <div className='d-flex justify-content-center'>
        <div className='mt-3'>
          <Form.Label>Choose Parent Category</Form.Label>
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
                        <span>{category.name}</span>{" "}
                        <span>
                          <i onClick={(e) => removeHandler(e, category._id)} className='fas fa-trash'></i>
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </FadeIn>
            )}

            {category && (
              <>
                {loadingCreate ? (
                  <Loader marginTop={3} />
                ) : (
                  <FadeIn delay={20}>
                    <div
                      className='pointer'
                      onClick={() =>
                        getSelectedCategory(
                          category.parents && category.parents[0] ? category.parents[0]._id : null
                        )
                      }>
                      <i className='fas fa-chevron-left orange-font'></i> Go Back
                    </div>
                    <hr className='py-0 my-1' />
                    <div className='category-elem pl-1 py-1'>
                      <b>{category.name}</b>
                    </div>
                    {category.subcategories &&
                      category.subcategories.map((category) => (
                        <div
                          key={category._id}
                          className='category-elem pointer pl-3 py-1'
                          onClick={() => getSelectedCategory(category._id)}>
                          <span>{category.name}</span>{" "}
                          <span>
                            <i onClick={(e) => removeHandler(e, category._id)} className='fas fa-trash'></i>
                          </span>
                        </div>
                      ))}
                  </FadeIn>
                )}
              </>
            )}
          </nav>
          <Form onSubmit={submitHandler}>
            <Form.Group className='mt-3' style={{ width: "300px" }}>
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                size='lg'
                type='text'
                placeholder='Category Name'
              />
              <br />
            </Form.Group>
            <Button type='submit' block size='lg'>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddCategoriesScreen;
