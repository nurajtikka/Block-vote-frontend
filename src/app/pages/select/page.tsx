'use client';
import Image, { StaticImageData } from 'next/image';
import { Col, Row, Space, Button } from 'antd';
import { useState } from 'react';
import flag from '../../assets/election.png';
import test1 from '../../assets/test1.jpeg';
import test2 from '../../assets/test2.png';
import test3 from '../../assets/test3.png';
import test4 from '../../assets/test4.png';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface ImageButtonProps {
    imageName: StaticImageData;
    buttonName: string;
    onClick: () => void;
    isClicked: boolean;
}

const ImageButton = ({ imageName, buttonName, onClick, isClicked }: ImageButtonProps) => (
    <Col span={6}>
        <Button className={`button ${isClicked ? "clicked" : ""}`} onClick={onClick}>
            <Image
                src={imageName}
                alt={buttonName}
                className=""
                width={120}
                priority
                style={{ marginLeft: "20px", margin: "15px" }}
            />
        </Button>
    </Col>
);

const LanguagePage = () => {
    const [clickedButton, setClickedButton] = useState<string | null>(null);

    const handleButtonClick = (buttonName: string) => {
        if (buttonName === clickedButton) {
            setClickedButton(null);
        } else {
            setClickedButton(buttonName);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 test" style={{ marginLeft: '70px', marginTop: '30px', marginRight: "70px" }}>
            <Row>
                <Image
                    src={flag}
                    alt="flag"
                    className=""
                    width={400}
                    priority
                />
            </Row>
            <Row style={{textAlign: "center" , marginTop: "5%"}}>
                <ImageButton
                    imageName={test1}
                    buttonName="test1"
                    onClick={() => handleButtonClick("test1")}
                    isClicked={clickedButton === "test1"}
                />
                <ImageButton
                    imageName={test2}
                    buttonName="test2"
                    onClick={() => handleButtonClick("test2")}
                    isClicked={clickedButton === "test2"}
                />
                <ImageButton
                    imageName={test3}
                    buttonName="test3"
                    onClick={() => handleButtonClick("test3")}
                    isClicked={clickedButton === "test3"}
                />
                <ImageButton
                    imageName={test4}
                    buttonName="test4"
                    onClick={() => handleButtonClick("test4")}
                    isClicked={clickedButton === "test4"}
                />
            </Row>
            <Row style={{marginTop: "10%"}}>
                <Button className="backBtn" size='large' type="dashed" icon={<ArrowLeftOutlined />}>Back</Button>
        </Row>
        </main>
    );
};

export default LanguagePage;
