import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";
import { Equipment } from "../../config/types";
import { addEquipment } from "../../config/api";

interface AddDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (equipment: Equipment) => void;
}

const AddEquipmentDialog: React.FC<AddDialogProps> = ({ open, onClose, onAdd }) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [importDate, setImportDate] = useState("");
    const [warrantyDate, setWarrantyDate] = useState("");
    const [origin, setOrigin] = useState("");
    const [lastCheck, setLastCheck] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newEquipment = {
                name,
                room,
                quantity,
                import_date: importDate,
                warranty_date: warrantyDate,
                origin,
                last_check: lastCheck,
                status,
            };
            const result = await addEquipment(newEquipment);
            onAdd(result);
            onClose();
            resetForm();
        } catch (error) {
            console.error("Error adding equipment:", error);
        }
    };

    const resetForm = () => {
        setName("");
        setRoom(0);
        setQuantity(1);
        setImportDate("");
        setWarrantyDate("");
        setOrigin("");
        setLastCheck("");
        setStatus("");
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Equipment</DialogTitle>
            <form onSubmit={handleSubmit}>
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
                        inputProps={{ min: 1 }}
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
                        Add Equipment
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddEquipmentDialog;