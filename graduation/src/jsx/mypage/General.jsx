import React, { useState } from 'react';

const General = () => {
    const [isAlertOn, setIsAlertOn] = useState(true);

    return (
        <div className="tab-pane">
            <div className="setting-item">
                <span>앱 푸시 알림</span>
                <label className="toggle-switch">
                    <input type="checkbox" checked={isAlertOn} onChange={() => setIsAlertOn(!isAlertOn)} />
                    <span className="slider"></span>
                </label>
            </div>
        </div>
    );
};

export default General;