import style from './style.module.css';

const ShowRoomNormal = () => {

    return (
        <div className={style.container}>
            <div className={style.img_container}>
                <img src='/imgs/kizi_company.jpg' />
            </div>
            
            <div className={style.title_container}>
                <div className={style.text}>Company Name:</div>
                <div className={style.title}>Yamazaki-velvet co., ltd</div>
            </div>

            <div className={style.main_info_container}>
                <div className={style.main_info_row}>
                    <div className={style.main_info_title_container}>専門:</div>
                    <div className={style.main_info_title_contents_container}><div className={style.main_info_text}>a</div></div>
                </div>
                <div className={style.main_info_row}>
                    <div className={style.main_info_half_row_container_left}>
                    <div className={style.main_info_title_container}>専門:</div>
                    <div className={style.main_info_title_contents_container}><div className={style.main_info_text}>a</div></div>
                    </div>
                    <div className={style.main_info_half_row_container}>
                    <div className={style.main_info_title_container}>専門:</div>
                    <div className={style.main_info_title_contents_container}><div className={style.main_info_text}>a</div></div>
                    </div>
                </div>
            </div>
            
            <div className={style.new_arrivals_container}>
                <div className={style.text}>New Arrivals:</div>
            </div>
            <div className={style.buttons_container}>
                <div className={style.btn_bookmark}>Bookmark</div>
                <div className={style.btn_chat}>Chat</div>
            </div>
            <div className={style.detail_info_container}>
                <div className={style.detail_info_row}>
                    <div className={style.title}>Established</div>
                    <div className={style.text}>1962</div>
                </div>

                <div className={style.detail_info_row}>
                    <div className={style.title}>Production Area</div>
                    <div className={style.text}>北陸（Hokuriku）</div>
                </div>

                <div className={style.detail_info_row}>
                    <div className={style.title}>Postal Code</div>
                    <div className={style.text}>9150253</div>
                </div>

                <div className={style.detail_info_row}>
                    <div className={style.title}>Address</div>
                    <div className={style.text}>9-29, nakatsuyama-cho,echizen-city, Fukui</div>
                </div>

                <div className={style.detail_info_row}>
                    <div className={style.title}>Phone Number</div>
                    <div className={style.text}>0778431333</div>
                </div>

                <div className={style.detail_info_row}>
                    <div className={style.title}>Name</div>
                    <div className={style.text}>山下祐三 / yamashita@yamazaki-velvet.com</div>
                </div>

                <div className={style.detail_info_row}>
                    <div className={style.title}>URL</div>
                    <div className={style.text}>https://yamazaki-velvet.com/jp/</div>
                </div>

                <div className={style.detail_info_row}>
                    <div className={style.title}>Specialty</div>
                    <div className={style.text}>https://yamazaki-velvet.com/jp/</div>
                </div>
            </div>
        </div>

    )
}