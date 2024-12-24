import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";
import { TypePackage } from "../../config/types";
import { addTypePackage } from "../../config/api";

interface AddDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (typePackage: TypePackage) => void;
}

const AddTypePackageDialog: React.FC<AddDialogProps> = ({ open, onClose, onAdd }) => {
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [rate, setRate] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newPackage = {
                name,
                duration,
                rate
            };
            const result = await addTypePackage(newPackage);
            onAdd(result);
            onClose();
            resetForm();
        } catch (error) {
            console.error("Error adding type package:", error);
        }
    };

    const resetForm = () => {
        setName("");
        setDuration("");
        setRate(0);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Type Package</DialogTitle>
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
                        label="Duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Rate"
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        required
                        inputProps={{ min: 0, step: 0.1 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Add Type Package
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddTypePackageDialog;