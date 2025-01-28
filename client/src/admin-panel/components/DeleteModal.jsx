import { Button, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import useDeleteUser from "../../hooks/useDeleteUser";

export function DeleteModal({ userId }) {
    const [openModal, setOpenModal] = useState(false);
    const [password, setPassword] = useState("");
    const { loading, error, deleteUser } = useDeleteUser();

    const handleDelete = async () => {
        await deleteUser(userId, password);
        setOpenModal(false);
    };

    return (
        <>
            <Button onClick={() => setOpenModal(true)} color="failure">
                <MdDelete size={20} />
            </Button>
            <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
                popup
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this user?
                        </h3>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                        />
                        <div className="flex justify-center gap-4">
                            <Button
                                color="failure"
                                onClick={handleDelete}
                                disabled={loading}
                            >
                                {loading ? (
                                    <Spinner
                                        size="sm"
                                        className="mr-2"
                                        aria-label="Loading"
                                    />
                                ) : (
                                    "Yes, I'm sure"
                                )}
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => setOpenModal(false)}
                            >
                                No, cancel
                            </Button>
                        </div>
                        {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
