import { message } from "antd";

const ENDPOINT = 'http://localhost:8080/api/v1/customers';

export const fectchCustomerDataById = async (id) => {
    try {
        const response = await fetch(`${ENDPOINT}/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error occurred: ", error);
    }
}

export const fetchCustomerList = async () => {
    try {
        const response = await fetch(ENDPOINT);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log("Error occurred: ", error);
    }

}
export const callCreateCustomer = async (id, values) => {
    const method = id ? "PUT" : "POST";
    const url = id ? `${ENDPOINT}/${id}` : ENDPOINT;

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error occurred: ", error);
    }
}

export const deleteCustomerById = async (id) => {

    try {
        const response = await fetch(`${ENDPOINT}/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 500) {
            console.log("Error occurred: ");
            message.error("Error occurred.!");
            return false;
        }
        message.success("Record deleted successfully.!");
        return true;
    } catch (error) {
        console.log("Error occurred: ", error);
        message.error("Error occurred.!");
    }
}