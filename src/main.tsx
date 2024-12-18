import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {Provider} from "react-redux";
import store from "./store/store.tsx";
import {ConfigProvider} from "antd";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ConfigProvider theme={{token: {colorPrimary: '#4f46e5'}}}>
                <App/>
            </ConfigProvider>
        </Provider>
    </StrictMode>
);
