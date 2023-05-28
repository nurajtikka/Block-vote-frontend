'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import { Col, Row, Space, Button } from 'antd';

import { ArrowLeftOutlined } from '@ant-design/icons';

import flag from '../../assets/election.png';
import test1 from '../../assets/test1.jpeg';
import test2 from '../../assets/test2.png';
import test3 from '../../assets/test3.png';
import test4 from '../../assets/test4.png';
import useAppContext from '../../contexts/AppContext';

interface ImageButtonProps {
    imageName: StaticImageData;
    buttonName: string;
    onClick: () => void;
    isClicked: boolean;
}

const ImageButton = ({ buttonName, imageName, isClicked, onClick }: ImageButtonProps) => (
    <Col span={6}>
        <Button className={`button ${isClicked ? 'clicked' : ''}`} onClick={onClick}>
            <Image
                src={imageName}
                alt={buttonName}
                className=""
                width={120}
                priority
                style={{ marginLeft: '20px', margin: '15px' }}
            />
        </Button>
    </Col>
);

const SelectParty = () => {
    const [clickedButton, setClickedButton] = useState<string | null>(null);
    const router = useRouter();
    const { setSelectedParty } = useAppContext();
    const handleButtonClick = (partyName: string) => {
        setSelectedParty(partyName);
        router.push('/pages/confirm');
    };

    return (
        <main
            className="flex min-h-screen flex-col items-center justify-between p-24 test"
            style={{ marginLeft: '70px', marginTop: '30px', marginRight: '70px' }}
        >
            <Row>
                <Image src={flag} alt="flag" className="" width={400} priority />
            </Row>
            <Row style={{ textAlign: 'center', marginTop: '5%' }}>
                <ImageButton
                    imageName={test1}
                    buttonName="SLPP"
                    onClick={() => handleButtonClick('SLPP')}
                    isClicked={clickedButton === 'SLPP'}
                />
                <ImageButton
                    imageName={test2}
                    buttonName="UNP"
                    onClick={() => handleButtonClick('UNP')}
                    isClicked={clickedButton === 'UNP'}
                />
                <ImageButton
                    imageName={test3}
                    buttonName="JJB"
                    onClick={() => handleButtonClick('JJB')}
                    isClicked={clickedButton === 'JJB'}
                />
                <ImageButton
                    imageName={test4}
                    buttonName="SJB"
                    onClick={() => handleButtonClick('SJB')}
                    isClicked={clickedButton === 'SJB'}
                />
            </Row>
            <Row style={{ marginTop: '10%' }}>
                <Button
                    className="backBtn"
                    size="large"
                    type="dashed"
                    onClick={() => router.push('/pages/scanBarcode')}
                    icon={<ArrowLeftOutlined rev="" />}
                >
                    {(sessionStorage.getItem('block-vote-language') === 'en' && 'Back') ||
                        (sessionStorage.getItem('block-vote-language') === 'ta' && 'மீண்டும்') ||
                        (sessionStorage.getItem('block-vote-language') === 'si' && 'ආපසු')}
                </Button>
            </Row>
        </main>
    );
};

export default SelectParty;
