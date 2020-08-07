import React, { useCallback } from 'react';
import './styles.css';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

export interface Teacher {
  avatar: string;
  bio: string;
  cost: number;
  id: number;
  name: string;
  subject: string;
  whatsapp: string;
}
interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const createNewConnection = useCallback(() => {
    api.post('connections', { user_id: teacher.id });
  }, [teacher.id]);

  return (
    <article className='teacher-item'>
      <header>
        <img src={teacher.avatar} alt='avatar' />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a
          onClick={createNewConnection}
          href={`https://wa.me/${teacher.whatsapp}`}
          target='__blank'
        >
          <img src={whatsappIcon} alt='WhatsApp' />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
