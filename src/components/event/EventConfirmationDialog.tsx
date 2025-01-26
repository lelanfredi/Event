import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Clock, MapPin } from "lucide-react";

interface EventConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventDetails: {
    title: string;
    date: Date;
    time: string;
    location: string;
  };
  onConfirm: (message?: string) => void;
  onMaybe: (message?: string) => void;
  onDecline: (message?: string) => void;
}

export default function EventConfirmationDialog({
  open,
  onOpenChange,
  eventDetails,
  onConfirm,
  onMaybe,
  onDecline,
}: EventConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{eventDetails.title}</DialogTitle>
          <DialogDescription>
            <div className="space-y-2 mt-2">
              <div className="flex items-center gap-2 text-sm">
                <CalendarDays className="h-4 w-4" />
                {eventDetails.date.toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                {eventDetails.time}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                {eventDetails.location}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Textarea
            placeholder="Add a message to the organizer (optional)"
            className="min-h-[100px]"
          />
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button className="w-full" onClick={() => onConfirm()}>
            Yes, I'll be there!
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onMaybe()}
          >
            Maybe
          </Button>
          <Button
            variant="ghost"
            className="w-full text-destructive hover:text-destructive"
            onClick={() => onDecline()}
          >
            Can't make it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
