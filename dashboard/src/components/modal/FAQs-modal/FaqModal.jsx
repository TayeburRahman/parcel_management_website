import { motion } from 'framer-motion';

const FaqModal = ({setCurrentFAQ, currentFAQ, setIsModalOpen, handleSave, isEditMode,}) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-xs z-50"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white p-6 rounded-md shadow-lg w-[600px]"
                >
                    <h2 className="text-lg font-semibold mb-4">
                        {isEditMode ? 'Edit FAQ' : 'Add FAQ'}
                    </h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Question</label>
                        <input
                            type="text"
                            value={currentFAQ.question || ''}
                            onChange={(e) =>
                                setCurrentFAQ({
                                    ...currentFAQ,
                                    question: e.target.value,
                                })
                            }
                            className="w-full p-2 border rounded mt-1 outline-none border-[#5CA97E]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Answer</label>
                        <textarea
                            value={currentFAQ.answer || ''}
                            onChange={(e) =>
                                setCurrentFAQ({
                                    ...currentFAQ,
                                    answer: e.target.value,
                                })
                            }
                            className="w-full p-2 border border-[#5CA97E] rounded mt-1 outline-none"
                            rows="4"
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-[#278450] text-white rounded hover:bg-green-800 text-sm cursor-pointer"
                        >
                            {isEditMode ? 'Save Changes' : 'Add FAQ'}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

export default FaqModal;