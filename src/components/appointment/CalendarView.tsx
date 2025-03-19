
import React from 'react';

interface Appointment {
  id: string;
  patient: { name: string; avatarUrl: string };
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  notes?: string;
}

interface CalendarViewProps {
  date: Date;
  appointments: Appointment[];
}

export function CalendarView({ date, appointments }: CalendarViewProps) {
  // Time slots from 8:00 to 18:00
  const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8);
  
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-2">
        {timeSlots.map((hour) => {
          // Find appointments for this time slot
          const appsAtThisHour = appointments.filter(app => {
            const startTime = parseInt(app.time.split(':')[0]);
            return startTime === hour;
          });
          
          return (
            <div key={hour} className="flex items-start">
              <div className="w-16 text-sm text-muted-foreground py-2">
                {`${hour}:00`}
              </div>
              <div className="flex-1 min-h-[60px] border-t border-border">
                {appsAtThisHour.length > 0 ? (
                  <div className="pl-2 py-1">
                    {appsAtThisHour.map(app => (
                      <div 
                        key={app.id} 
                        className="bg-physio-50 border-l-4 border-physio-500 p-2 rounded-r mb-1"
                      >
                        <div className="text-sm font-medium">{app.patient.name}</div>
                        <div className="text-xs text-muted-foreground">{app.type}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full w-full"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
