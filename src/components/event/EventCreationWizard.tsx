import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EventTypeSelector from "./EventTypeSelector";
import BasicDetailsForm from "./BasicDetailsForm";
import CustomizationPanel from "./CustomizationPanel";
import GuestManagement from "./GuestManagement";
import SocialFeatures from "./SocialFeatures";

interface EventCreationWizardProps {
  onComplete?: (eventData: any) => void;
  currentStep?: number;
  onStepChange?: (step: number) => void;
}

const EventCreationWizard = ({
  onComplete = () => {},
  currentStep = 1,
  onStepChange = () => {},
}: EventCreationWizardProps) => {
  const [step, setStep] = React.useState(currentStep);
  const [eventData, setEventData] = React.useState({
    type: "",
    basicDetails: {},
    customization: {},
    guests: [],
    social: {},
  });

  const steps = [
    { id: 1, title: "Event Type" },
    { id: 2, title: "Basic Details" },
    { id: 3, title: "Customization" },
    { id: 4, title: "Guest Management" },
    { id: 5, title: "Social Features" },
  ];

  const handleNext = () => {
    if (step < steps.length) {
      const nextStep = step + 1;
      setStep(nextStep);
      onStepChange(nextStep);
    } else {
      onComplete(eventData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="max-w-[1200px] mx-auto p-6 bg-white">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`flex-1 relative ${s.id !== steps.length ? "after:content-[''] after:h-1 after:w-full after:bg-gray-200 after:absolute after:top-1/2 after:left-1/2 after:-translate-y-1/2 after:z-0" : ""}`}
              >
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= s.id ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
                  >
                    {s.id}
                  </div>
                  <span
                    className={`mt-2 text-sm ${step >= s.id ? "text-primary" : "text-gray-500"}`}
                  >
                    {s.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {step === 1 && (
            <EventTypeSelector
              onSelect={(type) => {
                setEventData({ ...eventData, type });
                handleNext();
              }}
              selectedType={eventData.type}
            />
          )}
          {step === 2 && (
            <BasicDetailsForm
              onSubmit={(values) => {
                setEventData({ ...eventData, basicDetails: values });
                handleNext();
              }}
              defaultValues={eventData.basicDetails}
            />
          )}
          {step === 3 && (
            <CustomizationPanel
              onDateChange={(date) =>
                setEventData({
                  ...eventData,
                  customization: { ...eventData.customization, date },
                })
              }
            />
          )}
          {step === 4 && (
            <GuestManagement
              onInvite={(method, guests) =>
                setEventData({
                  ...eventData,
                  guests: [...eventData.guests, ...guests],
                })
              }
            />
          )}
          {step === 5 && (
            <SocialFeatures
              onShare={(platform) =>
                setEventData({
                  ...eventData,
                  social: { ...eventData.social, sharedOn: platform },
                })
              }
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          <Button onClick={handleNext}>
            {step === steps.length ? "Complete" : "Next"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EventCreationWizard;
