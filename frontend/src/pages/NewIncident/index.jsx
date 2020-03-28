import React, { useState } from 'react';

import { Link } from 'react-router-dom';

// Api
import api from '../../services/api';

// Styles
import './styles.css';

// Alerts
import Swal from 'sweetalert2'

// Imgs | Icons
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';

export default function NewIncident() {

    const ongId = localStorage.getItem('ongId');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleNewIncident(e) {
        e.preventDefault();

        try {
            const data = {
                title,
                description,
                value
            }
            await api.post('/incidents', data, {
                headers: {
                    Authorization: ongId
                }
            }).then(() => {

                let swalTimerInterval;
                Swal.fire({
                    icon: 'success',
                    title: 'Cadastrado com Sucesso!',
                    timer: 1000,
                    timerProgressBar: true,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                        swalTimerInterval = setInterval(() => {
                            const content = Swal.getContent()
                        }, 100)
                    },
                    onClose: () => {
                        clearInterval(swalTimerInterval)
                    }
                })

            });

        } catch (err) {
            Swal.fire({
                icon: 'error',
                html: 'Não foi possivel Cadastrar o caso!<br>Tente novamente mais Tarde!'
            });

        }

    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" title="Be the Hero!" />

                    <h1>Cadastrar novo Caso</h1>
                    <p>Descreva o Caso <strong>detalhadamente</strong> para encontrar um herói para resolver isso.</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para a home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        type="text"
                        placeholder="Título do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"

                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />


                    <button type="submit" className="button">Cadastrar!</button>
                </form>
            </div>
        </div>
    );
}