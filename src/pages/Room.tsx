import React from 'react'
import { useState, useEffect } from 'react';
import { Room as RoomType } from '../config/types';
import AddRoomDialog from '../components/room/AddRoomDialog';
import { deleteRoom, fetchRooms } from '../config/api';

const Room: React.FC = () => {

    const [open, setOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
    const [openAdd, setOpenAdd] = useState(false);
    const handleOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };
    const [rooms, setRooms] = useState<RoomType[]>([]);

    const loadRooms = async () => {
        try {
            const data = await fetchRooms();
            setRooms(data);
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = (newRoom: RoomType) => {
        setRooms((prevRooms) => [...prevRooms, newRoom]);
    };

    const handleSave = (updatedRoom: RoomType) => {
        setRooms((prevList) =>
            prevList.map((room) =>
                room.id === updatedRoom.id ? updatedRoom : room
            )
        );
    };

    useEffect(() => {
        loadRooms();
    }, []);

    // const handleEdit = (equipment: EquipmentType) => {
    //     setSelectedEquipment(equipment);
    //     setOpen(true);
    //   };

    // useEffect(() => {
    //     loadRooms();
    // }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá phòng tập này không?")) {
            try {
                await deleteRoom(id);
                setRooms(rooms.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Error deleting room:", error);
            }
        }
    };

    return (


        <div className="flex flex-col pl-16">
            <p className="font-bold text-4xl">
                Room Page
            </p>

            <div className="font-medium text-green-600 mt-[2rem] mb-[1rem] ml-[3rem] hover:underline cursor-pointer" onClick={handleOpenAdd}>Add</div>

            <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-[2rem] mr-[2rem]">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room) => (
                                <tr key={room.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >{room.name}</th>
                                    {/* <th className="px-6 py-4">{room.quantity}</th>
                                        <th className="px-6 py-4">{room.warranty_date}</th>
                                        <th className="px-6 py-4">{room.origin}</th>
                                        <th className="px-6 py-4">{room.status}</th> */}
                                    <th className="px-6 py-4 flex">
                                        {/* <div className="pr-5 font-medium text-blue-600 hover:underline cursor-pointer" onClick={() => handleEdit(room)}>
                                            Edit
                                        </div> */}
                                        <div className="font-medium text-red-500 hover:underline cursor-pointer" onClick={() => handleDelete(room.id)}>
                                            Delete
                                        </div>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
            <AddRoomDialog
                open={openAdd}
                onClose={handleCloseAdd}
                onAdd={handleAdd}
            />
        </div>
    )
}


export default Room
