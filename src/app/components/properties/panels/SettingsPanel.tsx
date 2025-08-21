// src/app/components/properties/panels/SettingsPanel.tsx
"use client";

import {
  BellIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { FieldSelect } from "../shared";

interface ToggleProps {
  id: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

function Toggle({ id, enabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      className={`${
        enabled ? "bg-blue-600" : "bg-gray-200"
      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2`}
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${
          enabled ? "translate-x-5" : "translate-x-0"
        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
}

export default function SettingsPanel() {
  // General Settings
  const [propertyStatus, setPropertyStatus] = useState("active");
  const [isPubliclyVisible, setIsPubliclyVisible] = useState(true);
  const [timezone, setTimezone] = useState("America/Los_Angeles");
  const [currency, setCurrency] = useState("USD");

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(true);
  const [leaseExpiryAlerts, setLeaseExpiryAlerts] = useState(true);
  const [paymentReminders, setPaymentReminders] = useState(true);

  // Maintenance & Operations
  const [autoAssignMaintenance, setAutoAssignMaintenance] = useState(false);
  const [requireExpenseApproval, setRequireExpenseApproval] = useState(true);
  const [enableWorkOrders, setEnableWorkOrders] = useState(true);
  const [trackMaintenanceHistory, setTrackMaintenanceHistory] = useState(true);

  // Tenant Portal
  const [enableTenantPortal, setEnableTenantPortal] = useState(true);
  const [allowMaintenanceRequests, setAllowMaintenanceRequests] =
    useState(true);
  const [enableOnlinePayments, setEnableOnlinePayments] = useState(true);
  const [showRentHistory, setShowRentHistory] = useState(true);

  // Security & Access
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("60");
  const [enableDataBackups, setEnableDataBackups] = useState(true);
  const [auditTrail, setAuditTrail] = useState(true);

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Under Construction", value: "construction" },
    { label: "For Sale", value: "for_sale" },
  ];

  const timezoneOptions = [
    { label: "Pacific Time (PT)", value: "America/Los_Angeles" },
    { label: "Mountain Time (MT)", value: "America/Denver" },
    { label: "Central Time (CT)", value: "America/Chicago" },
    { label: "Eastern Time (ET)", value: "America/New_York" },
  ];

  const currencyOptions = [
    { label: "US Dollar (USD)", value: "USD" },
    { label: "Canadian Dollar (CAD)", value: "CAD" },
    { label: "Euro (EUR)", value: "EUR" },
    { label: "British Pound (GBP)", value: "GBP" },
  ];

  const sessionTimeoutOptions = [
    { label: "30 minutes", value: "30" },
    { label: "1 hour", value: "60" },
    { label: "2 hours", value: "120" },
    { label: "4 hours", value: "240" },
    { label: "8 hours", value: "480" },
  ];

  return (
    <div className="space-y-8">
      {/* General Settings */}
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-4">
            <BuildingOfficeIcon className="h-6 w-6 text-gray-400 mr-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              General Settings
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Property Status
              </label>
              <FieldSelect
                id="propertyStatus"
                options={statusOptions}
                value={propertyStatus}
                onChange={(e) => setPropertyStatus(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timezone
              </label>
              <FieldSelect
                id="timezone"
                options={timezoneOptions}
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Currency
              </label>
              <FieldSelect
                id="currency"
                options={currencyOptions}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Publicly Visible
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Show this property in public listings
                </p>
              </div>
              <Toggle
                id="publiclyVisible"
                enabled={isPubliclyVisible}
                onChange={setIsPubliclyVisible}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-4">
            <BellIcon className="h-6 w-6 text-gray-400 mr-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Notification Preferences
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Notifications
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive important updates via email
                </p>
              </div>
              <Toggle
                id="emailNotifications"
                enabled={emailNotifications}
                onChange={setEmailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  SMS Notifications
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive urgent alerts via text message
                </p>
              </div>
              <Toggle
                id="smsNotifications"
                enabled={smsNotifications}
                onChange={setSmsNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Maintenance Alerts
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified about maintenance requests
                </p>
              </div>
              <Toggle
                id="maintenanceAlerts"
                enabled={maintenanceAlerts}
                onChange={setMaintenanceAlerts}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Lease Expiry Alerts
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Reminders when leases are expiring
                </p>
              </div>
              <Toggle
                id="leaseExpiryAlerts"
                enabled={leaseExpiryAlerts}
                onChange={setLeaseExpiryAlerts}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Payment Reminders
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Send automatic payment reminders to tenants
                </p>
              </div>
              <Toggle
                id="paymentReminders"
                enabled={paymentReminders}
                onChange={setPaymentReminders}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance & Operations */}
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-4">
            <WrenchScrewdriverIcon className="h-6 w-6 text-gray-400 mr-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Maintenance & Operations
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Auto-Assign Maintenance
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Automatically assign maintenance requests to contractors
                </p>
              </div>
              <Toggle
                id="autoAssignMaintenance"
                enabled={autoAssignMaintenance}
                onChange={setAutoAssignMaintenance}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Require Expense Approval
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Approve maintenance expenses before work begins
                </p>
              </div>
              <Toggle
                id="requireExpenseApproval"
                enabled={requireExpenseApproval}
                onChange={setRequireExpenseApproval}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Enable Work Orders
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Create formal work orders for maintenance tasks
                </p>
              </div>
              <Toggle
                id="enableWorkOrders"
                enabled={enableWorkOrders}
                onChange={setEnableWorkOrders}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Track Maintenance History
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Keep detailed records of all maintenance activities
                </p>
              </div>
              <Toggle
                id="trackMaintenanceHistory"
                enabled={trackMaintenanceHistory}
                onChange={setTrackMaintenanceHistory}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tenant Portal */}
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-4">
            <UserGroupIcon className="h-6 w-6 text-gray-400 mr-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Tenant Portal
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Enable Tenant Portal
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Allow tenants to access their online portal
                </p>
              </div>
              <Toggle
                id="enableTenantPortal"
                enabled={enableTenantPortal}
                onChange={setEnableTenantPortal}
              />
            </div>

            {enableTenantPortal && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Allow Maintenance Requests
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Tenants can submit maintenance requests online
                    </p>
                  </div>
                  <Toggle
                    id="allowMaintenanceRequests"
                    enabled={allowMaintenanceRequests}
                    onChange={setAllowMaintenanceRequests}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Enable Online Payments
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Accept rent payments through the portal
                    </p>
                  </div>
                  <Toggle
                    id="enableOnlinePayments"
                    enabled={enableOnlinePayments}
                    onChange={setEnableOnlinePayments}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Show Rent History
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Display payment history to tenants
                    </p>
                  </div>
                  <Toggle
                    id="showRentHistory"
                    enabled={showRentHistory}
                    onChange={setShowRentHistory}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Security & Access */}
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-4">
            <ShieldCheckIcon className="h-6 w-6 text-gray-400 mr-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Security & Access
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Two-Factor Authentication
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Toggle
                id="twoFactorAuth"
                enabled={twoFactorAuth}
                onChange={setTwoFactorAuth}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Session Timeout
              </label>
              <FieldSelect
                id="sessionTimeout"
                options={sessionTimeoutOptions}
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Enable Data Backups
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Automatically backup property data daily
                </p>
              </div>
              <Toggle
                id="enableDataBackups"
                enabled={enableDataBackups}
                onChange={setEnableDataBackups}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Audit Trail
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Keep logs of all user actions and changes
                </p>
              </div>
              <Toggle
                id="auditTrail"
                enabled={auditTrail}
                onChange={setAuditTrail}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:ring-white/20 dark:hover:bg-white/20">
          Reset to Defaults
        </button>
        <button className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500">
          Cancel
        </button>
        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          Save Settings
        </button>
      </div>
    </div>
  );
}
