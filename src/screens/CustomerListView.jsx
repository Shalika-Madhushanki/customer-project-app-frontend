import { useEffect, useState } from 'react';
import { Button, Divider, Popconfirm, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { fetchCustomerList, deleteCustomerById } from '../services/customerService';

const CustomerListView = () => {
    const [customerList, setCustomerList] = useState([]);
    const navigate = useNavigate();

    useEffect(
        () => {
            const callFetchCustomerData = async () => {
                const customerData = await fetchCustomerList();
                setCustomerList(customerData);
            }
            callFetchCustomerData();
        }, []
    );

    const handleDelete = async (id) => {
        const res = await deleteCustomerById(id);
        if (res) {
            setCustomerList(customerList.filter(customer => customer.id !== id));
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
        },
        {
            title: 'Creation Date',
            dataIndex: 'creation_date',
            key: 'creation_date',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<EyeOutlined />} onClick={() => navigate(`/customers/view/${record.id}`)}>View</Button>
                    <Button icon={<EditOutlined />} onClick={() => navigate(`/customers/edit/${record.id}`)}>Edit</Button>
                    <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}>
                        <Button icon={<DeleteOutlined />} danger>Delete</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div>
            <Button icon={<PlusOutlined />} onClick={() => navigate(`/customers/add`)}>Create New Customer</Button>
            <Divider/>
            <Table dataSource={customerList} columns={columns} rowKey="id" ></Table>
        </div>
    );
}

export default CustomerListView;