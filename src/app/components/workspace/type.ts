// src/app/components/workspace/types.ts

export interface Issue {
  id: string;
  title: string;
  priority: "Urgent" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  property: string;
  unit?: string;
  reportedDate: string;
}

export interface Meeting {
  id: number;
  date: string;
  time: string;
  datetime: string;
  name: string;
  imageUrl: string;
  location: string;
}

export interface RecentFile {
  id: number;
  name: string;
  type: string;
  lastModified: string;
  size: string;
  starred: boolean;
  icon: React.ElementType;
}

export interface CalendarDay {
  date: string;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
}
