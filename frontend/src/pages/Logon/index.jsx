import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

// Api
import api from '../../services/api';

// Alerts
import Swal from 'sweetalert2'

// Styles
import './styles.css';

// Imgs | Icons
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import { FiLogIn } from 'react-icons/fi';

export default function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        const data = {
            id
        }


        try {
            const response = await api.post('sessions', data);
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)
            history.push('/profile');
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'ID Incorreto!',
                text: 'Verifique o seu ID de acesso e Tente novamente.',
                footer: '<strong>Se o seu ID de acesso estiver correto, tente novamente mais Tarde!</strong>'
            });
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero!" title="Be the Hero!" />

                <form onSubmit={handleLogin}>
                    <h1>Faça o seu Logon!</h1>

                    <input
                        type="text"
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho Cadastro!
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes!" title="Be the Hero!" />
        </div>
    );
}
