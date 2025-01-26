import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MapPin,
  Calendar as CalendarIcon,
  Upload,
  UserPlus,
  X,
  Search,
} from "lucide-react";

interface CoOrganizer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

interface CustomizationPanelProps {
  selectedDate?: Date;
  startTime?: string;
  endTime?: string;
  maxCapacity?: number;
  rsvpDeadline?: Date;
  categories?: string[];
  tags?: string[];
  onDateChange?: (date: Date) => void;
  location?: string;
  onLocationChange?: (location: string) => void;
  bannerImage?: string;
  onBannerUpload?: (file: File) => void;
  coOrganizers?: CoOrganizer[];
  onAddCoOrganizer?: (organizer: CoOrganizer) => void;
  onRemoveCoOrganizer?: (organizerId: string) => void;
}

const CustomizationPanel = ({
  selectedDate = new Date(),
  startTime = "19:00",
  endTime = "23:00",
  maxCapacity = 100,
  rsvpDeadline = new Date(),
  categories = [],
  tags = [],
  onDateChange = () => {},
  location = "",
  onLocationChange = () => {},
  bannerImage = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  onBannerUpload = () => {},
  coOrganizers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1987654321",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
  ],
  onAddCoOrganizer = () => {},
  onRemoveCoOrganizer = () => {},
}: CustomizationPanelProps) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Date/Time Selection */}
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-semibold">Date & Time</h3>
            </div>
            <div className="flex gap-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && onDateChange(date)}
                className="rounded-md border"
              />
              <div className="space-y-6 flex-1">
                <div className="space-y-4">
                  <Label>Event Time</Label>
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        value={startTime}
                        onChange={(e) => console.log(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Input
                        type="time"
                        value={endTime}
                        onChange={(e) => console.log(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Location Input with Google Maps */}
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-semibold">Location</h3>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search for a location"
                  value={location}
                  onChange={(e) => onLocationChange(e.target.value)}
                />
                <Button variant="outline" className="flex gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
              <div className="h-[200px] bg-gray-100 rounded-md">
                {/* Google Maps would be embedded here */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Google Maps Preview
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Rest of the component remains the same */}
      {/* Event Details Card */}
      <Card className="p-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Event Details</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Maximum Capacity</Label>
              <Input
                type="number"
                value={maxCapacity}
                onChange={(e) => console.log(e.target.value)}
                min={1}
              />
            </div>
            <div className="space-y-2">
              <Label>RSVP Deadline</Label>
              <Input
                type="date"
                value={format(rsvpDeadline, "yyyy-MM-dd")}
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Event Category</Label>
            <Select defaultValue="social">
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="social">Social Gathering</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <Input
              placeholder="Enter tags separated by commas"
              defaultValue={tags.join(", ")}
              onChange={(e) =>
                console.log(e.target.value.split(",").map((tag) => tag.trim()))
              }
            />
          </div>
        </div>
      </Card>

      {/* Banner Image Upload */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-semibold">Banner Image</h3>
          </div>
          <div className="relative">
            <img
              src={bannerImage}
              alt="Event banner"
              className="w-full h-48 object-cover rounded-lg"
            />
            <Button
              variant="secondary"
              className="absolute bottom-4 right-4"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) onBannerUpload(file);
                };
                input.click();
              }}
            >
              Change Banner
            </Button>
          </div>
        </div>
      </Card>

      {/* Co-organizer Management */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-semibold">Co-organizers</h3>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" disabled={coOrganizers.length >= 5}>
                  Add Co-organizer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Co-organizer</DialogTitle>
                  <DialogDescription>
                    Enter the details of the co-organizer
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      const newOrganizer = {
                        id: Math.random().toString(),
                        name: (
                          document.getElementById("name") as HTMLInputElement
                        ).value,
                        email: (
                          document.getElementById("email") as HTMLInputElement
                        ).value,
                        phone: (
                          document.getElementById("phone") as HTMLInputElement
                        ).value,
                        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
                      };
                      onAddCoOrganizer(newOrganizer);
                    }}
                  >
                    Add Co-organizer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-wrap gap-4">
            {coOrganizers.map((organizer) => (
              <div
                key={organizer.id}
                className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2"
              >
                <Avatar>
                  <img src={organizer.avatar} alt={organizer.name} />
                </Avatar>
                <span>{organizer.name}</span>
                <button
                  onClick={() => onRemoveCoOrganizer(organizer.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CustomizationPanel;
