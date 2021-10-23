import {getProviders} from "next-auth/react";
import Signin from "../../components/Signin";

const SigninPage = ({providers}) => {
    return (
       <Signin providers={providers} />
    );
};

export default SigninPage;

export const getServerSideProps = async () => {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}