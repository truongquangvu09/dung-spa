import React from 'react';
import classNames from 'classnames/bind';
import styles from './MainLayoutNews.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Outlet } from 'react-router-dom';
import NewsList from '../MainLayoutCart/NewsList';
const cx = classNames.bind(styles);

function MainLayoutNews() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h2>TIN TỨC</h2>
                <div className={cx('category-news')}>
                    <div className={cx('sidebar-news')}>
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
                    <div className={cx('content')}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainLayoutNews;
