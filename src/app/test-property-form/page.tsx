"use client";

import PropertyForm from "@/components/properties/property-form";
import { useState } from "react";

export default function TestPropertyFormPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    console.log("Form submitted:", data);
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    alert("Property saved successfully!");
  };

  const handleCancel = () => {
    console.log("Form cancelled");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Property Form Test
          </h1>
          <p className="text-muted-foreground">
            Testing the complete PropertyForm component with validation, loading
            states, and form handling.
          </p>
        </div>

        <PropertyForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Test Instructions:
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Fill out the form to test validation</li>
            <li>• Submit with missing required fields to see error states</li>
            <li>
              • Submit a complete form to see loading state (2 second delay)
            </li>
            <li>• Check the browser console for submitted form data</li>
            <li>• Test the Cancel button</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
