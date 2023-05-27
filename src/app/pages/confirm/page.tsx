'use client';

import Image from 'next/image';
import { Space, Button, Row, Col } from 'antd';
import { useRouter } from 'next/navigation';

import test1 from '../../assets/test1.jpeg';
import test2 from '../../assets/test2.png';
import test3 from '../../assets/test3.png';
import test4 from '../../assets/test4.png';
import flag from '../../assets/flag.png';
import flag1 from '../../assets/flag1.png';

const ConfirmPage = () => {
    const router = useRouter();
    const vote = sessionStorage.getItem('block-vote-party-voted');
    const language = sessionStorage.getItem('block-vote-language');
    return (
        <main
            className="flex min-h-screen flex-col items-center justify-between p-24 test"
            style={{ marginLeft: '70px', marginTop: '30px', marginRight: '70px' }}
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
            <div className="relative flex place-items-center mt-28" style={{ textAlign: 'center' }}>
                <div>
                    <p
                        className="mt-4 subHeading text-center"
                        style={{ fontSize: '32px', color: 'black', marginBottom: '25px' }}
                    >
                        {(language === 'en' && 'Please confirm that you have chosen') ||
                            (language === 'si' && 'කරුණාකර ඔබ තෝරාගත් බව තහවුරු කරන්න') ||
                            (language === 'ta' && 'நீங்கள் தேர்ந்தெடுத்துள்ளீர்கள் என்பதை உறுதிப்படுத்தவும்')}
                    </p>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-block' }}>
                    <Image
                        src={
                            (vote === 'slpp' && test1) ||
                            (vote === 'unp' && test2) ||
                            (vote === 'jjb' && test3) ||
                            (vote === 'sjb' && test4) ||
                            ''
                        }
                        alt="flag"
                        width={100}
                        priority
                    />
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '5%' }}>
                <Space wrap>
                    <Button
                        className="ant-btn-outline-white"
                        size="large"
                        onClick={() => router.push('/pages/thankyou')}
                    >
                        {(language === 'en' && 'Confirm') ||
                            (language === 'si' && 'තහවුරු කරන්න') ||
                            (language === 'ta' && 'உறுதிப்படுத்தவும்')}
                    </Button>
                    <Button
                        type="default"
                        size="large"
                        className="ant-btn-outline-white"
                        onClick={() => router.push('/pages/select')}
                    >
                        {(language === 'en' && 'Back') ||
                            (language === 'si' && 'ආපසු') ||
                            (language === 'ta' && 'பின்செல்')}
                    </Button>
                </Space>
            </div>
        </main>
    );
};
export default ConfirmPage;
