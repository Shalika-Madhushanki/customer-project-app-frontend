import React from 'react';
import { Button, DatePicker, Form, message } from 'antd';

import { downloadProjectByDataRange } from '../services/projectService';

const { RangePicker } = DatePicker;

const ProjectDownloadingFormView = () => {

    const onFinish = async (values) => {
        if (!values.dates) {
            message.error("Please select a date range");
            return;
        }
        const [startDate, endDate] = values.dates;
        const formattedStartDate = startDate.format("YYYY-MM-DDTHH:mm:ss");
        const formattedEndDate = endDate.format("YYYY-MM-DDTHH:mm:ss");
        downloadProjectByDataRange(formattedStartDate, formattedEndDate);
    }

    return (
        <Form onFinish={onFinish} layout="inline">
            <Form.Item name="dates" label="Date Range">
                <RangePicker format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Download Projects
                </Button>
            </Form.Item>
        </Form>
    );
}
export default ProjectDownloadingFormView;