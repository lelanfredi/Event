import React, { useState } from "react";
import { Button } from "../ui/button";
import GuestImport from "./GuestImport";
import { Guest } from "./GuestImport";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import {
  Mail,
  Share2,
  MessageSquare,
  Copy,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface GuestManagementProps {
  guests?: Array<Guest & {
    id: string;
    rsvp: "pending" | "accepted" | "declined";
    dietary?: string;
  }>;
  onInvite?: (method: string, guests: Guest[], message?: string) => void;
  onRsvpUpdate?: (guestId: string, status: "accepted" | "declined") => void;
}

const GuestManagement = ({
  guests = [],
  onInvite = () => {},
  onRsvpUpdate = () => {},
}: GuestManagementProps) => {
  const [guestList, setGuestList] = useState([
    { id: "1", name: "John Doe", email: "john@example.com", rsvp: "pending" },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      rsvp: "accepted",
      dietary: "Vegetarian",
    },
    { id: "3", name: "Bob Wilson", email: "bob@example.com", rsvp: "declined" },
  ]);
  onInvite = () => {},
  onRsvpUpdate = () => {},
}: GuestManagementProps) => {
  const [inviteLink, setInviteLink] = React.useState(
    "https://event.com/invite/abc123",
  );
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Guest Management</h2>

      <Tabs defaultValue="add" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="add">Add Guests</TabsTrigger>
          <TabsTrigger value="invite">Send Invites</TabsTrigger>
          <TabsTrigger value="manage">Manage Guests</TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <Card className="p-6">
            <GuestImport
              onImport={(importedGuests) => {
                const newGuests = importedGuests.map(guest => ({
                  ...guest,
                  id: Math.random().toString(),
                  rsvp: "pending" as const
                }));
                setGuestList(prev => [...prev, ...newGuests]);
              }}
            />
          </Card>
        </TabsContent>

        <TabsContent value="invite">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Invite Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => onInvite("email", [])}
                    className="flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email Invites
                  </Button>
                  <Button
                    onClick={() => onInvite("whatsapp", [])}
                    className="flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp Invites
                  </Button>
                  <Button
                    onClick={() => onInvite("share", [])}
                    className="flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Link
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Invitation Message</h3>
                <Select defaultValue="formal">
                  <SelectTrigger>
                    <SelectValue placeholder="Select message style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="fun">Fun & Playful</SelectItem>
                  </SelectContent>
                </Select>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Message Template</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Sparkles className="w-4 h-4" />
                      Get Suggestions
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Write your invitation message..."
                    className="min-h-[100px]"
                    defaultValue="You're invited! Join us for a special event. We would be delighted to have you there."
                  />
                </div>

                <RadioGroup defaultValue="template1" className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="template1" id="template1" />
                    <Label htmlFor="template1">
                      Formal: "We cordially invite you to join us..."
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="template2" id="template2" />
                    <Label htmlFor="template2">
                      Casual: "Hey! We're having a party..."
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="template3" id="template3" />
                    <Label htmlFor="template3">
                      Fun: "Get ready for an amazing celebration..."
                    </Label>
                  </div>
                </RadioGroup>

                <div className="pt-4">
                  <h3 className="text-lg font-semibold">Shareable Link</h3>
                  <div className="flex gap-2 mt-2">
                    <Input value={inviteLink} readOnly className="flex-1" />
                    <Button onClick={copyToClipboard}>
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Automated Reminders</h3>
                  <Switch />
                </div>
                <p className="text-sm text-gray-500">
                  Send automatic reminders to guests who haven't responded
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <Card className="p-6">
            <ScrollArea className="h-[400px] w-full pr-4">
              <div className="space-y-4">
                {guestList.map((guest) => (
                  <div
                    key={guest.id}
                    className="p-4 border rounded-lg flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold">{guest.name}</p>
                      <p className="text-sm text-gray-500">{guest.email}</p>
                      {guest.dietary && (
                        <Badge variant="secondary" className="mt-1">
                          {guest.dietary}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={
                          guest.rsvp === "accepted" ? "default" : "outline"
                        }
                        onClick={() => onRsvpUpdate(guest.id, "accepted")}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={
                          guest.rsvp === "declined" ? "destructive" : "outline"
                        }
                        onClick={() => onRsvpUpdate(guest.id, "declined")}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-6">
              <Label htmlFor="dietary">Dietary Restrictions Note</Label>
              <Textarea
                id="dietary"
                placeholder="Add any general notes about dietary accommodations..."
                className="mt-2"
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuestManagement;
