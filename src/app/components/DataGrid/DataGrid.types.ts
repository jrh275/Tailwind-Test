export interface Column {
  field: string;
  headerName: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  type?: "string" | "number" | "date";
  render?: (value: any, row: any) => React.ReactNode;
}

export interface Action {
  label: string;
  onClick: () => void;
  primary?: boolean;
}

export interface DataGridProps {
  data?: any[];
  columns?: Column[];
  actions?: Action[];
  searchPlaceholder?: string;
  searchFields?: string[];
  itemsPerPage?: number;
}
