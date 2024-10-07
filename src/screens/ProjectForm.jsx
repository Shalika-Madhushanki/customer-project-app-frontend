import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';

import { fectchProjectDataById, callCreateProject } from './ProjectApiCalls';
import { fetchCustomerList } from './CustomerApiCalls';

const { Option } = Select;

const ProjectForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [customerList, setCustomerList] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            console.log("calling fetch project: ");
            const callFetchProjectDataById = async (cust_id) => {
                const projectData = await fectchProjectDataById(cust_id);
                console.log("project:", projectData);
                form.setFieldsValue(projectData);
            }
            callFetchProjectDataById(id);
        }
    }, [id, form]);

    useEffect(() => {
        const callFetchCustomerList = async () => {
            const data = await fetchCustomerList();
            setCustomerList(data);
        }
        callFetchCustomerList();
    }, []);

    const onFinish = async (values) => {
        values.creation_date = new Date().toISOString();;
        values.cust_id = values.customerId;
        setLoading(true);
        setMessage("Please wait..!");
        setOpen(true);
        console.log("form values: ", values);
        const result = await callCreateProject(id, values);
        if (result) {
            setTimeout(() => {

            }, 2000);
            form.setFieldsValue({
                name: '',
                description: '',
            });
            setLoading(false);
            setMessage("Operation successful..!");
        }
    }

    return (
        <div style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
            <h2>{id ? 'Edit Project' : 'Create Project'}</h2>
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
                <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the description' }]}>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item name="customerId" label="Customer" rules={[{ required: true, message: 'Please select a customer' }]}>
                    <Select placeholder="Select a customer" loading={!customerList?.length}>
                        {customerList?.length > 0 && customerList.map(customer => (
                            <Option key={customer.id} value={customer.id}>
                                {customer.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {id ? 'Update' : 'Create'}
                    </Button>
                    <Button type="link" onClick={() => navigate('/Project')} style={{ marginLeft: '8px' }}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                title={<p>Loading</p>}
                footer={
                    <Button type="primary" onClick={() => { navigate("/Project") }}>
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

export default ProjectForm;