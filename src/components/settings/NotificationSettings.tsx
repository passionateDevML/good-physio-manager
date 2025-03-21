
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export interface NotificationPreferences {
  email: boolean;
  desktop: boolean;
  mobile: boolean;
  appointmentReminders: boolean;
  marketingEmails: boolean;
}

interface NotificationSettingsProps {
  initialSettings?: NotificationPreferences;
}

export function NotificationSettings({ initialSettings }: NotificationSettingsProps) {
  const [notificationSettings, setNotificationSettings] = useState<NotificationPreferences>(
    initialSettings || {
      email: true,
      desktop: true,
      mobile: false,
      appointmentReminders: true,
      marketingEmails: false
    }
  );

  const handleNotificationChange = (field: keyof NotificationPreferences, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences de notifications</CardTitle>
        <CardDescription>
          Configurez comment et quand vous souhaitez être notifié
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Canaux de notification</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notif">Email</Label>
            <Switch 
              id="email-notif" 
              checked={notificationSettings.email}
              onCheckedChange={(checked) => handleNotificationChange('email', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="desktop-notif">Notifications bureau</Label>
            <Switch 
              id="desktop-notif" 
              checked={notificationSettings.desktop}
              onCheckedChange={(checked) => handleNotificationChange('desktop', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="mobile-notif">Notifications mobiles</Label>
            <Switch 
              id="mobile-notif" 
              checked={notificationSettings.mobile}
              onCheckedChange={(checked) => handleNotificationChange('mobile', checked)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Types de notifications</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="appointment-reminders">Rappels de rendez-vous</Label>
            <Switch 
              id="appointment-reminders" 
              checked={notificationSettings.appointmentReminders}
              onCheckedChange={(checked) => handleNotificationChange('appointmentReminders', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="marketing-emails">Emails marketing</Label>
            <Switch 
              id="marketing-emails" 
              checked={notificationSettings.marketingEmails}
              onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
