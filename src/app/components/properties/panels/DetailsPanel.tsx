// src/app/components/properties/panels/DetailsPanel.tsx
import { Button } from "@/components/ui/button"; // ← added
import {
  ArrowDownTrayIcon,
  PaperClipIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { FieldInput, FieldSelect } from "../shared";

export default function DetailsPanel() {
  const propertyTypeOptions = [
    { label: "Industrial", value: "industrial" },
    { label: "Office", value: "office" },
    { label: "Retail", value: "retail" },
    { label: "Mixed Use", value: "mixed_use" },
    { label: "Warehouse", value: "warehouse" },
  ];

  const stateOptions = [
    { label: "Oregon (OR)", value: "OR" },
    { label: "Washington (WA)", value: "WA" },
    { label: "California (CA)", value: "CA" },
    { label: "Idaho (ID)", value: "ID" },
    { label: "Nevada (NV)", value: "NV" },
  ];

  return (
    <div>
      <dl className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
        {/* Line one */}
        <div className="px-4 py-3 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Property Name
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldInput id="propertyName" placeholder="e.g., Harbor Heights" />
          </dd>
        </div>

        <div className="px-4 py-3 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Property Type
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldSelect
              id="propertyType"
              options={propertyTypeOptions}
              placeholder="Select property type"
            />
          </dd>
        </div>

        {/* Line two */}
        <div className="px-4 py-3 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Street Address
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldInput
              id="streetAddress"
              placeholder="e.g., 123 Main Street"
            />
          </dd>
        </div>

        <div className="px-4 py-3 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            City
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldInput id="city" placeholder="e.g., Portland" />
          </dd>
        </div>

        {/* Line three */}
        <div className="px-4 py-3 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            State
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldSelect
              id="state"
              options={stateOptions}
              placeholder="Select state"
            />
          </dd>
        </div>

        <div className="px-4 py-3 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            ZIP Code
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldInput id="zipCode" placeholder="e.g., 97201" />
          </dd>
        </div>

        {/* Line four - Year Built (others removed) */}
        <div className="px-4 py-3 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Year Built
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldInput id="yearBuilt" type="number" placeholder="e.g., 1985" />
          </dd>
        </div>
      </dl>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

      {/* Property Description */}
      <div className="px-4 py-3 sm:px-0">
        <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
          Property Description
        </dt>
        <dd className="mt-2">
          <textarea
            id="description"
            rows={4}
            placeholder="Enter property description..."
            className="block w-full rounded-md bg-white py-2 px-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-400"
          />
        </dd>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

      {/* Property Attachments */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Property Documents
          </h3>
          <button
            type="button"
            className="rounded-full border-1 border-sea p-1 text-sea hover:bg-sea/20 dark:border-sea dark:text-sea dark:hover:bg-sea/30"
          >
            <PlusIcon aria-hidden="true" className="size-5" />
          </button>
        </div>

        <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
          {/* Sample attachments */}
          <li className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <PaperClipIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Property_Deed_4033_NW_Yeon.pdf
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  2.4 MB • Uploaded on Aug 15, 2024
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex w-7 justify-center rounded-full p-1 text-sm text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <ArrowDownTrayIcon className="h-4 w-4" />
              </button>
              <button className="flex w-7 justify-center rounded-full p-1 text-sm text-sm text-sea hover:text-sea dark:text-sea  dark:hover:text-red-300">
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </li>

          <li className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <PaperClipIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Insurance_Policy_2024.pdf
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  1.8 MB • Uploaded on Jul 22, 2024
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex w-7 justify-center rounded-full p-1 text-sm text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <ArrowDownTrayIcon className="h-4 w-4" />
              </button>
              <button className="flex w-7 justify-center rounded-full p-1 text-sm ttext-sm text-sea hover:text-sea dark:text-sea  dark:hover:text-red-300">
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </li>

          <li className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <PaperClipIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Property_Survey_2023.pdf
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  3.2 MB • Uploaded on Mar 10, 2024
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex w-7 justify-center rounded-full p-1 text-sm text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <ArrowDownTrayIcon className="h-4 w-4" />
              </button>
              <button className="flex w-7 justify-center rounded-full p-1 text-sm text-sea hover:text-sea dark:text-sea dark:hover:text-red-300">
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button variant="cta">Save Changes</Button>
      </div>
    </div>
  );
}
