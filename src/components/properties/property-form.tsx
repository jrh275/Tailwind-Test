// src/components/properties/property-form.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  DateInput,
  FormField,
  Input,
  Select,
  Textarea,
  type SelectOption,
} from "@/components/ui/form-components";
import {
  BuildingOfficeIcon,
  DocumentIcon,
  MapPinIcon,
} from "@/components/ui/icons";
import React, { useState } from "react";

interface PropertyFormData {
  name: string;
  type: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  yearBuilt: string;
  description: string;
  purchaseDate: string;
  purchasePrice: string;
}

interface PropertyFormProps {
  initialData?: Partial<PropertyFormData>;
  onSubmit: (data: PropertyFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
}

const propertyTypeOptions: SelectOption[] = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "land", label: "Land" },
  { value: "mixed-use", label: "Mixed Use" },
];

const stateOptions: SelectOption[] = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  // Add more states as needed
];

export default function PropertyForm({
  initialData = {},
  onSubmit,
  onCancel,
  loading = false,
}: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyFormData>({
    name: initialData.name || "",
    type: initialData.type || "",
    streetAddress: initialData.streetAddress || "",
    city: initialData.city || "",
    state: initialData.state || "",
    zipCode: initialData.zipCode || "",
    yearBuilt: initialData.yearBuilt || "",
    description: initialData.description || "",
    purchaseDate: initialData.purchaseDate || "",
    purchasePrice: initialData.purchasePrice || "",
  });

  const [errors, setErrors] = useState<Partial<PropertyFormData>>({});

  const updateField = (field: keyof PropertyFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PropertyFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Property name is required";
    }

    if (!formData.type) {
      newErrors.type = "Property type is required";
    }

    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = "Street address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state) {
      newErrors.state = "State is required";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Invalid ZIP code format";
    }

    if (formData.yearBuilt && !/^\d{4}$/.test(formData.yearBuilt)) {
      newErrors.yearBuilt = "Year must be a 4-digit number";
    }

    if (
      formData.purchasePrice &&
      !/^\d+(\.\d{2})?$/.test(formData.purchasePrice)
    ) {
      newErrors.purchasePrice = "Invalid price format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      // Reset form if no cancel handler provided
      setFormData({
        name: "",
        type: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        yearBuilt: "",
        description: "",
        purchaseDate: "",
        purchasePrice: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-royal/10 rounded-lg">
            <BuildingOfficeIcon className="w-5 h-5 text-royal" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {initialData.name ? "Edit Property" : "Add New Property"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {initialData.name
                ? "Update property information"
                : "Enter property details and information"}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <BuildingOfficeIcon className="w-4 h-4" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                label="Property Name"
                error={errors.name}
                hint="A descriptive name for the property"
              >
                <Input
                  id="name"
                  placeholder="e.g., Downtown Office Building"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  error={!!errors.name}
                />
              </FormField>

              <FormField
                label="Property Type"
                error={errors.type}
                hint="Select the property category"
              >
                <Select
                  id="type"
                  value={formData.type}
                  options={propertyTypeOptions}
                  onChange={(e) => updateField("type", e.target.value)}
                  placeholder="Select property type"
                />
              </FormField>
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <MapPinIcon className="w-4 h-4" />
              Location
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <FormField
                label="Street Address"
                error={errors.streetAddress}
                hint="Full street address including number"
              >
                <Input
                  id="streetAddress"
                  placeholder="e.g., 123 Main Street"
                  value={formData.streetAddress}
                  onChange={(e) => updateField("streetAddress", e.target.value)}
                  error={!!errors.streetAddress}
                />
              </FormField>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label="City" error={errors.city} hint="City name">
                  <Input
                    id="city"
                    placeholder="e.g., Portland"
                    value={formData.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    error={!!errors.city}
                  />
                </FormField>

                <FormField
                  label="State"
                  error={errors.state}
                  hint="Select state"
                >
                  <Select
                    id="state"
                    value={formData.state}
                    options={stateOptions}
                    onChange={(e) => updateField("state", e.target.value)}
                    placeholder="Select state"
                  />
                </FormField>

                <FormField
                  label="ZIP Code"
                  error={errors.zipCode}
                  hint="5 or 9-digit ZIP code"
                >
                  <Input
                    id="zipCode"
                    placeholder="e.g., 97201"
                    value={formData.zipCode}
                    onChange={(e) => updateField("zipCode", e.target.value)}
                    error={!!errors.zipCode}
                  />
                </FormField>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <DocumentIcon className="w-4 h-4" />
              Property Details
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FormField
                label="Year Built"
                error={errors.yearBuilt}
                hint="4-digit year"
              >
                <Input
                  id="yearBuilt"
                  type="number"
                  placeholder="e.g., 1985"
                  value={formData.yearBuilt}
                  onChange={(e) => updateField("yearBuilt", e.target.value)}
                  error={!!errors.yearBuilt}
                />
              </FormField>

              <FormField
                label="Purchase Date"
                hint="When the property was acquired"
              >
                <DateInput
                  id="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={(e) => updateField("purchaseDate", e.target.value)}
                />
              </FormField>

              <FormField
                label="Purchase Price"
                error={errors.purchasePrice}
                hint="Original purchase amount"
              >
                <Input
                  id="purchasePrice"
                  type="number"
                  placeholder="e.g., 750000"
                  value={formData.purchasePrice}
                  onChange={(e) => updateField("purchasePrice", e.target.value)}
                  error={!!errors.purchasePrice}
                />
              </FormField>
            </div>
          </div>

          {/* Description */}
          <FormField
            label="Description"
            hint="Additional details about the property"
          >
            <Textarea
              id="description"
              rows={4}
              placeholder="Enter any additional details about the property..."
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </FormField>
        </div>

        {/* Form Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {initialData.name ? "Update Property" : "Create Property"}
          </Button>
        </div>
      </form>
    </div>
  );
}
