import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postTicket } from '../../../redux/mockAPI';
import { CreateFormValid } from '../validations/CreateFormValid';
import css from './style.module.css';

export default function CreateTicketForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [base64, setBase64] = useState('');

  function imageToBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBase64(reader.result);
    };
  }

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: '',
      surname: '',
      age: '',
      tcNo: '',
      address: '',
      details: '',
      file: '',
      ticketNumber: String(new Date().valueOf()),
    },
    onSubmit: (val) => {
      val.file = base64;
      localStorage.setItem('ticketNumber', val.ticketNumber);
      dispatch(postTicket(val));
      navigate('/successful');
      // console.log(val.file);
      // console.log(typeof val.file);
    },
    validationSchema: CreateFormValid,
  });
  return (
    <form className={css.container} onSubmit={handleSubmit}>
      <h1>Create Ticket</h1>

      <main className={css.mainDiv}>
        <div className={css.divHalf}>
          <label htmlFor="name">
            Name {errors.name && <span> {errors.name} </span>}
          </label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            value={values.name}
          />

          <label htmlFor="surname">
            Surname {errors.surname && <span> {errors.surname} </span>}
          </label>
          <input
            name="surname"
            type="text"
            onChange={handleChange}
            value={values.surname}
          />

          <label htmlFor="age">
            Age {errors.age && <span> {errors.age} </span>}
          </label>
          <input
            name="age"
            type="text"
            onChange={handleChange}
            value={values.age}
          />

          <label htmlFor="tcNo">
            TC Kimlik No {errors.tcNo && <span> {errors.tcNo} </span>}
          </label>
          <input
            name="tcNo"
            type="text"
            onChange={handleChange}
            value={values.tcNo}
          />

          <input
            name="file"
            type="file"
            onChange={(event) => imageToBase64(event.target.files[0])}
          />
        </div>

        <div className={css.divHalf2}>
          <label htmlFor="address">
            Address {errors.address && <span> {errors.address} </span>}
          </label>
          <textarea
            className={css.address}
            name="address"
            type="form_id"
            onChange={handleChange}
            value={values.address}
          />

          <label htmlFor="details">
            Ticket Details {errors.details && <span> {errors.details} </span>}
          </label>
          <textarea
            className={css.details}
            name="details"
            type="form_id"
            onChange={handleChange}
            value={values.details}
          />
        </div>
      </main>

      <button type="submit">Send Ticket</button>
    </form>
  );
}
