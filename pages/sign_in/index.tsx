import { useRef ,useState} from "react";
//import { supabase, emailSignIn,checkUserSignIn } from "../../utils/supabase";
import style from './sign_in.module.css'
import { useUser,useSupabaseClient } from "@supabase/auth-helpers-react";
import { Router,useRouter } from "next/router";
//import ModalOnlyMessage from "../../components/modal_only_message";


const SignIn = () => {

    const router = useRouter();

    const user = useUser();
      
    const supabaseClient = useSupabaseClient();

    const emailRef    = useRef<HTMLInputElement>(null!);
    const passwordRef = useRef<HTMLInputElement>(null!);


    /*
    const [isModalAnimating, setIsModalAnimating] = useState(false);
    const [modalMessage, setModalMessage]         = useState("");

    const showModalMessage = (message : string) => {
        setModalMessage(message);
        setIsModalAnimating(true);
    }*/

    const signInEmail = async ()=>{

        let email = emailRef.current.value;
        let pass  = passwordRef.current.value;

        const { data,error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: pass,
        });

        if(data && data.user && data.session){
            console.log('data',data);
            // alert('sign in');
           router.back();
        }else if(error){

            console.log(error);

           // showModalMessage('The email address or password is incorrect.');
        }

        //console.log('emailSignIn',data);
        /*
        console.log('sign up email btn',email,pass);
        await emailSignIn(email,pass);
        let user =  await checkUserSignIn();
        if(user){
           alert('You are signed in.');
        }else{
           alert('There are some errors');
        }*/
    }

    const resetPassword = async () =>{


        console.log('reset pas word');

        var uri = new URL(window.location.href);
        var redirect_url = uri.protocol + "//" + uri.hostname + ":" + uri.port + "/update_password";

  
        let email = emailRef.current.value;
        if(email)
        {

            alert(redirect_url);


            const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email, {
                redirectTo: redirect_url,
             })
    
             if(data){
                alert("send a email ");
                console.log(data);
             }else{
    
                alert(error);
                console.log(error);
             }
    
        }
        

        
    }

    const signUpTest = ()=>{
       // alert('test!');
    }

    /**
     *  <ModalOnlyMessage isAnimating={isModalAnimating} message={modalMessage} callbackFlag={setIsModalAnimating} isError={true} />

     */

    return (
        <div className={style.all_container}>



            <div className={style.inner_container}>

                <div className={style.title}>Sign In</div>
                <div className={style.form_cotainer}>
                
                    <div className={style.form_row}>
                        <label htmlFor="email">Email:</label>
                        <input type="email" ref={emailRef} name="email" />
                    </div>
                 
                    <div className={style.form_row}>
                        <label htmlFor="password">Password:</label>
                        <input type="password" ref={passwordRef}  name="password" autoComplete="on" />
                    </div>
                    <button onClick={signInEmail} className={style.sign_in}>Sign In</button>

                    <button onClick={resetPassword} className={style.sign_in}>Reset Password</button>
                </div>
            </div>
        </div> 
    )    

}

export default SignIn;