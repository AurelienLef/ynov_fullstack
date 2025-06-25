import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EmployeService from '../../services/EmployeService';
import '../../components/CandidatForm.css';
import './EmployeFormPage.css';

function EmployeFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [employe, setEmploye] = useState(null);
  const isEditMode = !!id;

  const validationSchema = Yup.object({
    nom: Yup.string().required('Le nom est requis'),
    adresse: Yup.string().required('L\'adresse est requise'),
    email: Yup.string().email('Email invalide').required('L\'email est requis'),
    num_id: Yup.string().required('Le numéro d\'identification est requis'),
    naissance: Yup.date().required('La date de naissance est requise'),
    tel: Yup.string().required('Le numéro de téléphone est requis'),
    poste: Yup.string().required('Le poste est requis'),
    salaire: Yup.string().required('Le salaire est requis'),
    debut: Yup.date().required('La date de début est requise'),
    fin: Yup.date().nullable(),
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
      poste: '',
      salaire: '',
      debut: '',
      fin: '',
      observation: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formattedValues = {
          ...values,
          naissance: values.naissance ? new Date(values.naissance).toISOString() : null,
          debut: values.debut ? new Date(values.debut).toISOString() : null,
          fin: values.fin ? new Date(values.fin).toISOString() : null
        };
        
        if (isEditMode) {
          await EmployeService.updateEmploye(id, formattedValues);
        } else {
          await EmployeService.createEmploye(formattedValues);
        }
        
        navigate('/employes');
      } catch (err) {
        console.error("Erreur lors de l'opération:", err);
        setError("Une erreur est survenue. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    }
  });

  useEffect(() => {
    const fetchEmploye = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          const data = await EmployeService.getEmployeById(id);
          setEmploye(data);
          
          const formattedData = {
            ...data,
            naissance: data.naissance ? new Date(data.naissance).toISOString().split('T')[0] : '',
            debut: data.debut ? new Date(data.debut).toISOString().split('T')[0] : '',
            fin: data.fin ? new Date(data.fin).toISOString().split('T')[0] : ''
          };
          
          formik.setValues(formattedData);
        } catch (err) {
          console.error("Erreur lors du chargement de l'employé:", err);
          setError("Impossible de charger les données de l'employé.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEmploye();
  }, [id, isEditMode]);

  const handleCancel = () => {
    navigate('/employes');
  };

  return (
    <div className="employe-form-page">
      <div className="form-header">
        <h1>{isEditMode ? 'Modifier l\'employé' : 'Ajouter un employé'}</h1>
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
              <label htmlFor="poste">Poste *</label>
              <input
                id="poste"
                name="poste"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.poste}
              />
              {formik.touched.poste && formik.errors.poste ? (
                <div className="error">{formik.errors.poste}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="salaire">Salaire *</label>
              <input
                id="salaire"
                name="salaire"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.salaire}
              />
              {formik.touched.salaire && formik.errors.salaire ? (
                <div className="error">{formik.errors.salaire}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="debut">Date de début *</label>
              <input
                id="debut"
                name="debut"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.debut}
              />
              {formik.touched.debut && formik.errors.debut ? (
                <div className="error">{formik.errors.debut}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="fin">Date de fin *</label>
              <input
                id="fin"
                name="fin"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fin}
              />
              {formik.touched.fin && formik.errors.fin ? (
                <div className="error">{formik.errors.fin}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="observation">Observations</label>
              <textarea
                id="observation"
                name="observation"
                rows="4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.observation}
              ></textarea>
              {formik.touched.observation && formik.errors.observation ? (
                <div className="error">{formik.errors.observation}</div>
              ) : null}
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-submit" disabled={formik.isSubmitting || loading}>
                {formik.isSubmitting ? 'Enregistrement...' : isEditMode ? 'Mettre à jour' : 'Ajouter'}
              </button>
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default EmployeFormPage;
