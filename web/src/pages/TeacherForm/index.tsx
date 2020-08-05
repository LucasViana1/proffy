import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import PageHeader from "../../components/PageHeader";

const TeacherForm: React.FC = () => {
  return (
    <div id="page-teacher-form" className="container">
      <PageHeader title="Que incrível que você quer dar aulas." />
    </div>
  );
};

export default TeacherForm;
