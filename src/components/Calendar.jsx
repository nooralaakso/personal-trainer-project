import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getTrainings } from '../api/trainingApi';
import dayjs from 'dayjs';
 
// Main component to display the training calendar
export function Calendar() {
    const [events, setEvents] = useState([]);
 
    // Fetch training data and transform it into the format required by FullCalendar
    useEffect(() => {
        getTrainings().then(data => {
            const transformed = data.map(training => ({
                title: training.activity + (training.customer?.firstname ? ` (${training.customer.firstname} ${training.customer.lastname})` : ''),
                start: dayjs(training.date).toISOString(),
                end: dayjs(training.date).add(training.duration, 'minute').toISOString()
            }));
            setEvents(transformed);
        });
    }, []);
 
    return (
        <div style={{ padding: 20 }}>
            <h1>Training Calendar</h1>
            {/* FullCalendar component with day and time grid views */}
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={events}
                height={800}
            />
        </div>
    );
}