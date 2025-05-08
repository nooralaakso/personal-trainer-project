// Fetches all trainings from the backend and adds customer names to each training
export async function getTrainings() {
    // Fetches all trainings from the backend
    const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
 
    const data = await response.json();
    const trainings = data._embedded.trainings;
 
    // For each training, fetch the related customer info
    const trainingsWithCustomer = await Promise.all(
        trainings.map(async (training) => {
            const customerUrl = training._links.customer.href;
    
            try {
                const customerResponse = await fetch(customerUrl);
                if (!customerResponse.ok) throw new Error();
    
                const customerWrapper = await customerResponse.json();
                // Handle two possible response formats
                const customer = customerWrapper._embedded?.customers?.[0] || customerWrapper;
    
                // Build customer full name
                const customerName =
                    customer?.firstname && customer?.lastname
                        ? `${customer.firstname} ${customer.lastname}`
                        : 'Unknown';
    
                return {
                    ...training,
                    customerName,
                };
            } catch (err) {
                console.error('Virhe asiakastiedoissa:', err);
                return {
                    ...training,
                    customerName: 'Unknown',
                };
            }
        })
    );
    
 
    return trainingsWithCustomer;
}
 
 
// Adds a new training to the backend
export async function addTraining(training) {
    const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(training),
    });
 
    if (!response.ok) {
        throw new Error(`Failed to add training: ${response.status}`);
    }
 
    const data = await response.json();
    return data;
}
// Delete a training from the backend
export async function deleteTraining(training) {
    const response = await fetch(training._links.self.href, {
        method: 'DELETE',
    });
 
    if (!response.ok) {
        throw new Error(`Failed to delete training: ${response.status}`);
    }
 
    return response;
}