'use client';

import { useRouter } from 'next/navigation';

const Profile = () => {
    const router = useRouter();
    router.push('/pages/welcome');
};

export default Profile;
