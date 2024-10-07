import React, { useEffect, useState } from 'react';
import { Button, Card, Space, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { fectchCustomerDataById } from './CustomerApiCalls';

const { Title, Text } = Typography;

const CustomerView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [customer, setCustomer] = useState({});
    useEffect(() => {
        if (id) {
            const callFetchCustomerDataById = async (cust_id) => {
                const customerData = await fectchCustomerDataById(cust_id);
                setCustomer(customerData);
            }
            callFetchCustomerDataById(id);
        }
    }, [id]);
    return (
        <div style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
            <Card>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Title level={4}>Customer Details</Title>

                    <div>
                        <Text strong>Name: </Text>
                        <Text>{customer.name}</Text>
                    </div>

                    <div>
                        <Text strong>Contact: </Text>
                        <Text>{customer.contact}</Text>
                    </div>

                    <div>
                        <Text strong>Creation Date: </Text>
                        <Text>{customer.creation_date}</Text>
                    </div>

                    <Space>
                        <Button type="primary" onClick={() => navigate(`/Customer/edit/${id}`)}>
                            Edit
                        </Button>
                        <Button onClick={() => navigate('/Customer')}>Back to List</Button>
                    </Space>
                </Space>
            </Card>
        </div>
    );
}

export default CustomerView;