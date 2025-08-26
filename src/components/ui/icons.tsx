// src/components/ui/icons.tsx
/**
 * Icon Migration Helper
 *
 * This file provides a seamless migration path from @mui/icons-material to @heroicons/react.
 * Import icons from this file instead of directly from Heroicons for easier refactoring.
 *
 * Usage:
 * import { MoreHorizontalIcon, ExpandDownIcon, CloseIcon } from '@/components/ui/icons'
 */

// Import all the Heroicons we need
import {
  AcademicCapIcon,
  ArrowDownIcon,
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
  ArrowsRightLeftIcon,
  ArrowUpIcon,
  ArrowUpTrayIcon,
  Bars3Icon,
  BarsArrowUpIcon,
  BellIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentIcon,
  DocumentMagnifyingGlassIcon,
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
  FaceSmileIcon,
  FolderArrowDownIcon,
  FolderIcon,
  FolderPlusIcon,
  FunnelIcon,
  HeartIcon,
  HomeIcon,
  HomeModernIcon,
  InboxIcon,
  InformationCircleIcon,
  KeyIcon,
  LinkIcon,
  ListBulletIcon,
  LockClosedIcon,
  LockOpenIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  MinusCircleIcon,
  MinusIcon,
  MusicalNoteIcon,
  NoSymbolIcon,
  PaperClipIcon,
  PencilIcon,
  PhoneIcon,
  PhotoIcon,
  PlusCircleIcon,
  PlusIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  StarIcon,
  TrashIcon,
  UserCircleIcon,
  UserIcon,
  UsersIcon,
  VideoCameraIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Export the original Heroicon names first
export {
  AcademicCapIcon,
  ArrowDownIcon,
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
  ArrowsRightLeftIcon,
  ArrowUpIcon,
  ArrowUpTrayIcon,
  Bars3Icon,
  BarsArrowUpIcon,
  BellIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentIcon,
  DocumentMagnifyingGlassIcon,
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
  FaceSmileIcon,
  FolderArrowDownIcon,
  FolderIcon,
  FolderPlusIcon,
  FunnelIcon,
  HeartIcon,
  HomeIcon,
  HomeModernIcon,
  InboxIcon,
  InformationCircleIcon,
  KeyIcon,
  LinkIcon,
  ListBulletIcon,
  LockClosedIcon,
  LockOpenIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  MinusCircleIcon,
  MinusIcon,
  MusicalNoteIcon,
  NoSymbolIcon,
  PaperClipIcon,
  PencilIcon,
  PhoneIcon,
  PhotoIcon,
  PlusCircleIcon,
  PlusIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  StarIcon,
  TrashIcon,
  UserCircleIcon,
  UserIcon,
  UsersIcon,
  VideoCameraIcon,
  XCircleIcon,
  XMarkIcon,
};

// Export MUI-compatible aliases (these don't conflict because they're different names)
export {
  UserCircleIcon as AccountCircle,
  UserCircleIcon as AccountCircleIcon, // MUI: Add
  PlusIcon as Add,
  PlusIcon as AddIcon, // MUI: ArrowForward
  ArrowRightIcon as ArrowForward,
  ArrowRightIcon as ArrowForwardIcon, // MUI: Attachment
  PaperClipIcon as Attachment,
  PaperClipIcon as AttachmentIcon, // MUI: Business
  BuildingOfficeIcon as Business,
  BuildingOfficeIcon as BusinessIcon, // MUI: Close
  XMarkIcon as Close,
  // Common actions
  XMarkIcon as CloseIcon, // MUI: ContentCopy
  ClipboardDocumentIcon as ContentCopy,
  ClipboardDocumentIcon as ContentCopyIcon, // MUI: CreateNewFolder
  FolderPlusIcon as CreateNewFolder, // MUI: FolderOutlined
  FolderPlusIcon as CreateNewFolderIcon, // MUI: Dashboard
  Squares2X2Icon as Dashboard,
  // Layout & Display
  Squares2X2Icon as DashboardIcon, // MUI: Delete
  TrashIcon as Delete,
  TrashIcon as DeleteIcon, // MUI: Download
  ArrowDownTrayIcon as Download,
  // Download/Upload
  ArrowDownTrayIcon as DownloadIcon, // MUI: DriveFileRenameOutline
  PencilIcon as DriveFileRenameOutline,
  // File Operations
  PencilIcon as DriveFileRenameOutlineIcon, // MUI: Edit
  PencilIcon as Edit,
  PencilIcon as EditIcon,
  XCircleIcon as ErrorIcon, // MUI: ExpandLess
  ChevronUpIcon as ExpandLess,
  ChevronUpIcon as ExpandLessIcon, // MUI: ExpandMore
  ChevronDownIcon as ExpandMore,
  // Navigation & UI
  ChevronDownIcon as ExpandMoreIcon, // MUI: FileDownload
  ArrowDownTrayIcon as FileDownload,
  ArrowDownTrayIcon as FileDownloadIcon, // MUI: FileUploadOutlined
  ArrowUpTrayIcon as FileUploadOutlined,
  ArrowUpTrayIcon as FileUploadOutlinedIcon,
  FolderIcon as FolderOutlined, // MUI: Info
  InformationCircleIcon as Info,
  // Status & Information
  InformationCircleIcon as InfoIcon, // MUI: InfoOutlined
  InformationCircleIcon as InfoOutlined,
  InformationCircleIcon as InfoOutlinedIcon, // MUI: InsertDriveFile
  DocumentIcon as InsertDriveFile,
  // Files & Documents
  DocumentIcon as InsertDriveFileIcon, // MUI: Menu
  Bars3Icon as Menu,
  Bars3Icon as MenuIcon, // MUI: MoreHoriz
  EllipsisHorizontalIcon as MoreHoriz,
  // Most frequently used icons
  EllipsisHorizontalIcon as MoreHorizontalIcon, // MUI: People
  UsersIcon as People, // MUI: PeopleAlt
  UsersIcon as PeopleAlt,
  UsersIcon as PeopleAltIcon,
  UsersIcon as PeopleIcon, // MUI: Person
  UserIcon as Person,
  // Users & People
  UserIcon as PersonIcon, // MUI: Place
  MapPinIcon as Place, // MUI: Error (closest match)
  // Location & Business
  MapPinIcon as PlaceIcon, // MUI: Refresh
  ArrowPathIcon as Refresh,
  // System Actions
  ArrowPathIcon as RefreshIcon, // MUI: Remove
  MinusIcon as Remove,
  MinusIcon as RemoveIcon, // MUI: Search
  MagnifyingGlassIcon as Search,
  // Search & Navigation
  MagnifyingGlassIcon as SearchIcon, // MUI: Store
  BuildingStorefrontIcon as Store,
  BuildingStorefrontIcon as StoreIcon, // MUI: Visibility
  EyeIcon as Visibility,
  // Visibility
  EyeIcon as VisibilityIcon, // MUI: VisibilityOff
  EyeSlashIcon as VisibilityOff,
  EyeSlashIcon as VisibilityOffIcon, // MUI: Warning
  ExclamationTriangleIcon as Warning,
  ExclamationTriangleIcon as WarningIcon, // MUI: Work
  BriefcaseIcon as Work,
  BriefcaseIcon as WorkIcon,
};
