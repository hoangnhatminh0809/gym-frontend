import { useState, useEffect } from "react";
import { Membership } from "../../config/types";
import { updateMembership } from "../../config/api";
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
    membership: Membership | null;
    onClose: () => void;
    onSave: (membership: Membership) => void;
}

const EditMembershipDialog: React.FC<EditDialogProps> = ({ 
    open, 
    membership, 
    onClose, 
    onSave 
}) => {
    const [user, setUser] = useState(membership?.user || 0);
    const [packageId, setPackageId] = useState(membership?.package || 0);
    const [type, setType] = useState(membership?.type || 0);
    const [registrationTime, setRegistrationTime] = useState(membership?.registrationTime || "");
    const [expirationTime, setExpirationTime] = useState(membership?.expirationTime || "");

    useEffect(() => {
        if (membership) {
            setUser(membership.user);
            setPackageId(membership.package);
            setType(membership.type);
            setRegistrationTime(membership.registrationTime);
            setExpirationTime(membership.expirationTime);
        }
    }, [membership]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (membership) {
            const updatedMembership: Membership = {
                ...membership,
                user,
                package: packageId,
                type,
                registrationTime,
                expirationTime,
            };

            try {
                const result = await updateMembership(membership.id, updatedMembership);
                onSave(result);
                onClose();
            } catch (error) {
                console.error("Error updating membership:", error);
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Membership</DialogTitle>
            <form onSubmit={handleSave}>
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
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditMembershipDialog;