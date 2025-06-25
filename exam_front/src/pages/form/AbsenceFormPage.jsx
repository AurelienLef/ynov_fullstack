import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AbsenceService from '../../services/AbsenceService';
import EmployeService from '../../services/EmployeService';
import './AbsenceFormPage.css';

function AbsenceFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const employeId = queryParams.get('employeId');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [absence, setAbsence] = useState(null);
  const [employe, setEmploye] = useState(null);
  const [employes, setEmployes] = useState([]);
  const isEditMode = !!id;

  const validationSchema = Yup.object({
    date: Yup.date().required('La date est requise'),
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
      date: '',
      employeId: employeId || ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formattedValues = {
          ...values,
          date: values.date ? new Date(values.date).toISOString() : null,
          employe: { id: values.employeId }
        };
        
        delete formattedValues.employeId;
        
        if (isEditMode) {
          const updateData = {
            ...formattedValues,
            id: parseInt(id)
          };
          await AbsenceService.updateAbsence(id, updateData);
        } else {
          await AbsenceService.createAbsence(formattedValues);
        }
        
        if (employeId) {
          navigate(`/employes/view/${employeId}`);
        } else {
          navigate('/absences');
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
    const fetchAbsence = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          const data = await AbsenceService.getAbsenceById(id);
          setAbsence(data);
          
          const formattedData = {
            date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
            employeId: data.employe ? data.employe.id : ''
          };

          formik.setValues(formattedData);
        } catch (err) {
          console.error("Erreur lors du chargement de l'absence:", err);
          setError("Impossible de charger les données de l'absence.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAbsence();
  }, [id, isEditMode]);

  const handleCancel = () => {
    if (employeId) {
      navigate(`/employes/view/${employeId}`);
    } else {
      navigate('/absences');
    }
  };

  return (
    <div className="absence-form-page">
      <div className="form-header">
        <h1>{isEditMode ? 'Modifier l\'absence' : 'Ajouter une absence'}</h1>
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
          <form onSubmit={formik.handleSubmit} className="absence-form">
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
              <label htmlFor="date">Date d'absence *</label>
              <input
                id="date"
                name="date"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
              />
              {formik.touched.date && formik.errors.date ? (
                <div className="error">{formik.errors.date}</div>
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

export default AbsenceFormPage;
