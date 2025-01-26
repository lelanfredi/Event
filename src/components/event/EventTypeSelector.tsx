import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Cake, Building2, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";

interface EventType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface EventTypeSelectorProps {
  onSelect?: (eventType: string) => void;
  selectedType?: string;
}

const eventTypes: EventType[] = [
  {
    id: "birthday",
    title: "Birthday Party",
    description: "Perfect for celebrating special days with friends and family",
    icon: <Cake className="h-8 w-8" />,
  },
  {
    id: "corporate",
    title: "Corporate Event",
    description: "Professional events for business and networking",
    icon: <Building2 className="h-8 w-8" />,
  },
  {
    id: "theme",
    title: "Theme Party",
    description: "Themed celebrations for any occasion",
    icon: <PartyPopper className="h-8 w-8" />,
  },
];

const EventTypeSelector = ({
  onSelect = () => {},
  selectedType = "",
}: EventTypeSelectorProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Select Event Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {eventTypes.map((type) => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`cursor-pointer p-6 h-full ${selectedType === type.id ? "border-primary border-2" : ""}`}
              onClick={() => onSelect(type.id)}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  {type.icon}
                </div>
                <h3 className="text-xl font-medium">{type.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {type.description}
                </p>
                <Button
                  variant={selectedType === type.id ? "default" : "outline"}
                  className="mt-4"
                >
                  {selectedType === type.id ? "Selected" : "Select"}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventTypeSelector;
