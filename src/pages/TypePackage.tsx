import { useState, useEffect } from "react";
import type { TypePackage as TypePackageType } from "../config/types";
import { fetchTypePackage, deleteTypePackage } from "../config/api";
import EditTypePackageDialog from "../components/typepackage/EditTypePackageDialog";
import AddTypePackageDialog from "../components/typepackage/AddTypePackageDialog";

const TypePackage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<TypePackageType | null>(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [packages, setPackages] = useState<TypePackageType[]>([]);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const loadPackages = async () => {
        try {
            const data = await fetchTypePackage();
            setPackages(data);
        } catch (error) {
            console.error("Error fetching type packages:", error);
        }
    };

    const handleEdit = (pack: TypePackageType) => {
        setSelectedPackage(pack);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleAdd = (newPackage: TypePackageType) => {
        setPackages((prevPackages) => [...prevPackages, newPackage]);
    };

    const handleSave = (updatedPackage: TypePackageType) => {
        setPackages((prevList) =>
            prevList.map((pack) =>
                pack.id === updatedPackage.id ? updatedPackage : pack
            )
        );
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this package type?")) {
            try {
                await deleteTypePackage(id);
                setPackages(packages.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Error deleting package type:", error);
            }
        }
    };

    useEffect(() => {
        loadPackages();
    }, []);

    return (
        <div className="flex flex-col pl-16">
            <p className="font-bold text-4xl">
                Package Types
            </p>

            <div className="font-medium text-green-600 mt-[2rem] mb-[1rem] ml-[3rem] hover:underline cursor-pointer"
                onClick={handleOpenAdd}>
                Add New Package Type
            </div>

            <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-[2rem] mr-[2rem]">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Duration</th>
                                <th scope="col" className="px-6 py-3">Rate</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packages.map((pack) => (
                                <tr key={pack.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {pack.name}
                                    </th>
                                    <td className="px-6 py-4">{pack.duration}</td>
                                    <td className="px-6 py-4">{pack.rate}</td>
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

            <EditTypePackageDialog
                open={open}
                typePackage={selectedPackage}
                onClose={handleClose}
                onSave={handleSave}
            />
            <AddTypePackageDialog
                open={openAdd}
                onClose={handleCloseAdd}
                onAdd={handleAdd}
            />
        </div>
    );
};

export default TypePackage;