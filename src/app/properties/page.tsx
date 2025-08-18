"use client";

import DataGrid from "@/app/components/DataGrid";

export default function PropertiesPage() {
  const handleExport = () => {
    console.log("Export properties");
  };

  const handleAdd = () => {
    console.log("Add new property");
  };

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-[28px] font-semibold tracking-tight text-typography-midnight">
          Properties
        </h2>
        <p className="mt-1 text-sm text-typography-foggy">
          Manage all properties in your portfolio.
        </p>
      </div>

      {/* Main DataGrid Section */}
      <div className="bg-white rounded-lg border border-base-cloudy">
        <DataGrid
          title="Properties"
          subtitle="Manage all properties in your portfolio."
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
