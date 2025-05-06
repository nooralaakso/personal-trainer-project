import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { getTrainings } from '../../api/trainingApi';
import _ from 'lodash';
import { Stack } from '@mui/system';
import { Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function TrainingChart() {

    // State to hold the chart data
    const [chartData, setChartData] = useState([]); 

    // Fetch the training data and process it into a format suitable for the chart
    useEffect(() => {
        getTrainings().then(trainings => {
            // Group the trainings by activity and sum the duration
            const grouped = _(trainings)
                .groupBy('activity') // Group by activity
                .map((items, activity) => ({
                    activity,
                    totalMinutes: _.sumBy(items, 'duration') // Sum the duration for each activity
                }))
                .value();
            setChartData(grouped); // Set the chart data state
        });
    }, []);

    return (
        <Box sx={{ padding: 2 }}>
            <Stack direction="column" spacing={2} sx={{ padding: 2 }}>
                <Typography variant="h4">Training Chart</Typography>
                <ResponsiveContainer width="100%" height={300}> {/* Responsive chart container */}
                <BarChart data={chartData}> {/* Bar chart component */}
                    <CartesianGrid strokeDasharray="3 3" /> {/* Grid lines for chart */}
                    <XAxis dataKey="activity" /> {/* X-axis displaying activity names */}
                    <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft'}} /> {/* Y-axis label */}
                    <Tooltip /> {/* Tooltip to show details on hover */}
                    <Legend /> {/* Legend to show activity color mapping */}
                    <Bar dataKey="totalMinutes" fill="#8884d8" /> {/* Bar representing total minutes */}
                </BarChart>
                </ResponsiveContainer>
            </Stack>
        </Box>
    )
}