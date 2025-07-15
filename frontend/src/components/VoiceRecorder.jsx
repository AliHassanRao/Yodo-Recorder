import React, { useState, useRef, useEffect } from 'react';
import api from '../api';
import { Typography, Button, List, Space, Divider, message } from 'antd';

const { Title, Text } = Typography;

const VoiceRecorder = () => {
  const [recordings, setRecordings] = useState([]);
  const mediaRef = useRef(null);
  let mediaRecorder = null;
  const chunks = [];

  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    try {
      const res = await api.get('/recordings');
      setRecordings(res.data.recordings);
    } catch (err) {
      message.error('Failed to load recordings');
    }
  };

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRef.current.srcObject = stream;
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = e => chunks.push(e.data);
      mediaRecorder.onstop = upload;
      mediaRecorder.start();
      message.success('Recording started');
    } catch (err) {
      message.error('Could not access microphone');
    }
  };

  const stop = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRef.current.srcObject.getTracks().forEach(t => t.stop());
      message.success('Recording stopped');
    }
  };

  const upload = async () => {
    const blob = new Blob(chunks, { type: 'audio/webm' });
    const form = new FormData();
    form.append('audio', blob, 'recording.webm');
    try {
      await api.post('/recordings', form);
      chunks.length = 0;
      loadRecordings();
      message.success('Recording uploaded');
    } catch (err) {
      message.error('Upload failed');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Voice Recorder</Title>
      <audio ref={mediaRef} controls hidden />

      <Space style={{ marginBottom: '16px' }}>
        <Button type="primary" onClick={start}>
          Start Recording
        </Button>
        <Button danger onClick={stop}>
          Stop Recording
        </Button>
      </Space>

      <Divider />

      <Title level={4}>Previous Recordings</Title>
      <List
        bordered
        dataSource={recordings}
        locale={{ emptyText: 'No recordings yet' }}
        renderItem={r => (
          <List.Item key={r._id}>
            <Space direction="vertical">
              <audio controls src={`http://localhost:5000/api/recordings/${r._id}`} />
              <Text type="secondary">{new Date(r.createdAt).toLocaleString()}</Text>
            </Space>
          </List.Item>
        )}
      />
    </div>
  );
};

export default VoiceRecorder;
