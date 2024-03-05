import React, { useRef, useEffect, useState } from 'react';
import './Style.css';
import loadingImg from '../../Assets/loading.jpg';
export default function Loading(props) {
    return(<div className='LoadingContainer'>
        <img src={loadingImg} />
    </div>);
}