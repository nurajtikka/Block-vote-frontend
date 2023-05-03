'use client';

// import { useQuery } from 'react-query';

// import { getApiInstance } from '.../core/api';
// import { REACT_QUERY_KEYS } from '.../core/constants/reactQueryKeys';

const Profile = (): JSX.Element => (
    // You'd likely use react-query for data
    // const { data: customerData } = useQuery(REACT_QUERY_KEYS.GET_CUSTOMER, () =>
    //     getApiInstance().customer.getCustomer({}),
    // );

    <div className="globalPage">
        <h1>Page Title</h1>
        {/* <p>{JSON.stringify(customerData)}</p> */}
        <button>Hello I am a normal Button</button>
        <button >Hello I am an active Button</button>
    </div>
);
export default Profile;
