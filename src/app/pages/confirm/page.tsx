'use client';
import Image from 'next/image'
import flag from '../../assets/flag.png';
import flag1 from '../../assets/flag1.png';
import { Col, Row, Space, Button } from 'antd';
import test1 from '../../assets/test1.jpeg';

const LanguagePage = () => (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 test" style={{ marginLeft: '70px', marginTop: '30px', marginRight: "70px" }}>

        <div className="relative flex place-items-center mt-28" style={{ textAlign: "center" , marginTop: "20%"}}>
            <div>
                <p className='mt-4 subHeading text-center' style={{ fontSize: "32px", color: "black", marginBottom: "25px" }}>Please select your language</p>
            </div>

        </div>

        <div style={{ textAlign: "center", marginTop:"7%" }}>
            <Space wrap>
                <Button className="ant-btn-outline-white" size='large'>Yes</Button>
                <Button type="default" size='large' className="ant-btn-outline-white">No</Button>
            </Space>
        </div>
    </main>
);

export default LanguagePage;
