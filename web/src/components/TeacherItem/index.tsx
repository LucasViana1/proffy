import React from "react";
import "./styles.css";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars2.githubusercontent.com/u/50250861?s=460&u=ae06093f9ff8f002958cc0b5098d7103597c2006&v=4"
          alt="avatar"
        />
        <div>
          <strong>Lucas Viana</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        Entusias em tecnologia, busca soluções através da resolução de problemas
        por meio de código
      </p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$ 20,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="WhatsApp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
