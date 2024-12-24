import { useState, useEffect } from "react";
import { Equipment } from "../../config/types";
import { updateEquipment } from "../../config/api";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";

interface EditDialogProps {
    open: boolean;
    equipment: Equipment | null;
    onClose: () => void;
    onSave: (equipment: Equipment) => void;
}

const EditEquipmentDialog: React.FC<EditDialogProps> = ({ open, equipment, onClose, onSave }) => {
    const [name, setName] = useState(equipment?.name || "");
    const [room, setRoom] = useState(equipment?.room || 0);
    const [quantity, setQuantity] = useState(equipment?.quantity || 0);
    const [importDate, setImportDate] = useState(equipment?.import_date || "");
    const [warrantyDate, setWarrantyDate] = useState(equipment?.warranty_date || "");
    const [origin, setOrigin] = useState(equipment?.origin || "");
    const [lastCheck, setLastCheck] = useState(equipment?.last_check || "");
    const [status, setStatus] = useState(equipment?.status || "");

    useEffect(() => {
        if (equipment) {
            setName(equipment.name);
            setRoom(equipment.room);
            setQuantity(equipment.quantity);
            setImportDate(equipment.import_date);
            setWarrantyDate(equipment.warranty_date);
            setOrigin(equipment.origin);
            setLastCheck(equipment.last_check);
            setStatus(equipment.status);
        }
    }, [equipment]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (equipment) {
            const updatedEquipment: Equipment = {
                ...equipment,
                name,
                room,
                quantity,
                import_date: importDate,
                warranty_date: warrantyDate,
                origin,
                last_check: lastCheck,
                status,
            };

            try {
                const result = await updateEquipment(equipment.id, updatedEquipment);
                onSave(result);
                onClose();
            } catch (error) {
                console.error("Error updating equipment:", error);
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Equipment</DialogTitle>
            <form onSubmit={handleSave}>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Room ID"
                        type="number"
                        value={room}
                        onChange={(e) => setRoom(Number(e.target.value))}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Import Date"
                        type="date"
                        value={importDate}
                        onChange={(e) => setImportDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Warranty Date"
                        type="date"
                        value={warrantyDate}
                        onChange={(e) => setWarrantyDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Origin"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Last Check"
                        type="date"
                        value={lastCheck}
                        onChange={(e) => setLastCheck(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditEquipmentDialog;