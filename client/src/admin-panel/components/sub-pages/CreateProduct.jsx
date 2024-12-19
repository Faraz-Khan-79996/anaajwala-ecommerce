import ProductForm from '../ProductForm'
import { useNavigate } from "react-router-dom";
import ErrorBar from '../../../components/ErrorBar';
import { useState } from 'react';
import axios from 'axios';
function CreateProduct() {

    const [productCreating , setProductCreating] = useState(false)
    const [createError , setCreateError] = useState()
    const navigate = useNavigate()
    
    const createProduct = async (data)=>{
        try {
            setProductCreating(()=>true)
            console.log(data);
            const imagesArray = data.images.split(',')
            const payLoad = {...data , images:imagesArray}
            console.log(payLoad);
            
            const {data : responseData} = await axios.post(`/api/product/create` , payLoad , {withCredentials : true})
            navigate(`/product/${responseData.product._id}`)
            
        } catch (err) {
            if (err.response && err.response.data) {
                setCreateError(err.response.data.message);
            } else {
                setCreateError(err.message || "Something went wrong");
            }            
        }
        finally{
            setProductCreating(()=>false)
        }
    }

  return (
    <div className='mt-10'>
        {createError && <ErrorBar heading={`Error updating the product`}  message={createError.message} />}
        <ProductForm onSubmit={createProduct} loading={productCreating} />
    </div>
  )
}

export default CreateProduct