import React from "react";
import EventCreationWizard from "./event/EventCreationWizard";
import Header from "./layout/Header";
import Hero from "./landing/Hero";
import AuthDialog from "./auth/AuthDialog";
import EventConfirmationDialog from "./event/EventConfirmationDialog";

const Home = () => {
  const [showAuth, setShowAuth] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const handleStepChange = (step: number) => {
    if (step === 4 && !isAuthenticated) {
      setShowAuth(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <Hero />

      {/* Event Creation Section */}
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center">Create Your Event</h2>
          <p className="text-center text-muted-foreground mt-2">
            Follow the steps below to set up your perfect event
          </p>
        </div>

        <EventCreationWizard
          onComplete={(eventData) => {
            console.log("Event creation completed:", eventData);
          }}
          onStepChange={handleStepChange}
        />
      </div>

      {/* Auth Dialog */}
      <AuthDialog
        open={showAuth}
        onOpenChange={setShowAuth}
        onComplete={() => {
          setIsAuthenticated(true);
          setShowAuth(false);
        }}
      />

      {/* Event Confirmation Dialog */}
      <EventConfirmationDialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        eventDetails={{
          title: "Sample Event",
          date: new Date(),
          time: "7:00 PM",
          location: "123 Main St",
        }}
        onConfirm={(message) => {
          console.log("Confirmed with message:", message);
          setShowConfirmation(false);
        }}
        onMaybe={(message) => {
          console.log("Maybe with message:", message);
          setShowConfirmation(false);
        }}
        onDecline={(message) => {
          console.log("Declined with message:", message);
          setShowConfirmation(false);
        }}
      />
    </div>
  );
};

export default Home;
