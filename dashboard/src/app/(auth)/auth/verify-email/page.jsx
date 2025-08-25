'use client';

import React, { Suspense } from 'react';
const VerifyEmailForm = React.lazy(() => import('@/components/auth/VerifyEmailBox'));


const verifyEmail = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <VerifyEmailForm />
            </Suspense>
        </>
    );
};

export default verifyEmail;