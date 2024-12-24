import { useState, useEffect } from "react";
import type { TrainingPackage as TrainingPackageType } from "../config/types";
import { fetchTrainingPackage, deleteTrainingPackage } from "../config/api";
import EditTrainingPackageDialog from "../components/trainingpackage/EditTrainingPackageDialog";
import AddTrainingPackageDialog from "../components/trainingpackage/AddTrainingPackageDialog";

const TrainingPackage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<TrainingPackageType | null>(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [packages, setPackages] = useState<TrainingPackageType[]>([]);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const loadPackages = async () => {
        try {
            const data = await fetchTrainingPackage();
            setPackages(data);
        } catch (error) {
            console.error("Error fetching training packages:", error);
        }
    };

    const handleEdit = (pack: TrainingPackageType) => {
        setSelectedPackage(pack);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleAdd = (newPackage: TrainingPackageType) => {
        setPackages((prevPackages) => [...prevPackages, newPackage]);
    };

    const handleSave = (updatedPackage: TrainingPackageType) => {
        setPackages((prevList) =>
            prevList.map((pack) =>
                pack.id === updatedPackage.id ? updatedPackage : pack
            )
        );
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this package?")) {
            try {
                await deleteTrainingPackage(id);
                setPackages(packages.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Error deleting package:", error);
            }
        }
    };

    useEffect(() => {
        loadPackages();
    }, []);

    return (
        <div className="flex flex-col pl-16">
            <p className="font-bold text-4xl">
                Training Packages
            </p>

            <div className="font-medium text-green-600 mt-[2rem] mb-[1rem] ml-[3rem] hover:underline cursor-pointer"
                onClick={handleOpenAdd}>
                Add New Package
            </div>

            <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-[2rem] mr-[2rem]">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Package Name</th>
                                <th scope="col" className="px-6 py-3">Description</th>
                                <th scope="col" className="px-6 py-3">Price</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packages.map((pack) => (
                                <tr key={pack.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {pack.name}
                                    </th>
                                    <td className="px-6 py-4">{pack.description}</td>
                                    <td className="px-6 py-4">{pack.price}</td>
                                    <td className="px-6 py-4 flex">
                                        <div className="pr-5 font-medium text-blue-600 hover:underline cursor-pointer"
                                            onClick={() => handleEdit(pack)}>
                                            Edit
                                        </div>
                                        <div className="font-medium text-red-500 hover:underline cursor-pointer"
                                            onClick={() => handleDelete(pack.id)}>
                                            Delete
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <EditTrainingPackageDialog
                open={open}
                trainingPackage={selectedPackage}
                onClose={handleClose}
                onSave={handleSave}
            />
            <AddTrainingPackageDialog
                open={openAdd}
                onClose={handleCloseAdd}
                onAdd={handleAdd}
            />
        </div>
    );
};

export default TrainingPackage;