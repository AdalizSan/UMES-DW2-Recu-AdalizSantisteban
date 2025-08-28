// controllers/computadoras.controller.js
import { responseSuccess, responseError } from '../helpers/response.helper.js';
import { getDb } from '../configs/mongodb.config.js';
import Joi from 'joi';

const computadorasSchema = Joi.object({
    nombreAlumno: Joi.string().required().messages({
    'string.base': 'El nombre del alumno debe ser una cadena de texto',
    'string.empty': 'El nombre del alumno no puede estar vacío',
    'any.required': 'El nombre del alumno es obligatorio',
    }),
    hertz: Joi.number().min(1).max(5).required().messages({
    'number.base': 'Los hertz deben ser un número',
    'number.min': 'Los hertz deben ser al menos 1',
    'number.max': 'Los hertz no pueden ser más de 5',
    'any.required': 'Los hertz son obligatorios',
    }),
    marcaProcesador: Joi.string().min(5).optional().messages({
    'string.base': 'La marca del procesador debe ser una cadena de texto',
    'string.min': 'La marca del procesador debe tener al menos 5 caracteres',
}),
    ramGB: Joi.number().min(4).max(24).required().messages({
    'number.base': 'La RAM debe ser un número',
    'number.min': 'La RAM debe ser al menos 4GB',
    'number.max': 'La RAM no puede ser más de 24GB',
    'any.required': 'La RAM es obligatoria',
    }),
    marca: Joi.string().min(2).required().messages({
    'string.base': 'La marca debe ser una cadena de texto',
    'string.empty': 'La marca no puede estar vacía',
    'any.required': 'La marca es obligatoria',
    })
});


const getComputadorasHandler = async (req, res) => {
    try {
        const db = getDb();
        const computadoras = await db.collection('computadoras').find().toArray();
        
        if (computadoras.length === 0)
        return res.status(404).json(responseError("No se encontraron computadoras"));

        const response = responseSuccess("Computadoras obtenidas exitosamente", computadoras);

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json(responseError("Error interno del servidor"));
    }
};


const postComputadoraHandler = async (req, res) => {
    const { error } = computadoraSchema.validate(req.body);
    if (error) {
        return res.status(400).json(responseError(error.details[0].message));
    }

    try {
        const db = getDb();
        const existing = await db.collection('computadoras').findOne({ nombreAlumno: req.body.nombreAlumno });
        if (existing) {
        return res.status(409).json(responseError("Computadora con este nombreAlumno ya existe"));
        }

        const result = await db.collection('computadoras').insertOne(req.body);
        const newComputadora = { _id: result.insertedId, ...req.body };

        const response = responseSuccess("Computadora creada exitosamente", newComputadora);
        res.status(201).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json(responseError("Error interno del servidor"));
    }
};

export { 
    getComputadorasHandler,
    postComputadoraHandler
};