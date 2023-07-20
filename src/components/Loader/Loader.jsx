import { Spinner } from 'react-bootstrap';

function Loader() {
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-30 w-screen h-screen backdrop-filter backdrop-blur-sm z-1100'>
            <Spinner
                animation="border"
                style={{
                    width: '4rem',
                    height: '4rem',
                }}
                className='block absolute top-1/2 left-1/2 -mt-8 -ml-8 text-primary'
                role="status"
            />
        </div>
    );
}

export default Loader;
