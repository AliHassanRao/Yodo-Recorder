import React, { useRef, useState } from 'react';
import axios from 'axios';
import { FaPause, FaStop, FaSync } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import Header from './Header';

const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [timer, setTimer] = useState(0);
    const timerRef = useRef(null);
   const navigate = useNavigate();
    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.start();

        recorder.ondataavailable = (e) => {
            setAudioChunks((prev) => [...prev, e.data]);
        };

        timerRef.current = setInterval(() => setTimer((prev) => prev + 1), 1000);
        setIsRecording(true);
    };

    const stopRecording = async () => {
        mediaRecorder.stop();
        clearInterval(timerRef.current);

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.webm');
            formData.append('duration', `${Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)}`);

            await axios.post('http://localhost:5000/api/audio/upload', formData);
            setAudioChunks([]);
            setTimer(0);
        };

        setIsRecording(false);
    };

    return (
        <>
          <Header />
        <div className="bg-blue-100 p-8 rounded-md text-center">
            <h3 className="text-sm">Recording for: <a href="#" className="underline">Voice recorder multiple</a></h3>
            <p className="text-gray-600 mt-2">Recording in progress...</p>
            <p className="font-bold my-3">{new Date(timer * 1000).toISOString().substr(14, 5)}</p>
            <div className="flex items-center justify-center gap-4">
                <button 
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`rounded-full p-4 ${isRecording ? 'bg-red-500' : 'bg-green-500'} text-white`}
                >
                    {isRecording ? <FaStop /> : 'Rec'}
                </button>
                <button 
                    onClick={() => clearInterval(timerRef.current)} 
                    disabled={!isRecording}
                    className="bg-gray-800 text-white p-4 rounded-full"
                >
                    <FaPause />
                </button>
                <button className="bg-gray-800 text-white p-4 rounded-full">
                    <FaSync />
                </button>
            </div>
             <button
                onClick={() => navigate("/audio/merger")}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Merger Voice
            </button>
        </div>
        </>
        
    );
};

export default AudioRecorder;
