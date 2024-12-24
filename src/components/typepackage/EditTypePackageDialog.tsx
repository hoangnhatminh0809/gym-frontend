import { useState, useEffect } from "react";
import { TypePackage } from "../../config/types";
import { updateTypePackage } from "../../config/api";
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
    typePackage: TypePackage | null;
    onClose: () => void;
    onSave: (typePackage: TypePackage) => void;
}

const EditTypePackageDialog: React.FC<EditDialogProps> = ({ 
    open, 
    typePackage, 
    onClose, 
    onSave 
}) => {
    const [name, setName] = useState(typePackage?.name || "");
    const [duration, setDuration] = useState(typePackage?.duration || "");
    const [rate, setRate] = useState(typePackage?.rate || 0);

    useEffect(() => {
        if (typePackage) {
            setName(typePackage.name);
            setDuration(typePackage.duration);
            setRate(typePackage.rate);
        }
    }, [typePackage]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (typePackage) {
            const updatedPackage: TypePackage = {
                ...typePackage,
                name,
                duration,
                rate,
            };

            try {
                const result = await updateTypePackage(typePackage.id, updatedPackage);
                onSave(result);
                onClose();
            } catch (error) {
                console.error("Error updating type package:", error);
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Type Package</DialogTitle>
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
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditTypePackageDialog;