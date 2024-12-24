import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";
import { Membership } from "../../config/types";
import { addMembership } from "../../config/api";

interface AddDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (membership: Membership) => void;
}

const AddMembershipDialog: React.FC<AddDialogProps> = ({ open, onClose, onAdd }) => {
    const [user, setUser] = useState(0);
    const [packageId, setPackageId] = useState(0);
    const [type, setType] = useState(0);
    const [registrationTime, setRegistrationTime] = useState("");
    const [expirationTime, setExpirationTime] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newMembership = {
                user,
                package: packageId,
                type,
                registrationTime,
                expirationTime,
            };
            const result = await addMembership(newMembership);
            onAdd(result);
            onClose();
            resetForm();
        } catch (error) {
            console.error("Error adding membership:", error);
        }
    };

    const resetForm = () => {
        setUser(0);
        setPackageId(0);
        setType(0);
        setRegistrationTime("");
        setExpirationTime("");
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Membership</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="User ID"
                        type="number"
                        value={user}
                        onChange={(e) => setUser(Number(e.target.value))}
                        required
                        inputProps={{ min: 1 }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Package ID"
                        type="number"
                        value={packageId}
                        onChange={(e) => setPackageId(Number(e.target.value))}
                        required
                        inputProps={{ min: 1 }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Type ID"
                        type="number"
                        value={type}
                        onChange={(e) => setType(Number(e.target.value))}
                        required
                        inputProps={{ min: 1 }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Registration Time"
                        type="date"
                        value={registrationTime}
                        onChange={(e) => setRegistrationTime(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Expiration Time"
                        type="date"
                        value={expirationTime}
                        onChange={(e) => setExpirationTime(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Add Membership
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddMembershipDialog;