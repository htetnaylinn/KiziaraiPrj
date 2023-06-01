import { useRef, useState } from "react";
import style from '../../components/css/style.module.css'
import { useUser,useSupabaseClient } from "@supabase/auth-helpers-react";


import AlertView from "../../components/alert_view";
//simport ModalOnlyMessage from "../../components/modal_only_message";
import LoadingBar from "../../components/loading_bar/loading_bar";

const SignUp = () => {

    const [alertShow,setAlertShow] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

   // const supabaseClient = useSupabaseClient();
   const supabaseClient = useSupabaseClient();

    const emailRef    = useRef<HTMLInputElement>(null!);
    const passwordRef = useRef<HTMLInputElement>(null!);

    const [isModalAnimating, setIsModalAnimating] = useState(false);
    const [modalMessage, setModalMessage]         = useState("");

    const showModalMessage = (message : string) => {
        setModalMessage(message);
        setIsModalAnimating(true);
    }


    /*
    const signUpEmail = async ()=>{
    　　let email = emailRef.current.value;
    　　let pass  = passwordRef.current.value;
       // console.log('sign up email btn',email,pass);
       let result_bool =  await emailSignUp(email,pass);
       if(result_bool){
        alert('You account has been made.');
       }else{
        alert('There are some erros ');
       }
    }
    */

    // created_at
    // team_name
    // team_founder_id
    // team_admin_id

   

    const signUpEmail = async ()=>{

        let email = emailRef.current.value;
        let pass  = passwordRef.current.value;
        console.log(email,pass);


        setIsLoading(true);

        // console.log('email sign up --- ',email,password);
        const response = await supabaseClient.auth.signUp({
            email: email,
            password: pass,
          }
        );

        console.log(response);

        let { data, error } =response;
    
        // console.log('email sign up',data,error);
        if(!error){  // Supabaseの
            setAlertShow(true);
            setIsLoading(false);
            return true;
        }else{
            console.log(error,data);
        
//            alert('Error');

            setIsLoading(false);
            showModalMessage(error.message);
         
            return false;
        }
    }

    const signUpTest = ()=>{
       // alert('test!');
    }

    /*
    
<ModalOnlyMessage isAnimating={isModalAnimating} message={modalMessage} callbackFlag={setIsModalAnimating} isError={true} />

    */

    return (
        <div className={style.all_container}>
            <div className={style.flex_container}>
                <div className={style.flex_item_w500}>
                    <div className={style.one_line_container}>ユーザー登録</div>
                    <div className={style.form_cotainer}>
                        <div className={style.form_row}>
                            <label className={style.inline_w100} htmlFor="email">Email:</label>
                            <input type="email" ref={emailRef} name="email" />
                        </div>
                        <div className={style.form_row}>
                            <label className={style.inline_w100} htmlFor="password">Password:</label>
                            <input type="password" ref={passwordRef}  name="password" autoComplete="on" />
                        </div>
                        {!isLoading ?
                        <button onClick={signUpEmail} className={style.btn}>登録する</button>
                        :<div className={style.form_row}><LoadingBar/></div>}
                    </div>
                </div>
            </div>

            { alertShow ? <AlertView setAlertShow={setAlertShow} title="" description="We will send you a confirmation email." /> : <></>}
        </div> 
    )
}

export default SignUp;