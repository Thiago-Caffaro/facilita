import { router } from 'expo-router';
import { getCurrentUser } from 'aws-amplify/auth';
import { useEffect } from "react";
import { Amplify } from "aws-amplify";
import useSetUserData from '@/hooks/setUserData';
import amplifyOutputs from '@/amplify_outputs.json';
try {
  Amplify.configure(amplifyOutputs);
} catch {
  console.log("Não foi possivel encontrar o arquivo amplify_outputs.json");
}

export default function loadAndCheckUser() {
  const setUserData = useSetUserData();

  const checkUser = async () =>{
    // Checa se o usuário está logado, caso esteja, redireciona para a tela principal
    try {
      const { signInDetails } = await getCurrentUser();
      console.log("Detalhes do login:", signInDetails);
      router.push("(mainScreen)/main");
    } catch(error: any){
      if(error.name == "UserUnAuthenticatedException" || error.name == "UserNotFoundException"){
        router.push("(telasIniciais)/login");
      } else {
        console.log(error);
      }
    }
    
  }
  // Aqui chamo a função que checa se o usuário está logado uma vez quando o app abre se houver a string de conexão
  
    useEffect(() => {
      if (amplifyOutputs){
        checkUser();
        setUserData();
      }
    }, []);
}
