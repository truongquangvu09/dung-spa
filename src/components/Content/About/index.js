import { NavLink } from 'react-router-dom';
import './About.scss';
function About() {
    return (
        <div class="wrapper">
            <div style={{ paddingTop: '110px' }}>
                <div class="border-1">
                    <div class="view_content_border-1">
                        <p class="txt_gt_dichvu">CHÀO MỪNG ĐẾN VỚI DUNG SPA</p>
                        <h2 class="txt_gt1">
                            Chúng tôi là một phòng khám Spa và làm đẹp chuyên nghiệp ở trung tâm New York.
                        </h2>
                        <p class="txt_gt2">
                            Bạn có thể tham gia vào một liệu pháp nuôi dưỡng hoặc ngâm cả ngày các phương pháp trị liệu
                            bằng nước trị liệu mới nhất của chúng tôi và các phương pháp điều trị da mặt và cơ thể theo
                            định hướng kết quả.
                        </p>
                    </div>
                </div>
                <div class="xx">
                    <div class="is_divider2"></div>
                </div>
                <div class="border-2">
                    <div>
                        <img
                            class="img_tt"
                            src="https://mauweb.monamedia.net/luxuryspa/wp-content/uploads/2020/05/4-2.jpg"
                        />
                    </div>
                </div>
                <div class="border-3">
                    <div class="w_tieude">
                        <h2 class="txt_tieude">Một nhóm các bác sĩ truyền cảm hứng,</h2>
                        <h2 class="txt_tieude">Bác sĩ trị liệu + thẩm mỹ</h2>
                    </div>
                    <div class="childBo3der3">
                        <div class="w_liststieude">
                            <div class="box">
                                <div>
                                    <img class="img_list" src="https://source.unsplash.com/1000x800" />
                                </div>

                                <div class="w_txtLists">
                                    <h3>Alice Bohn</h3>
                                    <h3>SPA MASTER</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis
                                        semper tortor.
                                    </p>
                                </div>
                            </div>
                            <div class="box">
                                <div>
                                    <img class="img_list" src="https://source.unsplash.com/1000x800" />
                                </div>

                                <div class="w_txtLists">
                                    <h3>Alice Bohn</h3>
                                    <h3>SPA MASTER</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis
                                        semper tortor.
                                    </p>
                                </div>
                            </div>
                            <div class="box">
                                <div>
                                    <img class="img_list" src="https://source.unsplash.com/1000x800" />
                                </div>

                                <div class="w_txtLists">
                                    <h3>Alice Bohn</h3>
                                    <h3>SPA MASTER</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis
                                        semper tortor.
                                    </p>
                                </div>
                            </div>
                            <div class="box">
                                <div>
                                    <img class="img_list" src="https://source.unsplash.com/1000x800" />
                                </div>

                                <div class="w_txtLists">
                                    <h3>Alice Bohn</h3>
                                    <h3>SPA MASTER</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis
                                        semper tortor.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div class="border-4"> */}
                <div class="wrap_banner2">
                    <div class="wrap_img_banner2">
                        <img class="img_list" src={require('../../../assets/img/img_title_homepage.jpeg')} />
                    </div>
                    <div class="wrap_txt_banner2">
                        <div>
                            <p>CHÀO MỪNG ĐẾN VỚI LUXURY SPA</p>
                            <h2 class="txt_banner2">Muốn làm việc với chúng tôi không?</h2>
                            <NavLink to="/Booking">
                                <button class="btn_banner2">
                                    <p class="txt3_banner2">ĐẶT NGAY</p>
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </div>
    );
}

export default About;
