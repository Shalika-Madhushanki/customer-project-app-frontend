import { message } from "antd";

const ENDPOINT = 'http://localhost:8080/api/v1/projects';

export const fectchProjectDataById = async (id) => {
    try {
        const response = await fetch(`${ENDPOINT}/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error occurred: ", error);
    }
}

export const fetchProjectList = async () => {
    try {
        const response = await fetch(ENDPOINT);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error occurred: ", error);
    }
}
export const callCreateProject = async (id, values) => {
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

export const deleteProjectById = async (id) => {
    try {
        const response = await fetch(`${ENDPOINT}/${id}`, {
            method: "DELETE",
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
export const deleteCustomerById = async (id) => {

    try {
        await fetch(`${ENDPOINT}/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        message.success("Record deleted successfully.!");
    } catch (error) {
        console.log("Error occurred: ", error);
        message.error("Error occurred.!");
    }
}
export const downloadProjectByDataRange = async (startDate, endDate) => {
    try {
        const response = await fetch(`${ENDPOINT}/download`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            responseType: 'blob',
            body: JSON.stringify({
                startDate: startDate,
                endDate: endDate
            })
        });
        console.log("response:",response);
        if (!response.ok) {
            console.log("Error occurred");
            message.error('Error occurred');

        } else {
            const blob = await response.blob(); 
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'projects.zip'); 
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link); 
            message.success('Download started');
        }

    } catch (error) {
        console.log("Error occurred: ", error);

    }
}