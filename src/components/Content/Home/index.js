import React from 'react';
import styles from './HomeContent.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { listItemMenuHomePage } from '../../../data/data';
const cx = classNames.bind(styles);

function HomeContent() {
    return (
        <div className={'wrapper'}>
            <div className={cx('wrap_imgTT_home')}>
                <div className={cx('bgr_imgTT')}></div>
                <div className={cx('wrap_imgTT')}>
                    <div>
                        <img className={cx('imgTT')} src={require('../../../assets/img/img_title_homepage.jpeg')} />
                    </div>
                    <div className={cx('txt_inner_imgTT')}>
                        <p className={cx('txt_intro')}>Chào mừng đến với Dung Spa</p>
                        <h3 className={cx('txt_intro1')}>
                            Tất cả các loại trị liệu spa & làm đẹp cho cơ thể và tâm hồn của bạn
                        </h3>
                        <NavLink to="/Booking">
                            <button className={cx('btn_banner2')}>
                                <p className={cx('txt3_banner2')}>KHÁM PHÁ NGAY</p>
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className={cx('wrap_intro')}>
                <div className={cx('wrapper_info_txt')}>
                    <p className={cx('info_text')}>CHÀO MỪNG ĐẾN VỚI DUNG SPA</p>
                    <h2 className={cx('info_text_1')}>
                        Phục hồi tinh thần, cơ thể và tinh thần của bạn với các liệu pháp Dung Spa
                    </h2>
                    <p className={cx('info_text_2')}>
                        Rõ ràng chúng ta đã đạt đến một độ cao tuyệt vời trong bầu khí quyển, vì bầu trời là một màu đen
                        chết chóc và những ngôi sao đã ngừng lấp lánh.
                    </p>
                    <NavLink to="/Introduce">
                        <button className={cx('cusbtn_toAbout')}>
                            <p className={cx('xx')}>THÊM VỀ CHÚNG TÔI</p>
                        </button>
                    </NavLink>
                </div>
            </div>
            <div className={cx('wrap_menu')}>
                <div className={cx('wrap_content_menu')}>
                    <div className={cx('title_menu')}>
                        <div className={cx('text_tt_menu')}>
                            <p className={cx('txt_menu')}>
                                Trải nghiệm một thực đơn phong phú của cả phương pháp điều trị hiện đại và vượt thời
                                gian:
                            </p>
                        </div>
                        <div className={cx('btn_tt_menu')}>
                            <NavLink to="/Services">
                                <button className={cx('btn_menu')}>
                                    <p className={cx('txt_btn_menu')}>MENU SPA CỦA CHÚNG TÔI</p>
                                </button>
                            </NavLink>
                        </div>
                    </div>
                    <div className={cx('list_menu')}>
                        {listItemMenuHomePage.map((e, index) => (
                            <div className={cx('item_menu')}>
                                <div className={cx('w_img')}>
                                    <img className={cx('imgTT')} src={e.img} />
                                </div>
                                <div className={cx('title_of_imgitemmenu')}>
                                    <p className={cx('txt_imgitemmenu')}>{e.nameItem}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={cx('wrap_banner')}>
                <div className={cx('wrap_txt_banner')}>
                    <div className={cx('txt_inner_banner')}>
                        <>
                            <h2 className={cx('txt_banner1')}>Sang trọng, chất lượng & tiện nghi</h2>
                            <h4 className={cx('txt1_banner1')}>DỊCH VỤ PREMIUM DUNG SPA</h4>
                            <p className={cx('txt2_banner1')}>
                                Rõ ràng chúng ta đã đạt đến một độ cao tuyệt vời trong bầu khí quyển, vì bầu trời là một
                                màu đen chết chóc và những ngôi sao đã ngừng lấp lánh.
                            </p>
                            <NavLink to="/Introduce">
                                <button className={cx('btn_banner1')}>
                                    <p className={cx('txt3_banner1')}>XEM TIỆN NGHI</p>
                                </button>
                            </NavLink>
                        </>
                    </div>
                </div>
                <div className={cx('wrap_img_banner')}>
                    <img className={cx('imgTT')} src={require('../../../assets/img/banner_1.jpeg')} />
                </div>
            </div>
            <div className={cx('wrap_banner2')}>
                <div className={cx('wrap_img_banner2')}>
                    <img className={cx('imgTT')} src={require('../../../assets/img/banner_2.jpeg')} />
                </div>
                <div className={cx('wrap_txt_banner2')}>
                    <div>
                        <p>Phiếu quà tặng Spa cao cấp</p>
                        <h2 className={cx('txt_banner2')}>QUÀ TẶNG HOÀN HẢO CHO MỘT SỐ ĐẶC BIỆT!</h2>
                        <NavLink to="/Shop">
                            <button className={cx('btn_banner2')}>
                                <p className={cx('txt3_banner2')}>KHÁM PHÁ NGAY</p>
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeContent;
