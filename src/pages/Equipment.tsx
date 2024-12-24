import { useState, useEffect } from "react";
import type { Equipment as EquipmentType } from "../config/types";
import { fetchEquipments, deleteEquipment } from "../config/api";
import EditEquipmentDialog from "../components/equipment/EditEquipmentDialog";
import AddEquipmentDialog from "../components/equipment/AddEquipmentDialog";
const Equipment: React.FC = () => {

  const [open, setOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentType | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const [equipments, setEquipments] = useState<EquipmentType[]>([]);

  const loadEquipments = async () => {
    try {
      const data = await fetchEquipments();
      setEquipments(data);
    } catch (error) {
      console.error("Error fetching equipments:", error);
    }
  };

  const handleEdit = (equipment: EquipmentType) => {
    setSelectedEquipment(equipment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (newEquipment: EquipmentType) => {
    setEquipments((prevEquipments) => [...prevEquipments, newEquipment]);
  };

  const handleSave = (updatedEquipment: EquipmentType) => {
    setEquipments((prevList) =>
      prevList.map((equipment) =>
        equipment.id === updatedEquipment.id ? updatedEquipment : equipment
      )
    );
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá thiết bị này không?")) {
      try {
        await deleteEquipment(id);
        setEquipments(equipments.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting equipment:", error);
      }
    }
  };

  useEffect(() => {
    loadEquipments();
  }, []);

  return (


    <div className="flex flex-col pl-16">
      <p className="font-bold text-4xl">
        Equipment Page
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
                <th scope="col" className="px-6 py-3">
                  Warranty Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Origin
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {equipments.map((equipment) => (
                <tr key={equipment.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >{equipment.name}</th>
                  <th className="px-6 py-4">{equipment.quantity}</th>
                  <th className="px-6 py-4">{equipment.warranty_date}</th>
                  <th className="px-6 py-4">{equipment.origin}</th>
                  <th className="px-6 py-4">{equipment.status}</th>
                  <th className="px-6 py-4 flex">
                    <div className="pr-5 font-medium text-blue-600 hover:underline cursor-pointer" onClick={() => handleEdit(equipment)}>
                      Edit
                    </div>
                    <div className="font-medium text-red-500 hover:underline cursor-pointer" onClick={() => handleDelete(equipment.id)}>
                      Delete
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
      <EditEquipmentDialog
        open={open}
        equipment={selectedEquipment}
        onClose={handleClose}
        onSave={handleSave}
      />
      <AddEquipmentDialog
        open={openAdd}
        onClose={handleCloseAdd}
        onAdd={handleAdd}
      />
    </div>
  )
}

export default Equipment;
