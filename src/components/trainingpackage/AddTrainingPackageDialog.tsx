import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";
import { TrainingPackage } from "../../config/types";
import { addTrainingPackage } from "../../config/api";

interface AddDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (trainingPackage: TrainingPackage) => void;
}

const AddTrainingPackageDialog: React.FC<AddDialogProps> = ({ open, onClose, onAdd }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(0);
    const [price, setPrice] = useState(0);
    const [pt_sessions, setPtSessions] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newPackage = {
                name,
                description,
                price,
            };
            const result = await addTrainingPackage(newPackage);
            onAdd(result);
            onClose();
            resetForm();
        } catch (error) {
            console.error("Error adding training package:", error);
        }
    };

    const resetForm = () => {
        setName("");
        setDescription("");
        setDuration(0);
        setPrice(0);
        setPtSessions(0);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Training Package</DialogTitle>
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
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                        rows={4}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Duration (months)"
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        required
                        inputProps={{ min: 1 }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                        inputProps={{ min: 0 }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="PT Sessions"
                        type="number"
                        value={pt_sessions}
                        onChange={(e) => setPtSessions(Number(e.target.value))}
                        required
                        inputProps={{ min: 0 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Add Package
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddTrainingPackageDialog;