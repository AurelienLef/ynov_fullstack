import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';
import { useEffect } from 'react';
import './CandidatForm.css';

Modal.setAppElement('#root');

const CandidatForm = ({ isOpen, onClose, onSubmit, candidat }) => {
  const validationSchema = Yup.object({
    nom: Yup.string().required('Le nom est requis'),
    adresse: Yup.string().required('L\'adresse est requise'),
    email: Yup.string().email('Email invalide').required('L\'email est requis'),
    num_id: Yup.string().required('Le numéro d\'identification est requis'),
    naissance: Yup.date().required('La date de naissance est requise'),
    tel: Yup.string().required('Le numéro de téléphone est requis'),
    domaine: Yup.string().required('Le domaine est requis'),
    note: Yup.string(),
    entretien: Yup.date().nullable(),
    observation: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      nom: candidat?.nom || '',
      adresse: candidat?.adresse || '',
      email: candidat?.email || '',
      num_id: candidat?.num_id || '',
      naissance: candidat?.naissance ? new Date(candidat.naissance).toISOString().split('T')[0] : '',
      tel: candidat?.tel || '',
      domaine: candidat?.domaine || '',
      note: candidat?.note || '',
      entretien: candidat?.entretien ? new Date(candidat.entretien).toISOString().split('T')[0] : '',
      observation: candidat?.observation || ''
    },
    validationSchema,
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        naissance: values.naissance ? new Date(values.naissance).toISOString() : null,
        entretien: values.entretien ? new Date(values.entretien).toISOString() : null
      };
      
      onSubmit(formattedValues);
      formik.resetForm();
    },
    enableReinitialize: true
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      contentLabel={candidat ? "Modifier un candidat" : "Ajouter un candidat"}
    >
      <div className="modal-header">
        <h2>{candidat ? "Modifier un candidat" : "Ajouter un nouveau candidat"}</h2>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
      </div>
      
      <div className="candidat-form-container">
        <form onSubmit={formik.handleSubmit} className="candidat-form">
          <div className="form-group">
            <label htmlFor="nom">Nom complet *</label>
            <input
              id="nom"
              name="nom"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nom}
            />
            {formik.touched.nom && formik.errors.nom ? (
              <div className="error">{formik.errors.nom}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="adresse">Adresse *</label>
            <input
              id="adresse"
              name="adresse"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.adresse}
            />
            {formik.touched.adresse && formik.errors.adresse ? (
              <div className="error">{formik.errors.adresse}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="num_id">Numéro d'identification *</label>
            <input
              id="num_id"
              name="num_id"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.num_id}
            />
            {formik.touched.num_id && formik.errors.num_id ? (
              <div className="error">{formik.errors.num_id}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="naissance">Date de naissance *</label>
            <input
              id="naissance"
              name="naissance"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.naissance}
            />
            {formik.touched.naissance && formik.errors.naissance ? (
              <div className="error">{formik.errors.naissance}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="tel">Téléphone *</label>
            <input
              id="tel"
              name="tel"
              type="tel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tel}
            />
            {formik.touched.tel && formik.errors.tel ? (
              <div className="error">{formik.errors.tel}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="domaine">Domaine d'expertise *</label>
            <input
              id="domaine"
              name="domaine"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.domaine}
            />
            {formik.touched.domaine && formik.errors.domaine ? (
              <div className="error">{formik.errors.domaine}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="note">Note</label>
            <textarea
              id="note"
              name="note"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.note}
            />
          </div>

          <div className="form-group">
            <label htmlFor="entretien">Date d'entretien</label>
            <input
              id="entretien"
              name="entretien"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.entretien}
            />
          </div>

          <div className="form-group">
            <label htmlFor="observation">Observations</label>
            <textarea
              id="observation"
              name="observation"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.observation}
            />
          </div>

          <div className="form-buttons">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Enregistrement...' : candidat ? 'Mettre à jour' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CandidatForm;
