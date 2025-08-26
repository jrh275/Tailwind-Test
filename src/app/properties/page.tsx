// src/app/properties/page.tsx
"use client";

import DataGrid from "@/app/components/DataGrid";
import { useRouter } from "next/navigation";

export default function PropertiesPage() {
  const router = useRouter();

  const handleExport = () => {
    console.log("Export properties");
    // TODO: Add export functionality
    // You could generate CSV, PDF, or call an API
  };

  const handleAdd = () => {
    console.log("Add new property");
    // Navigate to the new property form
    router.push("/properties/new");
  };

  return (
    <div className="px-6 pt-0 pb-6 space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-[28px] font-semibold tracking-tight text-typography-midnight">
          Properties
        </h2>
        <p className="mt-1 text-sm text-typography-foggy">
          Manage all properties in your portfolio.
        </p>
      </div>

      {/* Borderless container */}
      <div className="bg-white">
        <DataGrid
          actions={[
            { label: "EXPORT", onClick: handleExport },
            { label: "ADD", onClick: handleAdd, primary: true },
          ]}
          searchPlaceholder="Search Properties by name or address."
          searchFields={["name", "address.lineOne"]}
        />
      </div>
    </div>
  );
}
