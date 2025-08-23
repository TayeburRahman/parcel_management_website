"use client"

import './globals.css'; 
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body className='container mx-auto max-w-[1920px]'>
        <Provider store={store}>
          {/* <PrivateRoute> */}
            <NextTopLoader
              color="#00B047"
              height={2}
              showSpinner={false}
            />
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
            {children}
          {/* </PrivateRoute> */}
        </Provider>
      </body>
    </html >
  );
}