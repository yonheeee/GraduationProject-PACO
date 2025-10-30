
import { useNavigate } from 'react-router-dom';
import CarIcon from '../common/CarIcon';
import googleIcon from '../../images/login/google.svg';
import kakaoIcon from '../../images/login/kakao.svg';
import naverIcon from '../../images/login/naver.svg';
import '../../css/login/First.css';

const First = () => {
  const navigate = useNavigate();

  return (
    <div className="first-container">
    
    <CarIcon color="#003FBF" />
      <div className="first-header">
        <div className="first-slogan">
          <div className="first-slogan-line1">복잡한 주차,</div>
          <div className="first-slogan-line2">이제 PACO로 끝.</div>
        </div>
      </div>

      <div className="first-middle" />

      <div className="first-bottom">
        
        <div className="first-signup-container">
          <button className="first-login-button"
          onClick={()=>navigate("/signin")}
          >
            로그인</button>

          <button className="first-signup-button"
          onClick={()=>navigate("/signup")}
          >
            회원가입</button>
        </div>
        
        <div
          className="first-browse-text"
          role="button"
          tabIndex={0}
          onClick={() => navigate('/main')}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/main'); }}
          style={{ cursor: 'pointer' }}
        >
          회원가입 없이 둘러보기
        </div>

        <div className="first-social-separator">
          <div className="first-separator-line" />
          <div className="first-separator-text">sns 계정으로 로그인</div>
          <div className="first-separator-line" />
        </div>

        <div className="first-social-icons">
          <img src={kakaoIcon} alt="Kakao" className="first-icon-image" />
          <img src={naverIcon} alt="Naver" className="first-icon-image" />
          <img src={googleIcon} alt="Google" className="first-icon-image" />
        </div>
      </div>
    </div>
  );
};

export default First;
