import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SideBar.module.scss';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import NewsList from './../../MainLayoutCart/NewsList/index';
import { Outlet } from 'react-router-dom';
const cx = classNames.bind(styles);

function SideBarNews() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner-News')}>
                <aside className={cx('search', 'widget')}>
                    <input type="search" placeholder="Tìm kiếm..." />
                    <button type="submit">
                        <FontAwesomeIcon className={cx('icon-search')} icon={faMagnifyingGlass} />
                    </button>
                </aside>
                <aside className={cx('news-list', 'widget', 'widget-bd')}>
                    <div className={cx('widget-title')}>Bài viết mới</div>
                    <div className={cx('is-divider')}></div>
                    <NewsList />
                </aside>
            </div>
        </div>
    );
}

export default SideBarNews;
