import majordom_img from '.././images/top_img.png';

function TopBanner(){
    return (
        <>
        <div className="container_dark_bg">
            <div className="container ">
            <div className="main_section">
                <div className="main_section-text">
                    <h1>Your Digital Majordomo</h1>
                    <p>designed to turn your living space into a smart and automated home.</p>
                    <a href="#" className="purple_btn">buy now</a>
                </div>
                <div className="main_section-image">
                    <img src={majordom_img} alt="majordom" />
                </div>
            </div>
            </div>
      </div>
      </>
    );
}

export default TopBanner;