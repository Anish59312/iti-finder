import {React} from 'react';

export function CopyrightFooter() {
    return (
        <footer
            style={{
            textAlign: 'center',
            padding: '10px',
            background: '#f8f9fa'
        }}>
            <p>&copy; {new Date().getFullYear()}
                Your Company Name. All rights reserved.</p>
        </footer>
    );
};

export function ContactFooter() {
    return (
        <footer
            style={{
            textAlign: 'center',
            padding: '20px',
            background: '#e9ecef'
        }}>
            <p>
                If you find any issues, please report them to us at{' '}
                <a href="mailto:youremail@example.com">youremail@example.com</a>.
            </p>
            <p>&copy; {new Date().getFullYear()}
                Your Company Name. All rights reserved.</p>
        </footer>
    );
};
