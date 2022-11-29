import React from 'react';
import classNames from 'classnames/bind';
import styles from './NewsDetail.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function NewDetail() {
    return (
        <div>
            <Link to="/Shop/Product_Detail">
                {' '}
                <a href="">bam vao day</a>
            </Link>
        </div>
    );
}

export default NewDetail;
