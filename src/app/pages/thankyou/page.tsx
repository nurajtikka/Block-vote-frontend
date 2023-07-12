'use client';

import Image from 'next/image';
import { Space, Button, Row, Col } from 'antd';
import { useRouter } from 'next/navigation';

import flag from '../../assets/flag.png';
import flag1 from '../../assets/flag1.png';

const ConfirmPage = () => {
    const router = useRouter();
    const language = sessionStorage.getItem('block-vote-language');
    return (
        <main
            className="flex min-h-screen flex-col items-center justify-between p-24 test"
            style={{ marginLeft: '70px', marginTop: '30px', marginRight: '70px' }}
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
            <div className="relative flex place-items-center mt-28" style={{ textAlign: 'center' }}>
                <div>
                    <p
                        className="mt-4 subHeading text-center"
                        style={{ fontSize: '32px', color: 'black', marginBottom: '25px' }}
                    >
                        {(language === 'en' && 'Congratulations! You have successfully submitted your vote.') ||
                            (language === 'si' && 'සුභ පැතුම්! ඔබ ඔබේ ඡන්දය සාර්ථකව ඉදිරිපත් කර ඇත.') ||
                            (language === 'ta' && 'வாழ்த்துகள்! உங்கள் வாக்கை வெற்றிகரமாகச் சமர்ப்பித்துவிட்டீர்கள்.')}
                    </p>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '5%' }}>
                <div>
                    <p
                        className="mt-4 subHeading text-center"
                        style={{ fontSize: '32px', color: 'black', marginBottom: '25px' }}
                    >
                        {(language === 'en' && 'Thank you!') ||
                            (language === 'si' && 'ස්තුතියි!') ||
                            (language === 'ta' && 'நன்றி!')}
                    </p>
                </div>
            </div>
        </main>
    );
};
export default ConfirmPage;
