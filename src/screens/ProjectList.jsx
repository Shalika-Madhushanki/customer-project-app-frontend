import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Popconfirm, Row, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { fetchProjectList } from './ProjectApiCalls';
import { deleteProjectById } from './ProjectApiCalls';


const ProjectList = () => {
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
    const handleDelete = (id) => {
        deleteProjectById(id);
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
                    <Button icon={<EyeOutlined />} onClick={() => navigate(`/Project/view/${record.id}`)}>View</Button>
                    <Button icon={<EditOutlined />} onClick={() => navigate(`/Project/edit/${record.id}`)}>Edit</Button>
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
                <Col><Button icon={<PlusOutlined />} onClick={() => navigate(`/Project/add`)}>Create New Project</Button></Col>
                <Col><Button icon={<DownloadOutlined />} onClick={() => navigate(`/Project/download`)}>DownLoad Projects</Button></Col>
            </Row>

            <Divider />
            <Table dataSource={projectList} columns={columns} rowKey="id" ></Table>
            <div></div>
        </div>
    );
}

export default ProjectList;