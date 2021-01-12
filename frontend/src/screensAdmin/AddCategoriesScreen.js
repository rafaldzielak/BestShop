import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesAction,
  getCategoryAction,
  resetCategoryAction,
  createCategoryAction,
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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategoryAction({ name: newCategoryName, parentId: parentCategory }));
  };

  useEffect(() => {
    if (success) {
      dispatch(getCategoryAction(parentCategory));
      setNewCategoryName("");
    }
  }, [dispatch, success, parentCategory]);

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
    <div className='d-flex justify-content-center'>
      {(error || errorCategory || errorCreate) && <Message>{errorCategory || errorCreate || error}</Message>}
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
                      {category.name}
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
  );
};

export default AddCategoriesScreen;