// src/app/components/properties/shared/DateInput.tsx
import { CalendarDaysIcon } from "@heroicons/react/20/solid";

interface DateInputProps {
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DateInput({
  id,
  placeholder,
  value,
  onChange,
}: DateInputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type="date"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full rounded-md bg-white py-2 pr-10 pl-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-400"
      />
      <CalendarDaysIcon
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 dark:text-gray-500"
      />
    </div>
  );
}
