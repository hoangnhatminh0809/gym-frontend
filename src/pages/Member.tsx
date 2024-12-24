import { useState, useEffect } from "react";
import type { Membership } from "../config/types";
import { fetchMembership, deleteMembership } from "../config/api";
import EditMembershipDialog from "../components/membership/EditMembershipDialog";
import AddMembershipDialog from "../components/membership/AddMembershipDialog";

const Member: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [selectedMembership, setSelectedMembership] = useState<Membership | null>(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [memberships, setMemberships] = useState<Membership[]>([]);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const loadMemberships = async () => {
        try {
            const data = await fetchMembership();
            setMemberships(data);
        } catch (error) {
            console.error("Error fetching memberships:", error);
        }
    };

    const handleEdit = (membership: Membership) => {
        setSelectedMembership(membership);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleAdd = (newMembership: Membership) => {
        setMemberships((prevMemberships) => [...prevMemberships, newMembership]);
    };

    const handleSave = (updatedMembership: Membership) => {
        setMemberships((prevList) =>
            prevList.map((item) =>
                item.id === updatedMembership.id ? updatedMembership : item
            )
        );
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this membership?")) {
            try {
                await deleteMembership(id);
                setMemberships(memberships.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Error deleting membership:", error);
            }
        }
    };

    useEffect(() => {
        loadMemberships();
    }, []);

    return (
        <div className="flex flex-col pl-16">
            <p className="font-bold text-4xl">
                Memberships
            </p>

            <div className="font-medium text-green-600 mt-[2rem] mb-[1rem] ml-[3rem] hover:underline cursor-pointer"
                onClick={handleOpenAdd}>
                Add New Membership
            </div>

            <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-[2rem] mr-[2rem]">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">User ID</th>
                                <th scope="col" className="px-6 py-3">Package ID</th>
                                <th scope="col" className="px-6 py-3">Type ID</th>
                                <th scope="col" className="px-6 py-3">Registration Date</th>
                                <th scope="col" className="px-6 py-3">Expiration Date</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {memberships.map((membership) => (
                                <tr key={membership.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4">{membership.user}</td>
                                    <td className="px-6 py-4">{membership.package}</td>
                                    <td className="px-6 py-4">{membership.type}</td>
                                    <td className="px-6 py-4">{membership.registrationTime}</td>
                                    <td className="px-6 py-4">{membership.expirationTime}</td>
                                    <td className="px-6 py-4 flex">
                                        <div className="pr-5 font-medium text-blue-600 hover:underline cursor-pointer"
                                            onClick={() => handleEdit(membership)}>
                                            Edit
                                        </div>
                                        <div className="font-medium text-red-500 hover:underline cursor-pointer"
                                            onClick={() => handleDelete(membership.id)}>
                                            Delete
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <EditMembershipDialog
                open={open}
                membership={selectedMembership}
                onClose={handleClose}
                onSave={handleSave}
            />
            <AddMembershipDialog
                open={openAdd}
                onClose={handleCloseAdd}
                onAdd={handleAdd}
            />
        </div>
    );
};

export default Member;