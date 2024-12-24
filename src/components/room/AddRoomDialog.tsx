import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";
import { Room } from "../../config/types";
import { addRoom } from "../../config/api";

interface AddDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (room: Room) => void;
}

const AddRoomDialog: React.FC<AddDialogProps> = ({ open, onClose, onAdd }) => {
    const [name, setName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newRoom = {
                name,
            };
            const result = await addRoom(newRoom);
            onAdd(result);
            onClose();
            resetForm();
        } catch (error) {
            console.error("Error adding Room:", error);
        }
    };

    const resetForm = () => {
        setName("");
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Room</DialogTitle>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Add Room
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddRoomDialog;