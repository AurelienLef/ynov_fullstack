import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CandidatService from '../../services/CandidatService';
import '../../components/CandidatForm.css';
import './CandidatFormPage.css';

function CandidatFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [candidat, setCandidat] = useState(null);
  const isEditMode = !!id;

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
      nom: '',
      adresse: '',
      email: '',
      num_id: '',
      naissance: '',
      tel: '',
      domaine: '',
      note: '',
      entretien: '',
      observation: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formattedValues = {
          ...values,
          naissance: values.naissance ? new Date(values.naissance).toISOString() : null,
          entretien: values.entretien ? new Date(values.entretien).toISOString() : null
        };
        
        if (isEditMode) {
          await CandidatService.updateCandidat(id, formattedValues);
        } else {
          await CandidatService.createCandidat(formattedValues);
        }
        
        navigate('/candidats');
      } catch (err) {
        console.error("Erreur lors de l'opération:", err);
        setError("Une erreur est survenue. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    }
  });

  useEffect(() => {
    const fetchCandidat = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          const data = await CandidatService.getCandidatById(id);
          setCandidat(data);
          
          const formattedData = {
            ...data,
            naissance: data.naissance ? new Date(data.naissance).toISOString().split('T')[0] : '',
            entretien: data.entretien ? new Date(data.entretien).toISOString().split('T')[0] : ''
          };
          
          formik.setValues(formattedData);
        } catch (err) {
          console.error("Erreur lors du chargement du candidat:", err);
          setError("Impossible de charger les données du candidat.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCandidat();
  }, [id, isEditMode]);

  const handleCancel = () => {
    navigate('/candidats');
  };

  return (
    <div className="candidat-form-page">
      <div className="form-header">
        <h1>{isEditMode ? 'Modifier le candidat' : 'Ajouter un candidat'}</h1>
        <button onClick={handleCancel} className="btn btn-secondary">
          Retour à la liste
        </button>
      </div>

      {loading && !formik.isSubmitting ? (
        <div className="loading-state">
          <p>Chargement des données...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
        </div>
      ) : (
        <div className="candidat-form-container standalone">
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
                onClick={handleCancel}
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Enregistrement...' : isEditMode ? 'Mettre à jour' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default CandidatFormPage;
