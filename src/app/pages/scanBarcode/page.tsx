'use client';

import { ChangeEvent, useState } from 'react';

import Image from 'next/image';
import { Col, Row, Button, Input, Typography } from 'antd';
import { useRouter } from 'next/navigation';

import { ArrowLeftOutlined } from '@ant-design/icons';

import flag from '../../assets/flag.png';
import flag1 from '../../assets/flag1.png';
import useAppContext from '../../contexts/AppContext';

const LanguagePage = () => {
    const router = useRouter();
    const language = sessionStorage.getItem('block-vote-language');
    const [nicNumber, setNicNumber] = useState<string>('');
    const [allowContinue, setAllowContinue] = useState<boolean>(false);
    const [allowToContiue, setAllowToContinue] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { Text } = Typography;
    const { eligible, isLoading, setNic, votes } = useAppContext();

    const changeInput = (nic: ChangeEvent<HTMLInputElement>) => {
        setNicNumber(nic.target.value);

        if (nic.target.value.length >= 10 && nic.target.value.length <= 13) {
            setAllowContinue(true);
        } else {
            setAllowContinue(false);
        }
    };

    const continueToNext = () => {
        setLoading(true);
        setError('');
        setNic(nicNumber);
        setLoading(false);
    };

    return (
        <main
            className="flex min-h-screen flex-col items-center justify-between p-24 test"
            style={{ marginLeft: '70px', marginTop: '30px', marginRight: '70px' }}
        >
            <Row className="text-center">
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

            <Row className="relative flex place-items-center mt-28" style={{ textAlign: 'center' }}>
                {error.length > 1 && (
                    <Col span={24}>
                        <Typography.Title className="mt-4 heading text-center" level={1} type="danger">
                            {error}
                        </Typography.Title>
                    </Col>
                )}
                <Col span={24}>
                    <p className="mt-4 subHeading text-center" style={{ fontSize: '32px', marginTop: '8%' }}>
                        {(language === 'en' && 'Please enter your NIC number.') ||
                            (language === 'ta' && 'உங்கள் NIC எண்ணை உள்ளிடவும்.') ||
                            (language === 'si' && 'කරුණාකර ඔබගේ ජාතික හැඳුනුම්පත් අංකය ඇතුලත් කරන්න.')}
                    </p>
                </Col>
                <Col span={24} style={{ textAlign: 'center', marginTop: '5%' }}>
                    <Input
                        placeholder={
                            (language === 'en' && 'Please enter your NIC number') ||
                            (language === 'ta' && 'உங்கள் NIC எண்ணை உள்ளிடவும்') ||
                            (language === 'si' && 'කරුණාකර ඔබගේ ජාතික හැඳුනුම්පත් අංකය ඇතුලත් කරන්න') ||
                            ''
                        }
                        value={nicNumber}
                        onChange={(nic) => {
                            changeInput(nic);
                        }}
                        maxLength={13}
                        style={{ textAlign: 'center' }}
                    />
                </Col>
                <Col span={24} style={{ textAlign: 'center', marginTop: '5%' }}>
                    <Button
                        className="ant-btn-outline-white"
                        size="large"
                        onClick={() => continueToNext()}
                        disabled={!allowContinue || isLoading}
                        loading={loading}
                    >
                        {(language === 'en' && 'Confirm') ||
                            (language === 'ta' && 'உறுதிப்படுத்தவும்') ||
                            (language === 'si' && 'තහවුරු කරන්න')}
                    </Button>
                </Col>
            </Row>

            <Row style={{ marginTop: '10%' }}>
                <Button
                    className="backBtn"
                    size="large"
                    type="dashed"
                    icon={<ArrowLeftOutlined rev="" />}
                    onClick={() => {
                        router.push('/pages/language');
                    }}
                >
                    {(language === 'en' && 'Back') ||
                        (language === 'ta' && 'மீண்டும்') ||
                        (language === 'si' && 'ආපසු')}
                </Button>
            </Row>
        </main>
    );
};

export default LanguagePage;
