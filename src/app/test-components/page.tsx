// src/app/test-components/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  DateInput,
  FormField,
  Input,
  Select,
  type SelectOption,
} from "@/components/ui/form-components";
import {
  ChevronDownIcon,
  EllipsisHorizontalIcon,
  PlusIcon,
  MagnifyingGlassIcon as SearchIcon,
} from "@/components/ui/icons";
import { useState } from "react";

const sampleOptions: SelectOption[] = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

export default function TestComponentsPage() {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [dateValue, setDateValue] = useState("");

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Component Test Page
          </h1>
          <p className="text-muted-foreground">
            Testing the new aligned components
          </p>
        </div>

        {/* Color Test */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Theme Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-primary text-primary-foreground rounded-lg">
              Primary
            </div>
            <div className="p-4 bg-royal text-white rounded-lg">Royal</div>
            <div className="p-4 bg-spruce text-white rounded-lg">Spruce</div>
            <div className="p-4 bg-cardinal text-white rounded-lg">
              Cardinal
            </div>
            <div className="p-4 bg-pumpkin text-gray-900 rounded-lg">
              Pumpkin
            </div>
            <div className="p-4 bg-muted text-muted-foreground rounded-lg">
              Muted
            </div>
            <div className="p-4 bg-midnight text-white rounded-lg">
              Midnight
            </div>
            <div className="p-4 bg-cloudy text-gray-900 rounded-lg">Cloudy</div>
          </div>
        </div>

        {/* Button Test */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button color="primary">Primary</Button>
            <Button color="royal">Royal</Button>
            <Button color="cardinal">Cardinal</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="plain">Plain</Button>
            <Button loading>Loading</Button>
          </div>
        </div>

        {/* Form Components Test */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Form Components</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Text Input" required>
              <Input
                placeholder="Enter some text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </FormField>

            <FormField label="Select Dropdown">
              <Select
                options={sampleOptions}
                value={selectValue}
                onChange={(value) => setSelectValue(value)}
                placeholder="Choose an option"
              />
            </FormField>

            <FormField label="Date Input">
              <DateInput
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
              />
            </FormField>
          </div>
        </div>

        {/* Icons Test */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Icons</h2>
          <div className="flex gap-4 items-center">
            <EllipsisHorizontalIcon className="w-6 h-6" />
            <ChevronDownIcon className="w-6 h-6" />
            <PlusIcon className="w-6 h-6" />
            <SearchIcon className="w-6 h-6" />
          </div>
        </div>

        {/* State Display */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Current State</h2>
          <div className="bg-muted p-4 rounded-lg">
            <p>
              <strong>Input:</strong> {inputValue || "Empty"}
            </p>
            <p>
              <strong>Select:</strong> {selectValue || "None selected"}
            </p>
            <p>
              <strong>Date:</strong> {dateValue || "No date"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
