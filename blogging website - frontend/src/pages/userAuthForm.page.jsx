import { useRef } from "react";
import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import {Link} from "react-router-dom";
import {Toaster, toast } from "react-hot-toast";

const UserAuthForm = ({type}) =>{
    const authForm = useRef();
    const handleSubmit = (e) =>{
        e.preventDefault();

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

        let form = new FormData(e.currentTarget);
        let formData = {};

        for(let [key, value] of form.entries()){
            formData[key] = value;
        }

           let { fullname, email, password } = formData;


           if(fullname){
        if(fullname.length < 3){
    return toast.error("Fullname must be at least 3 letter long")
   }
}
   if(!email.length){
    return toast.error( "Enter Email")
   }
   if(!emailRegex.test(email)){
    return toast.error("email is invalid")
   }
   console.log("PASSWORD:", password);
   console.log("VALID:", passwordRegex.test(password));
   if(!passwordRegex.test(password)){
    return toast.error("password should be 6 to 20 characters long with a numeric, 1 lowercase, 1 uppercase letters")
   }
   
    }
    return(
        <AnimationWrapper keyValue={type}>
        <section className="h-cover flex items-center justify-center">
            <Toaster />
            <form ref={authForm} onSubmit={handleSubmit} className="w-[80%] max-w-[400px]">
                <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
                    {type == "sign-in"?"welcome back":"join us today"}
                </h1>
                {
                    type != "sign-in"?
                    <InputBox
                    name="fullname"
                    type="text"
                    placeholder="Full Name"
                    icon="fi-rr-user"
                    />
                    :""
                }
                <InputBox
                    name="email"
                    type="email"
                    placeholder="Email"
                    icon="fi-rr-envelope"
                    />
                    <InputBox
                    name="passord"
                    type="password"
                    placeholder="Passwoed"
                    icon="fi-rr-key"
                    />

                    <button className="btn-dark center mt-14"
                    type="submit"
                    >
                        {type.replace("-", " ")}
                    </button>
                    <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black dont-bold">
                        <hr className="w-1/2 border-black"/>
                        <p>or</p>
                        <hr className="w-1/2 border-black"/>
                    </div>
                    <button className="btn-dark flex items-center justify-center gap-4 w-[90%] cemter">
                        <img src={googleIcon} className="w-5"/>
                        continue with google
                    </button>

                    {
                        type == "sign-in" ? 
                        <p className="mt-6 text-dark-gray text-xl text-center">
                            Don't have an account ? 
                            <Link to="/signup" className="underline text-black text-xl ml-1">
                            Join us today
                            </Link>
                        </p>
                        :
                         <p className="mt-6 text-dark-gray text-xl text-center">
                            Already a member ? 
                            <Link to="/signin" className="underline text-black text-xl ml-1">
                            Sign in here.
                            </Link>
                        </p>
                    }
            </form>
        </section>
        </AnimationWrapper>
    )
}
export default UserAuthForm;