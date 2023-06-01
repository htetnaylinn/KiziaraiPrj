import style from './style.module.css';
import { useUserContext} from '../providers/UserContext';

const LangToggle = () => {
    const {selectedLangId,changeSelectedLangId} = useUserContext();

    const changeLangJa = () => {
        console.log('changeLangJa');

        changeSelectedLangId(1);
    }

    const changeLangEn = () => {
        changeSelectedLangId(2);
    }

    const changeLangZh = () => {
        changeSelectedLangId(3);
    }

    return (
        <div className={style.container}>
            <div onClick={changeLangJa} className={style.lang_toggle}>日本語</div>
            <div onClick={changeLangEn} className={style.lang_toggle}>English</div>
            <div onClick={changeLangZh} className={style.lang_toggle}>中文</div>
        </div>
    );
}

export default LangToggle;