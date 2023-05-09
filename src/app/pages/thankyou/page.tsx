"use client";
import Image from "next/image";
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
     <Row className="text-center" style={{ marginBottom: '13%' }}>
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
          Contratulations! You have successfully submmited your vote.
        </p>
      </div>
    </div>



    <div style={{ textAlign: "center", marginTop: "5%" }}>
    <div>
        <p
          className="mt-4 subHeading text-center"
          style={{ fontSize: "32px", color: "black", marginBottom: "25px" }}
        >
          Thank you!
        </p>
      </div>
    </div>
  </main>
);
    }
export default ConfirmPage;
