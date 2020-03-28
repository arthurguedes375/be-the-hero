import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

// Api
import api from '../../services/api';

// Styles
import './styles.css';

// Alerts
import Swal from 'sweetalert2'

// Imgs | Icons
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

        try {
            const response = await api.post("ongs", data);


            const textIdToCopy = response.data.id;
            let textIdToCopy2 = document.createElement("input");
            textIdToCopy2.value = textIdToCopy;
            document.body.appendChild(textIdToCopy2);
            textIdToCopy2.select();
            document.execCommand('copy');
            document.body.removeChild(textIdToCopy2);




            Swal.fire({
                icon: 'success',
                title: 'Cadastrado com Sucesso',
                html: `Seu ID de acesso é: <strong>${response.data.id}</strong> <br>O seu ID de acesso foi copiado para a área de transferência`,
                footer: '<strong>NÃO COMPARTILHE ESTE ID COM NINGUÉM</strong>'
            }).then(() => {


                history.push('/')
            })
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro no Cadastro, Tente novamente.'
            })
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" title="Be the Hero!" />

                    <h1>Cadastro</h1>
                    <p>Faça o seu Cadastro, entre na plataforma e ajude as Pessoas a encontrarem os Casos de sua ONG.</p>
                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Já tenho um Cadastro!
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="button">Cadastrar!</button>
                </form>
            </div>
        </div>
    );
}
