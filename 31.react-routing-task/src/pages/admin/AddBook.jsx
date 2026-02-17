import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import "./admin.css";

const AddBook = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required")
      .positive("Price must be positive"),
    description: Yup.string().required("Description is required"),
    coverImageURL: Yup.string()
      .url("Must be a valid URL")
      .required("Cover Image URL is required"),
    stock: Yup.number()
      .typeError("Stock must be a number")
      .integer("Stock must be an integer")
      .min(0, "Stock cannot be negative")
      .default(0),
    rating: Yup.number()
      .typeError("Rating must be a number")
      .min(0, "Min rating is 0")
      .max(5, "Max rating is 5")
      .default(5),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      price: "",
      description: "",
      coverImageURL: "",
      stock: "",
      rating: 5,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {

        console.log("SUBMIT VALUES:", values);


        const payload = {
          title: values.title.trim(),
          author: values.author.trim(),
          description: values.description.trim(),

          price: Number(values.price),
          stock: values.stock === "" ? 0 : Number(values.stock),
          rating: Number(values.rating),

          image: values.coverImageURL.trim(),
          coverImageURL: values.coverImageURL.trim(),
          coverImageUrl: values.coverImageURL.trim(),
        };

        const res = await api.post("/books", payload);
        console.log("ADD BOOK RESPONSE:", res?.data);

        toast.success("Book added successfully!");
        resetForm();
        navigate("/admin/books");
      } catch (error) {

        console.error("Error adding book:", error);
        console.log("STATUS:", error?.response?.status);
        console.log("DATA:", error?.response?.data);

        toast.error(
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to add book"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const hasError = (name) => formik.touched[name] && formik.errors[name];

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-card-header">
          <h1 className="admin-title">Add New Book</h1>
          <p className="admin-subtitle">
            Fill in the details and submit to create a new book.
          </p>
        </div>


        <form onSubmit={formik.handleSubmit} className="admin-form">
          <div className="admin-grid">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Clean Code"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                className={hasError("title") ? "input error" : "input"}
              />
              {hasError("title") && (
                <div className="error-text">{formik.errors.title}</div>
              )}
            </div>

            <div className="form-group">
              <label>Author *</label>
              <input
                type="text"
                name="author"
                placeholder="e.g. Robert C. Martin"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.author}
                className={hasError("author") ? "input error" : "input"}
              />
              {hasError("author") && (
                <div className="error-text">{formik.errors.author}</div>
              )}
            </div>

            <div className="form-group">
              <label>Price *</label>
              <input
                type="number"
                name="price"
                step="0.01"
                placeholder="e.g. 19.99"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                className={hasError("price") ? "input error" : "input"}
              />
              {hasError("price") && (
                <div className="error-text">{formik.errors.price}</div>
              )}
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                placeholder="0"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stock}
                className={hasError("stock") ? "input error" : "input"}
              />
              {hasError("stock") && (
                <div className="error-text">{formik.errors.stock}</div>
              )}
            </div>

            <div className="form-group">
              <label>Rating</label>
              <input
                type="number"
                name="rating"
                step="0.1"
                min="0"
                max="5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rating}
                className={hasError("rating") ? "input error" : "input"}
              />
              {hasError("rating") && (
                <div className="error-text">{formik.errors.rating}</div>
              )}
            </div>

            <div className="form-group full">
              <label>Cover Image URL *</label>
              <input
                type="url"
                name="coverImageURL"
                placeholder="https://..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.coverImageURL}
                className={hasError("coverImageURL") ? "input error" : "input"}
              />
              {hasError("coverImageURL") && (
                <div className="error-text">{formik.errors.coverImageURL}</div>
              )}
            </div>

            <div className="form-group full">
              <label>Description *</label>
              <textarea
                name="description"
                rows="5"
                placeholder="Write a short description..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                className={hasError("description") ? "textarea error" : "textarea"}
              />
              {hasError("description") && (
                <div className="error-text">{formik.errors.description}</div>
              )}
            </div>
          </div>

          <div className="admin-actions">
            <button
              type="button"
              className="btn secondary"
              onClick={() => navigate("/admin/books")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn primary"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Adding..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
