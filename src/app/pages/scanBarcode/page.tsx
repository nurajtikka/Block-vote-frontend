'use client';
import Image from 'next/image'
import flag from '../../assets/flag.png';
import flag1 from '../../assets/flag1.png';
import { Col, Row, Tooltip, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const LanguagePage = () => {
    const router = useRouter();
    return(
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

        <div className="relative flex place-items-center mt-28" style={{ textAlign: "center" }}>
            <div>
                <p className='mt-4 subHeading text-center' style={{ fontSize: "32px", marginTop: "8%" }}>Please enter your NIC number.</p>
            </div>
            <div style={{ textAlign: "center", marginTop: "5%" }}>
                <Button className="ant-btn-outline-white" size='large' onClick={()=>{router.push('/pages/select')}}>Confirm</Button>
            </div>

        </div>

        <Row style={{marginTop: "10%"}}>
                <Button className="backBtn" size='large' type="dashed" icon={<ArrowLeftOutlined />}>Back</Button>
        </Row>



    </main>
    )}


export default LanguagePage;
