import React, { useState, useCallback, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import warningIcon from '../../assets/images/icons/warning.svg';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';

const TeacherForm: React.FC = () => {
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const history = useHistory();

  const addNewScheduleItem = useCallback(() => {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  }, [scheduleItems]);

  const setScheduleItemValue = useCallback(
    (position: number, field: string, value: string) => {
      const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
        if (index === position) {
          return { ...scheduleItem, [field]: value };
        }
        return scheduleItem;
      });

      setScheduleItems(updatedScheduleItems);
    },
    [scheduleItems]
  );

  const handleCreateClass = useCallback(
    (e: FormEvent) => {
      // submit
      api
        .post('classes', {
          name,
          avatar,
          whatsapp,
          bio,
          subject,
          cost: Number(cost),
          schedule: scheduleItems,
        })
        .then(() => {
          alert('Cadastro realizado com sucesso');
          history.push('/');
        })
        .catch(() => {
          alert('Erro no cadastro');
        });

      e.preventDefault();
    },
    [avatar, bio, cost, history, name, scheduleItems, subject, whatsapp]
  );

  return (
    <div id='page-teacher-form' className='container'>
      <PageHeader
        title='Que incrível que você quer dar aulas.'
        description='O primeiro passo é preencher esse formulário de inscrição'
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name='name'
              label='Nome completo'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name='avatar'
              label='Avatar'
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input
              name='whatsapp'
              label='WhatsApp'
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <Textarea
              name='bio'
              label='Biografia'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name='subject'
              label='Matéria'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'História', label: 'História' },
              ]}
            />
            <Input
              name='cost'
              label='Custo da sua hora por aula'
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type='button' onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div
                key={`${scheduleItem.week_day + index}`}
                className='schedule-item'
              >
                <Select
                  name='week_day'
                  label='Dia da semana'
                  value={scheduleItem.week_day}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'week_day', e.target.value)
                  }
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda' },
                    { value: '2', label: 'Terça' },
                    { value: '3', label: 'Quarta' },
                    { value: '4', label: 'Quinta' },
                    { value: '5', label: 'Sexta' },
                    { value: '6', label: 'Sábado' },
                  ]}
                />
                <Input
                  name='from'
                  label='Das'
                  type='time'
                  value={scheduleItem.from}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'from', e.target.value)
                  }
                />
                <Input
                  name='to'
                  label='Até'
                  type='time'
                  value={scheduleItem.to}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'to', e.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt='Aviso importante' />
              Importante! <br /> Preencha todos os dados
            </p>
            <button type='submit'>Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
