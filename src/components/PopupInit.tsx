import Popup from 'reactjs-popup'
import BorderGradient from './BorderGradient'
import { useState } from 'react';

const PopupInit = () => {
    const [isOpen, setIsOpen] = useState(true);
    return (

        <Popup open={isOpen} onClose={() => setIsOpen(false)} className="popup-init" position="right center">
            <BorderGradient active={true} borderRadius={24} borderWidth={2}>
                <div className="p-4">
                    <div
                    >
                        <h1 className="text-lg md:text-xl text-center text-gradient-secondary">
                            🎉 Chào mừng bạn đến với <span className="text-gradient-primary">Infiniacc</span>
                        </h1>
                        <h2 className="text-center text-sm md:text-base">
                            Sàn giao dịch acc game an toàn và tiện lợi nhất.
                        </h2>
                        <div className="mt-4">
                            <p className="text-gradient-primary  md:text-lg">
                                <span className="text-gradient-primary">🔥 ƯU ĐÃI ĐẶC BIỆT DÀNH RIÊNG CHO NGƯỜI DÙNG MỚI!</span>
                            </p>
                            <p className="text-sm md:text-base">
                                Từ <span className="text-gradient-secondary">1/1/2025</span> đến <span className="text-gradient-secondary">1/2/2025</span>, khi bạn{" "}
                                <span className="text-gradient-secondary">đăng nhập lần đầu</span>, chúng tôi sẽ tặng ngay
                                <span className="text-gradient-secondary"> 5 lượt đăng bài miễn phí</span> để bạn thỏa sức trao đổi, mua
                                bán acc game yêu thích!
                            </p>
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <p className="md:text-lg text-gradient-primary">
                                <span>💡 Cam kết của chúng tôi – Tiêu chí 3 KHÔNG:</span>
                            </p>
                            <ul style={{ listStyleType: "disc", marginLeft: 20 }} className='text-sm md:text-base'>
                                <li>
                                    ✅{" "}
                                    <span className="text-gradient-secondary">
                                        Không thu thập thông tin đăng nhập (tài khoản, mật khẩu acc game).
                                    </span>
                                </li>
                                <li >
                                    ✅ <span className="text-gradient-secondary">Không phí ẩn, không ràng buộc.</span>
                                </li>
                                <li>
                                    ✅{" "}
                                    <span className="text-gradient-secondary">
                                        Không gây phiền phức – Đăng bài dễ dàng, duyệt nhanh chóng.
                                    </span>
                                </li>
                            </ul>
                        </div>
                        {/* <div style={{ marginTop: 20 }}>
            <p className="text-gradient-secondary">
              <span>🎯 Đến với <span className="text-gradient-primary">Infiniacc</span>, bạn sẽ được:</span>
            </p>
            <ul style={{ listStyleType: "disc", marginLeft: 20 }}>
              <li>
                <span className="text-gradient-secondary">Đăng bài miễn phí:</span> Chỉ cần thông tin cơ bản về acc và
                phương thức liên hệ.
              </li>
              <li>
                <span className="text-gradient-secondary">Kết nối nhanh chóng:</span> Người mua dễ dàng tìm thấy acc phù
                hợp thông qua hệ thống tìm kiếm thông minh.
              </li>
              <li>
                <span className="text-gradient-secondary">An toàn, bảo mật:</span> Giao dịch chỉ giữa bạn và người
                mua/bán – chúng tôi không can thiệp vào quá trình trao đổi.
              </li>
            </ul>
          </div> */}
                        <div className="mt-4 md:text-lg text-center">
                            <p>
                                ⏳{" "}
                                <span className="text-gradient-secondary">Đừng bỏ lỡ cơ hội nhận ưu đãi cực chất từ <span className="text-gradient-primary">Infiniacc</span></span>
                            </p>

                        </div>
                    </div>
                    <div className='mt-4 flex justify-end'>
                        <button className='danger-btn' onClick={() => setIsOpen(false)}>Tắt thông báo</button>
                    </div>
                </div>
            </BorderGradient>
        </Popup>
    )
}

export default PopupInit