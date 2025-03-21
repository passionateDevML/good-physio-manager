
import { Shield, User, BellRing, PaintBucket } from 'lucide-react';

export interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const settingsTabs: TabItem[] = [
  {
    id: 'profile',
    label: 'Profil',
    icon: <User className="h-4 w-4" />
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <BellRing className="h-4 w-4" />
  },
  {
    id: 'interface',
    label: 'Interface',
    icon: <PaintBucket className="h-4 w-4" />
  },
  {
    id: 'security',
    label: 'Sécurité',
    icon: <Shield className="h-4 w-4" />
  }
];
