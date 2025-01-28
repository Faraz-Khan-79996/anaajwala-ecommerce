import CircleLoader from "react-spinners/CircleLoader";

export default function Loader({ color = "violet" }) {
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    return (
        <>
            <div className="flex items-center justify-center w-full h-screen">
                <CircleLoader
                    color={color}
                    loading={true}
                    cssOverride={override}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </>
    );
}
