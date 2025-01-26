import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Guest } from "./GuestImport";

interface AddGuestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (guest: Guest) => void;
}

export default function AddGuestDialog({
  open,
  onOpenChange,
  onAdd,
}: AddGuestDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    // Validate
    if (!name) {
      setError("Name is required");
      return;
    }
    if (!email && !phone) {
      setError("Either email or phone is required");
      return;
    }

    // Add guest
    onAdd({ name, email, phone });

    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Guest</DialogTitle>
          <DialogDescription>
            Add a new guest to your event. Name and at least one contact method
            is required.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              placeholder="Enter guest name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter guest email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter guest phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Guest</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
