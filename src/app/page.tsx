'use client';

import { useRouter } from "next/navigation";

import Button from '../components/Button';

const Profile = () => {
    const router = useRouter()
    router.push('/pages/welcome');
}

export default Profile;
