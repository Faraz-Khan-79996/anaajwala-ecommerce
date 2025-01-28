import BarLoader from "../components/BarLoader";
import ErrorComponent from "../components/ErrorComponent";
import useFetchProducts from "../hooks/useFetchProducts";
import ProductCard from "../pages/Landing-page/components/ProductCard";

function Page3() {
    const { products, loading, error } = useFetchProducts();

    if (loading) {
        return <BarLoader />;
    }

    if (error) {
        return (
            <ErrorComponent
                header="Error while fetching products"
                message={error.message}
            />
        );
    }
    return (
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {products &&
                    products.length > 0 &&
                    products.map((item) => (
                        <>
                            <ProductCard
                                admin={true}
                                key={item.id}
                                item={item}
                            />
                        </>
                    ))}
            </div>
        </div>
    );
}

export default Page3;
