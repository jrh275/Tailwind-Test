"use client";

import DataGrid from "@/app/components/DataGrid";

export default function PropertiesPage() {
  const handleExport = () => console.log("Export properties");
  const handleAdd = () => console.log("Add new property");

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
