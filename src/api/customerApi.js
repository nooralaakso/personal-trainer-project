// Fetch all customers from the API
export async function getCustomers() {
    const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
    // If the request fails, throw an error with the HTTP status
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Parse the JSON response and return the list of customers
    const data = await response.json();
    return data._embedded.customers;
};

// Add a new customer to the database
export async function addCustomer(customer) {
    const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', {
        method: 'POST', // HTTP POST method for adding a new resource
        headers: {
            'Content-Type': 'application/json', // Specify JSON payload
        },
        body: JSON.stringify(customer), // Convert customer object to JSON

    });
    // If the request fails, throw an error with the HTTP status
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Return the newly created customer object from the response
    const data = await response.json();
    return data;
};

// Update an existing customer in the database
export async function updateCustomer(customer) {
    const response = await fetch(customer._links.self.href, {
        method: 'PUT', // HTTP PUT method for updating an existing resource
        headers: {
            'Content-Type': 'application/json', // Specify JSON payload
        },
        body: JSON.stringify(customer), // Convert updated customer object to JSON
    });
    // If the request fails, throw an error with the HTTP status
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Return the updated customer object from the response
    const data = await response.json();
    return data;
};
