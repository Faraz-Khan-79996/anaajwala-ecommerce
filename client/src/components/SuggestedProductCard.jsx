import { Link } from "react-router-dom"
import { FaRegComment } from 'react-icons/fa';

function SuggestedProductCard({product , index}) {
  return (
                <div key={index} className="max-w-72 min-w-[300px] mr-4">
                    <div className="overflow-hidden rounded shadow-lg">
                        <a href="#" />
                        <div className="relative">
                            <a href="#">
                                <img
                                    className="w-full h-[220px]"
                                    src={product.thumbnail}
                                    alt="Sunset in the mountains"
                                />
                                <div className="absolute bottom-0 left-0 right-0 top-0 bg-gray-900 opacity-25 transition duration-300 hover:bg-transparent" />
                            </a>
                            <a href="#!">
                                <div className="absolute bottom-0 left-0 bg-indigo-600 px-4 py-2 text-sm text-white transition duration-500 ease-in-out hover:bg-white hover:text-indigo-600">
                                    {product.type}
                                </div>
                            </a>
                            <a href="!#">
                                <div className="absolute right-0 top-0 mr-3 mt-3 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-indigo-600 px-4 text-sm text-white transition duration-500 ease-in-out hover:bg-white hover:text-indigo-600">
                                    <span className="font-bold">₹{product.price}</span>
                                    <small>{product.discount} % Off </small>
                                </div>
                            </a>
                        </div>
                        <div className="px-6 py-4 min-h-22">
                        <Link
    to={`/product/${product._id}`}
    className="inline-block text-lg text-wrap font-semibold transition duration-500 ease-in-out hover:text-indigo-600 !line-clamp-2"
>
    {product.name}
</Link>


                            {/* <p className="text-sm text-gray-500 ">
                                The city that never sleeps
                            </p> */}
                        </div>
                        <div className="flex flex-row items-center px-6 py-4">
                        <span
    className="font-regular mr-1 flex flex-row items-center py-1 text-sm text-gray-900"
>
    <FaRegComment className="text-yellow-500" /> {/* Star Icon */}
    <span className="ml-1">{product.ratings.numberOfReviews} Reviews</span>
</span>
                        </div>
                    </div>
                </div>

  )
}

export default SuggestedProductCard