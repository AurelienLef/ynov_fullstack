import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CongesService from '../../services/CongesService';
import EmployeService from '../../services/EmployeService';
import './CongesFormPage.css';

function CongesFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const employeId = queryParams.get('employeId');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conges, setConges] = useState(null);
  const [employe, setEmploye] = useState(null);
  const [employes, setEmployes] = useState([]);
  const isEditMode = !!id;

  const validationSchema = Yup.object({
    debut: Yup.date().required('La date de début est requise'),
    fin: Yup.date().required('La date de fin est requise')
      .min(Yup.ref('debut'), 'La date de fin doit être après la date de début'),
    employeId: Yup.number().required('L\'employé est requis')
  });

  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const data = await EmployeService.getAllEmployes();
        setEmployes(data);
      } catch (err) {
        console.error("Erreur lors du chargement des employés:", err);
        setError("Impossible de charger la liste des employés.");
      }
    };

    fetchEmployes();
  }, []);

  useEffect(() => {
    const fetchEmploye = async () => {
      if (employeId) {
        try {
          const data = await EmployeService.getEmployeById(employeId);
          setEmploye(data);
        } catch (err) {
          console.error(`Erreur lors du chargement de l'employé ${employeId}:`, err);
          setError("Impossible de charger les données de l'employé.");
        }
      }
    };

    fetchEmploye();
  }, [employeId]);

  const formik = useFormik({
    initialValues: {
      debut: '',
      fin: '',
      employeId: employeId || ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formattedValues = {
          ...values,
          debut: values.debut ? new Date(values.debut).toISOString() : null,
          fin: values.fin ? new Date(values.fin).toISOString() : null,
          employe: { id: values.employeId }
        };
        
        delete formattedValues.employeId;
        
        if (isEditMode) {
          const updateData = {
            ...formattedValues,
            id: parseInt(id)
          };
          await CongesService.updateConges(id, updateData);
        } else {
          await CongesService.createConges(formattedValues);
        }
        
        if (employeId) {
          navigate(`/employes/view/${employeId}`);
        } else {
          navigate('/conges');
        }
      } catch (err) {
        console.error("Erreur lors de l'opération:", err);
        setError("Une erreur est survenue. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    }
  });

  useEffect(() => {
    const fetchConges = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          const data = await CongesService.getCongesById(id);
          setConges(data);
          
          const formattedData = {
            debut: data.debut ? new Date(data.debut).toISOString().split('T')[0] : '',
            fin: data.fin ? new Date(data.fin).toISOString().split('T')[0] : '',
            employeId: data.employe ? data.employe.id : ''
          };
          
          formik.setValues(formattedData);
        } catch (err) {
          console.error("Erreur lors du chargement du congé:", err);
          setError("Impossible de charger les données du congé.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchConges();
  }, [id, isEditMode]);

  const handleCancel = () => {
    if (employeId) {
      navigate(`/employes/view/${employeId}`);
    } else {
      navigate('/conges');
    }
  };

  return (
    <div className="conges-form-page">
      <div className="form-header">
        <h1>{isEditMode ? 'Modifier le congé' : 'Ajouter un congé'}</h1>
        <button onClick={handleCancel} className="btn btn-secondary">
          Annuler
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
        <div className="form-container">
          <form onSubmit={formik.handleSubmit} className="conges-form">
            {!employeId && (
              <div className="form-group">
                <label htmlFor="employeId">Employé *</label>
                <select
                  id="employeId"
                  name="employeId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.employeId}
                >
                  <option value="">Sélectionnez un employé</option>
                  {employes.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.nom}
                    </option>
                  ))}
                </select>
                {formik.touched.employeId && formik.errors.employeId ? (
                  <div className="error">{formik.errors.employeId}</div>
                ) : null}
              </div>
            )}

            {employeId && employe && (
              <div className="selected-employe">
                <span className="label">Employé:</span>
                <span className="value">{employe.nom}</span>
              </div>
            )}

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

export default CongesFormPage;
