import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { getTrainings, addTraining } from './trainingApi';
 
// The following code is a test suite for the Training REST API.
describe("Training REST API", () => {
 
    // The beforeEach function is called before each test in the suite.
    // It resets the training database to ensure a clean state for each test.
    beforeEach(() => {
        return resetTrainingDatabase()
    });
    // The afterEach function is called after each test in the suite.
    // It also resets the training database to ensure a clean state for the next test.
    afterEach(() => {
        return resetTrainingDatabase()
    });
 
    // The test function defines a test case for fetching all trainings.
    test("fetching all trainings", async () => {
        const trainings = await getTrainings();
        expect(trainings.length).toBeGreaterThan(0);
        expect(trainings[0]).toHaveProperty("customerName");
    });
 
    // The test function defines a test case for adding a new training.
    test("adding a training", async () => {
        const newTraining = {
            duration: 60,
            activity: "Test Activity"
        };
 
        // Add the training using the API
        const added = await addTraining(newTraining);
 
        // Validate that the returned object contains what we sent
        expect(added).toHaveProperty("activity", "Test Activity");
        expect(added).toHaveProperty("duration", 60);
    });
 
 
});
 
 
// Helper function to reset the backend between tests
async function resetTrainingDatabase() {
    const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/reset", {
        method: "POST",
    });
    return response.ok;
}