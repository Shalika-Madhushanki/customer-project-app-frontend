import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';

import { fectchProjectDataById, callCreateProject } from '../services/projectService';
import { fetchCustomerList } from '../services/customerService';

const { Option } = Select;

const ProjectFormView = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [customerList, setCustomerList] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const callFetchProjectDataById = async (cust_id) => {
                const projectData = await fectchProjectDataById(cust_id);
                projectData.customerId = projectData.customer.id;
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
        values.creationDate = new Date().toISOString();;

        setLoading(true);
        setMessage("Please wait..!");
        setOpen(true);
        const result = await callCreateProject(id, values);
        if (result?.status !== 500) {
            form.setFieldsValue({
                name: '',
                description: '',
            });
            setLoading(false);
            setMessage("Operation successful..!");
        } else {
            setLoading(false);
            setMessage("Error occurred..!");
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
                    <Button type="link" onClick={() => navigate('/projects')} style={{ marginLeft: '8px' }}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                title={<p>Loading</p>}
                footer={
                    <Button type="primary" onClick={() => { navigate("/projects") }}>
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

export default ProjectFormView;