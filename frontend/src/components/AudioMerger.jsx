import { useState } from "react";
import { Upload, Button, Typography, Card, Space, message, Spin } from "antd";
import { UploadOutlined, SoundOutlined } from "@ant-design/icons";
import axios from "axios";
import Header from "./Header";

const { Title, Text } = Typography;

function AudioMerger() {
    const [voice, setVoice] = useState(null);
    const [bg, setBg] = useState(null);
    const [mergedUrl, setMergedUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (file, type) => {
        if (type === "voice") {
            setVoice(file);
        } else if (type === "bg") {
            setBg(file);
        }
        return false; // Prevent default upload behavior
    };

    const handleSubmit = async () => {
        if (!voice || !bg) {
            message.error("Please select both voice and background audio files.");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("voice", voice);
            formData.append("bg", bg);

            const res = await axios.post("http://localhost:5000/api/audio/merge", formData);
            setMergedUrl(`http://localhost:5000${res.data.file}`);
            message.success("Audio merged successfully!");
        } catch (error) {
            console.error(error);
            message.error("Failed to merge audio.");
        }
        setLoading(false);
    };

    return (
        <>
        <Header/>
        
         <div style={{ maxWidth: 500, margin: "64px auto", padding: 24 }}>
            <Card bordered style={{ borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                <Space direction="vertical" style={{ width: "100%" }} size="large">
                    <Title level={3} style={{ textAlign: "center" }}>
                        <SoundOutlined /> Audio Merger
                    </Title>

                    <Text strong>1️⃣ Select your audio files</Text>
                    <Upload
                        beforeUpload={(file) => handleFileChange(file, "voice")}
                        accept=".mp3,.wav,.ogg"
                        showUploadList={{ showRemoveIcon: false }}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Upload Voice Audio</Button>
                    </Upload>

                    <Upload
                        beforeUpload={(file) => handleFileChange(file, "bg")}
                        accept=".mp3,.wav,.ogg"
                        showUploadList={{ showRemoveIcon: false }}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Upload Background Audio</Button>
                    </Upload>

                    <Text strong>2️⃣ Sort your audio</Text>
                    <Text type="secondary">(Voice will play over background)</Text>

                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        block
                        disabled={loading}
                    >
                        {loading ? <Spin size="small" /> : "Merge Audio"}
                    </Button>

                    {mergedUrl && (
                        <div style={{ marginTop: 24, textAlign: "center" }}>
                            <Title level={4}>🔊 Merged Audio</Title>
                            <audio controls src={mergedUrl} style={{ width: "100%" }} />
                        </div>
                    )}
                </Space>
            </Card>
        </div>
        </>
       
    );
}

export default AudioMerger;
