import { Button, DatePicker, Form, message } from "antd";
import { useState } from "react";
import { downloadProjectByDataRange } from "./ProjectApiCalls";

const { RangePicker } = DatePicker;

const ProjectDownloadingForm = () => {
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        if (!values.dates) {
            message.error("Please select a date range");
            return;
        }
        const [startDate, endDate] = values.dates;
        const formattedStartDate = startDate.format("YYYY-MM-DDTHH:mm:ss");
        const formattedEndDate = endDate.format("YYYY-MM-DDTHH:mm:ss");
        console.log("start", formattedStartDate);
        console.log("end", formattedEndDate);
        downloadProjectByDataRange(formattedStartDate, formattedEndDate);

    }
    return (
        <Form onFinish={onFinish} layout="inline">
            <Form.Item name="dates" label="Date Range">
                <RangePicker format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Download Projects
                </Button>
            </Form.Item>
        </Form>
    );
}
export default ProjectDownloadingForm;