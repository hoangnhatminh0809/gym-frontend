import { useState, useEffect } from "react";
import { TrainingPackage } from "../../config/types";
import { updateTrainingPackage } from "../../config/api";
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
    trainingPackage: TrainingPackage | null;
    onClose: () => void;
    onSave: (trainingPackage: TrainingPackage) => void;
}

const EditTrainingPackageDialog: React.FC<EditDialogProps> = ({ 
    open, 
    trainingPackage, 
    onClose, 
    onSave 
}) => {
    const [name, setName] = useState(trainingPackage?.name || "");
    const [description, setDescription] = useState(trainingPackage?.description || "");
    const [price, setPrice] = useState(trainingPackage?.price || 0);

    useEffect(() => {
        if (trainingPackage) {
            setName(trainingPackage.name);
            setDescription(trainingPackage.description);
            setPrice(trainingPackage.price);
        }
    }, [trainingPackage]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (trainingPackage) {
            const updatedPackage: TrainingPackage = {
                ...trainingPackage,
                name,
                description,
                price,
            };

            try {
                const result = await updateTrainingPackage(trainingPackage.id, updatedPackage);
                onSave(result);
                onClose();
            } catch (error) {
                console.error("Error updating training package:", error);
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Training Package</DialogTitle>
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
                        label="Price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                        inputProps={{ min: 0 }}
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

export default EditTrainingPackageDialog;