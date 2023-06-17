import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector(state => state.notification);

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        color: notification === null ? 'transparent' : notification.border
      };

      console.log(notification);

    if(notification !== null){
        return (
            <div style={style}>
                {notification.title}
            </div>
        );
    }
};

export default Notification;