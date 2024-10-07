import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useNavigate, useParams } from "react-router-dom";

import { fectchCustomerDataById, callCreateCustomer } from "./CustomerApiCalls";

const CustomerForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            const callFetchCustomerDataById = async (cust_id) => {
                const customerData = await fectchCustomerDataById(cust_id);
                form.setFieldsValue(customerData);
            }
            callFetchCustomerDataById(id);
        }
    }, [id, form]);
    const onFinish = async (values) => {
        values.creation_date = new Date().toISOString();;
        setLoading(true);
        setMessage("Please wait..!");
        setOpen(true);
        console.log("form values: ", values);
        const result = await callCreateCustomer(id, values);
        if (result) {
            setTimeout(() => {

            }, 2000);
            form.setFieldsValue({
                name: '',
                contact: '',
            });
            setLoading(false);
            setMessage("Operation successful..!");
        }
    }

    return (
        <div style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
            <h2>{id ? 'Edit Customer' : 'Create Customer'}</h2>
            <Form
                disabled={loading}
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    name: '',
                    contact: '',
                }}
            >
                <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="contact" label="Contact" rules={[{ required: true, message: 'Please enter the contact' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {id ? 'Update' : 'Create'}
                    </Button>
                    <Button type="link" onClick={() => navigate('/Customer')} style={{ marginLeft: '8px' }}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                title={<p>Loading</p>}
                footer={
                    <Button type="primary" onClick={() => { navigate("/Customer") }}>
                        Close
                    </Button>
                }
                loading={loading}
                open={open}
                onCancel={() => setOpen(false)}
            >
                <p>{message}</p>
            </Modal>
        </div>
    );
}

export default CustomerForm;