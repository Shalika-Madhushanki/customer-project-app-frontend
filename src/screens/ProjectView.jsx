import React, { useEffect, useState } from 'react';
import { Button, Card, Space, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { fectchProjectDataById } from './ProjectApiCalls';

const { Title, Text } = Typography;

const ProjectView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [project, setProject] = useState({});
    useEffect(() => {
        if (id) {
            const callFetchProjectDataById = async (cust_id) => {
                const projectData = await fectchProjectDataById(cust_id);
                setProject(projectData);
            }
            callFetchProjectDataById(id);
        }
    }, [id]);
    return (
        <div style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
            <Card>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Title level={4}>Project Details</Title>

                    <div>
                        <Text strong>Name: </Text>
                        <Text>{project.name}</Text>
                    </div>

                    <div>
                        <Text strong>Contact: </Text>
                        <Text>{project.description}</Text>
                    </div>

                    <div>
                        <Text strong>Creation Date: </Text>
                        <Text>{project.creation_date}</Text>
                    </div>
                    <div>
                        <Text strong>Customer: </Text>
                        <Text>{project?.customer?.name}</Text>
                    </div>
                    <Space>
                        <Button type="primary" onClick={() => navigate(`/Project/edit/${id}`)}>
                            Edit
                        </Button>
                        <Button onClick={() => navigate('/Project')}>Back to List</Button>
                    </Space>
                </Space>
            </Card>
        </div>
    );
}

export default ProjectView;