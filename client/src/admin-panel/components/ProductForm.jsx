import { useForm } from "react-hook-form";
import { FiTag, FiImage, FiEdit, FiType } from "react-icons/fi";
import { MdAttachMoney, MdCategory, MdOutlineInventory } from "react-icons/md";
import { productTypes , productCategories } from "../../utils/constantProductInformation";
import { Spinner } from 'flowbite-react'; // Import Flowbite Spinner

const ProductForm = ({ product = {}, onSubmit , loading=false }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: product && Object.keys(product).length !== 0 ? {...product , images : product.images.join(',')} : null
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {product?.name ? "Edit Product" : "Create New Product"}
      </h2>

      {/* Product Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-800">
            <FiTag className="inline mr-2 text-gray-500" />
            Product Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Product name is required" })}
            placeholder="Enter product name"
            className={`w-full px-4 text-gray-500 py-2 mt-1 border rounded-lg ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">
            <FiType className="inline mr-2 text-gray-500" />
            Product Type
          </label>
          <select
            {...register("type", { required: "Product type is required" })}
            className={`w-full text-gray-500 px-4 py-2 mt-1 border rounded-lg ${
              errors.type ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Product Type</option>
            {productTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type && (
            <span className="text-red-500 text-sm">{errors.type.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">
            <MdAttachMoney className="inline mr-2 text-gray-500" />
            Price
          </label>
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            placeholder="Enter price"
            className={`w-full text-gray-500 px-4 py-2 mt-1 border rounded-lg ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">
            <MdAttachMoney className="inline mr-2 text-gray-500" />
            MRP
          </label>
          <input
            type="number"
            {...register("MRP", { required: "MRP is required" })}
            placeholder="Enter MRP"
            className={`w-full text-gray-500 px-4  py-2 mt-1 border rounded-lg ${
              errors.MRP ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.MRP && (
            <span className="text-red-500 text-sm">{errors.MRP.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">
            <MdOutlineInventory className="inline mr-2 text-gray-500" />
            Size (in Kg)
          </label>
          <input
            type="number"
            {...register("size", { required: "Size is required" })}
            placeholder="Enter size"
            className={`w-full text-gray-500 px-4 py-2 mt-1 border rounded-lg ${
              errors.size ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.size && (
            <span className="text-red-500 text-sm">{errors.size.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">
            <FiImage className="inline mr-2 text-gray-500" />
            Thumbnail URL
          </label>
          <input
            type="url"
            {...register("thumbnail", {
              required: "Thumbnail URL is required",
            })}
            placeholder="Enter thumbnail URL"
            className={`w-full text-gray-500 px-4 py-2 mt-1 border rounded-lg ${
              errors.thumbnail ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.thumbnail && (
            <span className="text-red-500 text-sm">
              {errors.thumbnail.message}
            </span>
          )}
        </div>
      </div>

      {/* Images Section */}
      <div>
        <label className="block text-sm font-medium text-gray-800">
          <FiImage className="inline mr-2 text-gray-500" />
          Product Images (max 6)
        </label>
        <textarea
        {...register("images", {
          validate: (value) => {
            //console.log(value); // Logging the value for debugging
            // Ensure value is a string before calling split
            const images = String(value || ''); // Coerce to string if value is undefined or null
            return images.split(",").length <= 6 || "Maximum 6 images allowed";
          },
        })}
        placeholder="Enter image URLs, comma-separated"
        className={`w-full text-gray-500 px-4 py-2 mt-1 border rounded-lg ${
          errors.images ? "border-red-500" : "border-gray-300"
        }`}
      />
        {errors.images && (
          <span className="text-red-500 text-sm">{errors.images.message}</span>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-800">
          <FiEdit className="inline mr-2 text-gray-500" />
          Description
        </label>
        <textarea
          {...register("description", {
            required: "Description is required",
          })}
          placeholder="Enter product description"
          className={`w-full text-gray-500 px-4 py-2 mt-1 border rounded-lg ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </div>

      {/* Stock, Category, Ratings, and Discount Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-800">
            <MdOutlineInventory className="inline mr-2 text-gray-500" />
            Stock Quantity
          </label>
          <input
            type="number"
            {...register("stockQuantity", {
              required: "Stock quantity is required",
            })}
            placeholder="Enter stock quantity"
            className={`w-full text-gray-500 px-4 py-2 mt-1 border rounded-lg ${
              errors.stockQuantity ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.stockQuantity && (
            <span className="text-red-500 text-sm">
              {errors.stockQuantity.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">
            <MdCategory className="inline mr-2 text-gray-500" />
            Product Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className={`w-full text-gray-500 px-4 py-2 mt-1 border rounded-lg ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Product Category</option>
            {productCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category.message}
            </span>
          )}
        </div>

        {/* Ratings Section */}
        <div>
          <label className="block text-sm font-medium text-gray-800">
            Ratings (Average) (0-5)
          </label>
          <input
            type="number"
            step="0.1"
            {...register("ratings.average", {
              required: "Average Rating is required",
              validate: (value) => {
                return value <= 5 || "Rating should be in range 0-5";
              },
            })}
            placeholder="Enter average rating"
            className={`w-full text-gray-500 px-4 py-2 mt-1 border rounded-lg ${
              errors.ratings?.average ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">
            Ratings (Number of Reviews)
          </label>
          <input
            type="number"
            {...register("ratings.numberOfReviews" , { required: "Review count is required!" })}
            placeholder="Enter number of reviews"
            className={`w-full text-gray-500 px-4 py-2 mt-1 border rounded-lg ${
              errors.ratings?.numberOfReviews
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">
            Discount (in %)
          </label>
          <input
            type="number"
            {...register("discount", {
              required: "Discount is required!",
              validate: (value) => {
                if (value < 0 || value > 100) {
                  return "Discount should be between 0 and 100.";
                }
              },
            })}
            placeholder="Enter discount percentage"
            className={`w-full text-gray-500 px-4 py-2 mt-1 border rounded-lg ${
              errors.discount ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.discount && (
            <span className="text-red-500 text-sm">{errors.discount.message}</span>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-right">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
        >
          
          {loading ? (
          // Show spinner when loading
          <span className="flex items-center">
            <Spinner size="sm" color="white" />
            <span className="ml-2">Loading...</span>
          </span>
        ) : (
          <>{product?.name ? "Update Product" : "Create Product"}</>
        )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
