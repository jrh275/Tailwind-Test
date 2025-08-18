"use client";

import Autocomplete from "@/app/components/ui/Autocomplete"; // Adjust path as needed
import TextField from "@/app/components/ui/TextField"; // Adjust path as needed

const propertyOptions = [
  { label: "Sunset Apartments", value: 1 },
  { label: "Downtown Loft Complex", value: 2 },
  { label: "Riverside Townhomes", value: 3 },
  { label: "Oak Street Condos", value: 4 },
  { label: "Pine View Estates", value: 5 },
];

const tenantOptions = [
  { label: "John Doe", value: "john.doe@email.com" },
  { label: "Jane Smith", value: "jane.smith@email.com" },
  { label: "Bob Johnson", value: "bob.johnson@email.com" },
  { label: "Alice Brown", value: "alice.brown@email.com" },
  { label: "Charlie Wilson", value: "charlie.wilson@email.com" },
];

export default function LeasesPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Leases</h2>
      <p className="text-base-foggy mt-2">Content coming soon.</p>

      {/* TextField Testing Section */}
      <div className="mt-8 p-6 bg-white rounded-lg border">
        <h2 className="text-lg font-medium mb-4">
          TextField Component Testing
        </h2>

        <div className="space-y-6 max-w-md">
          {/* Basic text field */}
          <TextField
            label="Property Name"
            placeholder="Enter property name"
            fullWidth
          />

          {/* Text field with value */}
          <TextField
            label="Tenant Email"
            defaultValue="john.doe@example.com"
            fullWidth
          />

          {/* Error state */}
          <TextField
            label="Monthly Rent"
            error
            helperText="Please enter a valid amount"
            fullWidth
          />

          {/* Small size */}
          <TextField label="Lease Term (months)" size="small" fullWidth />

          {/* Multiline */}
          <TextField
            label="Notes"
            multiline
            rows={3}
            placeholder="Enter any additional notes..."
            fullWidth
          />

          {/* Disabled state */}
          <TextField
            label="Property ID"
            defaultValue="PROP-12345"
            disabled
            fullWidth
          />
        </div>
      </div>

      {/* Autocomplete Testing Section */}
      <div className="mt-8 p-6 bg-white rounded-lg border">
        <h2 className="text-lg font-medium mb-4">
          Autocomplete Component Testing
        </h2>

        <div className="space-y-6 max-w-md">
          {/* Single select autocomplete */}
          <Autocomplete
            label="Select Property"
            placeholder="Choose a property..."
            options={propertyOptions}
            onChange={(value) => console.log("Property selected:", value)}
            fullWidth
          />

          {/* Multiple select autocomplete */}
          <Autocomplete
            label="Select Tenants"
            placeholder="Choose tenants..."
            options={tenantOptions}
            multiple
            onChange={(value) => console.log("Tenants selected:", value)}
            fullWidth
          />

          {/* Error state */}
          <Autocomplete
            label="Property Type"
            placeholder="Select type..."
            options={[
              { label: "Apartment", value: "apartment" },
              { label: "House", value: "house" },
              { label: "Condo", value: "condo" },
            ]}
            error
            helperText="Please select a property type"
            fullWidth
          />

          {/* Disabled state */}
          <Autocomplete
            label="Status"
            placeholder="Status..."
            options={[
              { label: "Active", value: "active" },
              { label: "Pending", value: "pending" },
            ]}
            value={{ label: "Active", value: "active" }}
            disabled
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}
