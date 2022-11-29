import classNames from 'classnames/bind';
import styles from './ContentServicePage.module.scss';
import { Divider } from '@mui/material';
import { Link, Outlet, NavLink } from 'react-router-dom';
import Context from '@mui/base/TabsUnstyled/TabsContext';

const cx = classNames.bind(styles);
const ListService = [
    {
        name: 'Bấm huyệt',
        descrip:
            'Kích thích sự chuyển động của năng lượng bằng cách tạo áp lực lên các điểm trên bàn chân, bàn tay và đầu của bạn. Hoàn hảo để khôi phục lại sự cân bằng và giảm căng thẳng.',
    },
    {
        name: 'Gói cơ thể',
        descrip:
            'Wraps có mục đích làm săn chắc và làm săn chắc da đồng thời giúp cơ thể đốt cháy chất béo. Các thuật ngữ phổ biến khác bao gồm quấn đường viền cơ thể hoặc bọc spa.',
    },
    {
        name: 'Phương pháp điều trị',
        descrip:
            'Chất làm đầy dạng tiêm đã cung cấp một giải pháp cho bệnh nhân để trẻ hóa diện mạo khuôn mặt mà không cần rạch và thời gian chết tối thiểu',
    },
    {
        name: 'Điều trị da mặt',
        descrip:
            'Điều trị da mặt cung cấp một kinh nghiệm cao với kết quả đáng chú ý. Điều trị da mặt này cung cấp một hiệu quả thanh lọc và sửa chữa chuyên sâu.',
    },
];
function ContentServicePage() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper_title_img')}>
                <img
                    className={cx('title_img')}
                    src="http://mauweb.monamedia.net/luxuryspa/wp-content/uploads/2020/05/1-1.jpg"
                />
                <h2 className={cx('title_text')}>DỊCH VỤ</h2>
            </div>
            <div className={cx('wrapper_info')}>
                <div className={cx('wrapper_info_txt')}>
                    <p className={cx('info_text')}>CHÀO MỪNG ĐẾN VỚI DUNG SPA</p>
                    <h2 className={cx('info_text_1')}>
                        Chúng tôi là một phòng khám Spa và làm đẹp chuyên nghiệp ở trung tâm New York.
                    </h2>
                    <p className={cx('info_text_2')}>
                        Bạn có thể tham gia vào một liệu pháp nuôi dưỡng hoặc ngâm cả ngày các phương pháp trị liệu bằng
                        nước trị liệu mới nhất của chúng tôi và các phương pháp điều trị da mặt và cơ thể theo định
                        hướng kết quả.
                    </p>
                </div>
            </div>
            <div className={cx('wrapper_list_service')}>
                <div className={cx('is_divider')}></div>
                <div className={cx('col_inner_text_center')}>
                    {ListService.map((e, index) => (
                        <div className={cx('col_inner_div')}>
                            <div className={cx('txt-cmsmasters')}>
                                <NavLink className={cx('cmsmasters_heading')} to="/Booking">
                                    <h2 className={cx('cmsmasters_heading')}>{e.name}</h2>
                                </NavLink>
                            </div>
                            <div className={cx('cmsmasters_text')}>
                                <p>{e.descrip}</p>
                                <p className={cx('txt_price')}>
                                    30 / 60 / 90 PHÚT <span className={cx('txt_price_black')}> $65 / 80 / 100</span>
                                </p>
                            </div>
                            <div className={cx('xx')}>
                                <div className={cx('is_divider2')}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('banner_toShop')}>
                <div className={cx('wrap_txt_bannerShop')}>
                    <div className={cx('wrap_innerbannerShop')}>
                        {/*  */}
                        <div className={cx('col_inner_textcenter')}>
                            <div className={cx('cmsmasters_pricing_item_inner')}>
                                <h3 className={cx('pricing_title')}>MASSAGE</h3>
                                <div className={cx('cmsmasters_price_wrap')}>
                                    <span className={cx('cmsmasters_currency')}>$</span>
                                    <span className={cx('cmsmasters_price')}>69.99</span>
                                    <p className={cx('cmsmasters_period')}>Truyên thông</p>
                                    <p className={cx('cmsmasters_period')}>Đá nóng</p>
                                    <p className={cx('cmsmasters_period')}>Hoa oải hương</p>
                                </div>
                                <NavLink to="/Booking">
                                    <button className={cx('btn_buyService')}>
                                        <p className={cx('txt3_buyService')}>MUA</p>
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('img_bannerShop')}>
                    <img
                        className={cx('imgbanerShop')}
                        src="http://mauweb.monamedia.net/luxuryspa/wp-content/uploads/2020/05/2-1.jpg"
                    />
                </div>
            </div>
        </div>
    );
}

export default ContentServicePage;
