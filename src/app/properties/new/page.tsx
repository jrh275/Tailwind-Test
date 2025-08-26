// src/app/properties/new/page.tsx
"use client";

import PropertyForm from "@/components/properties/property-form";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    console.log("Creating new property:", data);
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // await createProperty(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success - redirect back to properties list
      router.push("/properties");
    } catch (error) {
      console.error("Error creating property:", error);
      // Handle error (show toast, etc.)
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="px-6 pt-0 pb-6 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm text-typography-foggy hover:text-typography-midnight transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Properties
      </button>

      {/* Page Header */}
      <div>
        <h2 className="text-[28px] font-semibold tracking-tight text-typography-midnight">
          Add New Property
        </h2>
        <p className="mt-1 text-sm text-typography-foggy">
          Enter the details for your new property.
        </p>
      </div>

      {/* Property Form */}
      <div className="bg-white">
        <PropertyForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </div>
  );
}
