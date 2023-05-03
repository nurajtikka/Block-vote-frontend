'use client';

import Button from '../components/Button';

const Profile = (): JSX.Element => (
    <div className="globalPage">
        <h1>Page Title</h1>
        <Button>anji</Button>
        <Button active>Hello I am an active Button</Button>
        <div>hello</div>
    </div>
);

export default Profile;
