import { useUserContext } from "../providers/UserContext"
import ja from '../../lang/ja'
import en from '../../lang/en'
import zh from '../../lang/zh'

export const useLocaleText = () => {
    const {selectedLangId} = useUserContext();

    const getText = (key) => {
        if(selectedLangId === 1){
            return ja[key];
        }else if(selectedLangId === 2){
            return en[key];
        }else if(selectedLangId === 3){
            return zh[key];
        }else{
            return ja[key];
        }
    }

    return {getText};
}