'use client';
import Image from 'next/image'
import flag from '../../assets/flag.png';
import flag1 from '../../assets/flag1.png';
import { Col, Row, Space, Button } from 'antd';

const WelcomePage = () => (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 test" style={{ marginLeft: '70px', marginTop: '30px', marginRight: "70px" }}>
        <Row className='text-center'>
            <Col span={12} style={{ textAlign: 'left' }}> <Image
                src={flag}
                alt="flag"
                className=""
                width={200}
                priority
            /></Col>
            <Col span={12}>  <Image style={{ float: "right", marginRight: "70px" }}
                src={flag1}
                alt="flag"
                className=""
                width={100}
                priority
            /></Col>
        </Row>
        
        <div className="relative flex place-items-center mt-28" style={{ textAlign: "center" , marginTop: "7%"}}>
            <div>
                <p className='mt-4 subHeading text-center' style={{ fontSize: "32px", color: "black", marginBottom: "25px" }}>Welcome</p>
                <p className='mb-4 subHeading text-center' style={{ fontSize: "32px", color: "black", marginBottom: "25px" }}>ආයුබෝවන්</p>
                <p className='mb-4 subHeading text-center' style={{ fontSize: "32px", color: "black", marginBottom: "25px" }}>வரவேற்பு!</p>
            </div>

        </div>
    </main>
);

export default WelcomePage;
