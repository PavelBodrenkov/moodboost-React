import './SignUpWeekly.scss'

const SignUpWeekly = () => {
    return(
        <section className="sign-up-weekly">
           <form className="sign-up-weekly__form">
               <h4 className="sign-up-weekly__form_title">Sign up for weekly moodboost</h4>
               <div className="sign-up-weekly__container-input">
                   <input className="sign-up-weekly__form_input" type="email" placeholder="Enter E-mail"/>
                   <button className="sign-up-weekly__form_button">Subscribe</button>
               </div>
           </form>
        </section>
    )
}

export default SignUpWeekly