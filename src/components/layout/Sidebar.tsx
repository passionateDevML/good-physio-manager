
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Home,
  LineChart,
  Settings,
  Users
} from 'lucide-react';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
  collapsed?: boolean;
}

const NavItem = ({ icon: Icon, label, to, active, collapsed }: NavItemProps) => {
  return (
    <TooltipProvider disableHoverableContent={!collapsed}>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link to={to}>
            <Button
              variant="ghost"
              className={cn(
                'w-full flex items-center justify-start gap-3 px-4 py-2 text-sm font-medium transition-all',
                active 
                  ? 'bg-accent text-accent-foreground' 
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground',
                collapsed && 'justify-center px-2'
              )}
            >
              <Icon className={cn('h-5 w-5 shrink-0', active ? 'text-physio-500' : 'text-muted-foreground')} />
              {!collapsed && <span>{label}</span>}
            </Button>
          </Link>
        </TooltipTrigger>
        {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

const navItems = [
  { icon: Home, label: 'Tableau de bord', to: '/dashboard' },
  { icon: Users, label: 'Patients', to: '/patients' },
  { icon: Calendar, label: 'Rendez-vous', to: '/appointments' },
  { icon: ClipboardList, label: 'Évaluations', to: '/evaluations' },
  { icon: FileText, label: 'Dossiers', to: '/records' },
  { icon: LineChart, label: 'Rapports', to: '/reports' },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        'bg-sidebar border-r border-border h-[calc(100vh-3.5rem)] flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="flex-1 py-6 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            icon={item.icon}
            label={item.label}
            to={item.to}
            active={location.pathname === item.to}
            collapsed={collapsed}
          />
        ))}
      </div>
      
      <div className="p-3 border-t border-border">
        <NavItem
          icon={Settings}
          label="Paramètres"
          to="/settings"
          active={location.pathname === '/settings'}
          collapsed={collapsed}
        />
        <Button
          variant="ghost"
          size="icon"
          className="mt-4 w-full flex items-center justify-center text-muted-foreground hover:text-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
    </aside>
  );
}
