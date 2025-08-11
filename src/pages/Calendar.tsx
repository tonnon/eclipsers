
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { eclipseEvents } from '@/data';

const CalendarPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState(eclipseEvents[0]);
  
  // Find events for selected date
  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    return eclipseEvents.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Get all dates that have events
  const eventDates = eclipseEvents.map(event => {
    const date = new Date(event.date);
    return date;
  });
  
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-display font-bold mb-6">Eclipse Calendar</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar section */}
        <Card className="eclipse-card lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5 text-eclipse-400" />
              <span>Select Date</span>
            </CardTitle>
            <CardDescription>Browse upcoming and past eclipse events</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
              modifiers={{
                event: eventDates
              }}
              modifiersClassNames={{
                event: 'bg-eclipse-400/20 text-eclipse-100 rounded-md'
              }}
            />
          </CardContent>
        </Card>
        
        {/* Events list */}
        <Card className="eclipse-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Eclipses</CardTitle>
            <CardDescription>
              {getEventsForDate(date).length 
                ? `${getEventsForDate(date).length} events found for selected date` 
                : 'No events on this date - showing upcoming eclipses'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming">
              <TabsList className="grid w-full grid-cols-2 bg-eclipse-700">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="mt-4">
                <div className="space-y-6">
                  {eclipseEvents.map(event => (
                    <div 
                      key={event.id}
                      className="flex flex-col md:flex-row gap-4 p-4 bg-eclipse-700/30 rounded-lg cursor-pointer hover:bg-eclipse-700/50 transition-colors"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="w-full md:w-40 h-24 rounded-md overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{event.title}</h3>
                          <Badge variant="outline" className="text-xs bg-eclipse-600">
                            {event.type === 'solar' ? 'Solar' : 'Lunar'}
                          </Badge>
                        </div>
                        <p className="text-sm text-white-300 mb-1">
                          {event.date.toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })} • Duration: {event.duration}
                        </p>
                        <p className="text-xs text-white-400">
                          Visible in {event.visibility.join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Button variant="default" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="past" className="mt-4">
                <div className="flex items-center justify-center h-40 text-eclipse-400">
                  Past eclipses will appear here
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Selected event details */}
      <Card className="eclipse-card mt-6">
        <CardHeader>
          <CardTitle>{selectedEvent.title}</CardTitle>
          <CardDescription>
            {selectedEvent.date.toLocaleDateString('en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="space-y-2">
                <p className="text-eclipse-500">{selectedEvent.description}</p>
                <p className="text-sm text-eclipse-300">
                  <strong>Duration:</strong> {selectedEvent.duration}
                </p>
                <p className="text-sm text-eclipse-300">
                  <strong>Visibility:</strong> {selectedEvent.visibility.join(', ')}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Photographer Tips</h3>
              <div className="space-y-2 text-sm text-eclipse-500">
                <p>• Use a proper solar filter for solar eclipses</p>
                <p>• Set up your equipment well in advance</p>
                <p>• Use a tripod for stability</p>
                <p>• Consider timelapses for the complete event</p>
                <p>• Bracket your exposures for varied lighting</p>
                <p>• Don't forget to experience the moment with your own eyes!</p>
              </div>
              <div className="pt-4 space-x-3">
                <Button>Set Reminder</Button>
                <Button>Share Event</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarPage;
