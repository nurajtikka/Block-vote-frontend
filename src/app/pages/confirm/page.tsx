"use client";
import Image from "next/image";
import test1 from '../../assets/test1.jpeg';
import test2 from '../../assets/test2.png';
import test3 from '../../assets/test3.png';
import test4 from '../../assets/test4.png';
import flag from "../../assets/flag.png";
import flag1 from "../../assets/flag1.png";
import { Space, Button, Row, Col } from "antd";
import { useRouter } from 'next/navigation';

const ConfirmPage = () => {
    const router = useRouter();
    return (
    <main
    className="flex min-h-screen flex-col items-center justify-between p-24 test"
    style={{ marginLeft: "70px", marginTop: "30px", marginRight: "70px" }}
  >
     <Row className="text-center" style={{ marginBottom: '11   %' }}>
                <Col span={12} style={{ textAlign: 'left' }}>
                    {' '}
                    <Image src={flag} alt="flag" className="" width={200} priority />
                </Col>
                <Col span={12}>
                    {' '}
                    <Image
                        style={{ float: 'right', marginRight: '70px' }}
                        src={flag1}
                        alt="flag"
                        className=""
                        width={100}
                        priority
                    />
                </Col>
            </Row>
    <div
      className="relative flex place-items-center mt-28"
      style={{ textAlign: "center" }}
    >
      <div>
        <p
          className="mt-4 subHeading text-center"
          style={{ fontSize: "32px", color: "black", marginBottom: "25px" }}
        >
          Please confirm that you have chosen
        </p>
      </div>
    </div>

    <div style={{ textAlign: "center" }}>
      <div style={{ display: "inline-block" }}>
        <Image src={test1} alt="flag" width={100} priority />
      </div>
    </div>

    <div style={{ textAlign: "center", marginTop: "5%" }}>
      <Space wrap>
        <Button className="ant-btn-outline-white" size="large" onClick={()=> router.push('/pages/thankyou')}>
          Confirm
        </Button>
        <Button type="default" size="large" className="ant-btn-outline-white" onClick={()=> router.push('/pages/select')}>
          Cancel
        </Button>
      </Space>
    </div>
  </main>
);
    }
export default ConfirmPage;
