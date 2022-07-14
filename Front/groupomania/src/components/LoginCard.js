import iconLight from "../assets/iconLight.png";
import "../styles/loginCard.css";

const LoginCard = () => {

    return (
        <main className="card_wrapper">
            <img className="card_logo" src={iconLight} alt="logo groupomania" />
            <div className="form_wrapper">
                <h1>Connectez-vous</h1>
                <form className="form" action="">
                    <div className="form_input_wrapper">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required
                            minlength="6" maxlength="20" size="35" />
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" id="password" name="password" required
                            minlength="6" maxlength="40" size="35" />
                        <a href="#">Mot de passe oublié ?</a>
                        <input type="submit" value="Envoyer" />

                        <span>Vous n'avez pas de compte ? <a href="#">Inscrivez-vous</a></span>
                    </div>
                </form>
            </div>


        </main >


    )
}

export default LoginCard