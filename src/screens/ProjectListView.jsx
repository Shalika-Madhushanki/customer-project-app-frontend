import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Popconfirm, Row, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { fetchProjectList } from '../services/projectService';
import { deleteProjectById } from '../services/projectService';


const ProjectListView = () => {
    const [projectList, setProjectList] = useState([]);
    const navigate = useNavigate();
    useEffect(
        () => {
            const callFetchProjectData = async () => {
                const projectData = await fetchProjectList();
                setProjectList(projectData);
            }
            callFetchProjectData();
        }, []
    );
    const handleDelete = async (id) => {
        const res = await deleteProjectById(id);
        if (res) {
            setProjectList(projectList.filter(customer => customer.id !== id));
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
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
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
                    <Button icon={<EyeOutlined />} onClick={() => navigate(`/projects/view/${record.id}`)}>View</Button>
                    <Button icon={<EditOutlined />} onClick={() => navigate(`/projects/edit/${record.id}`)}>Edit</Button>
                    <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}>
                        <Button icon={<DeleteOutlined />} danger>Delete</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div>
            <Row>
                <Col><Button icon={<PlusOutlined />} onClick={() => navigate(`/projects/add`)}>Create New Project</Button></Col>
                <Col><Button icon={<DownloadOutlined />} onClick={() => navigate(`/projects/download`)}>DownLoad Projects</Button></Col>
            </Row>

            <Divider />
            <Table dataSource={projectList} columns={columns} rowKey="id" ></Table>
            <div></div>
        </div>
    );
}

export default ProjectListView;