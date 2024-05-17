import { Text, View, Image } from 'react-native';
import perfilStyle from './perfilStyle.js';
import globalStyles from '../../styles/globalStyles.js';
import { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../../context/auth.js';
import requerirAlunoData from '../../components/requerirDados/requerirDados.js';

function Perfil({navigation}){
    const [dataObj, setDataObj] = useState(null);
    const { matricula } = useContext(AuthContext);

    useEffect(() => {
        requerirAlunoData(matricula).then(data => {
            setDataObj(data);
        });
        
    }, [matricula]);

    return(
        <View id='container' style={perfilStyle.container}>
            <View id='content' style={perfilStyle.info}>
                {dataObj ? (
                    <>
                        <Text>{dataObj.nomeAluno}</Text>
                        <Text>{dataObj.turmaAluno}</Text>
                        <Text>{dataObj.numeroAluno}</Text>
                        <Text>{dataObj.matriculaAluno}</Text>
                    </>
                ) : (
                    <Image source={require('./assets/loading.gif')} style={globalStyles.loadingGif}/>
                )}
            </View>
        </View>
        
    );
};

export default Perfil;
