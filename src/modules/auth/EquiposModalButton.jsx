import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import { AxiosClientWithInterceptors } from "../../shared/plugins/axios";
import { useFormik } from "formik";
import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";

function EquiposModalButton(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Agregar Equipo
      </Button>

      <EquiposModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

function EquiposModal(props) {
  const formik = useFormik({
    initialValues: {
      ProfilePhoto: null, // Inicializar con el valor adecuado si es necesario
      name: "",
      description: "",
      fecha: "", // Cambiado a un string en lugar de null
      status: true,
      categoria: 1,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Campo obligatorio"),
      categoria: yup.string().required("Campo obligatorio"),
      description: yup.string().required("Campo obligatorio"),
      fecha: yup.string().required("Campo obligatorio"), // Cambiado a un string
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(formik.values); // Agrega esta línea para depurar

      try {
        const formData = new FormData();
        formData.append("ProfilePhoto", values.ProfilePhoto);
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("fecha", values.fecha);
        formData.append("status", values.status);
        formData.append("categoria", values.categoria);

        const response = await AxiosClientWithInterceptors.post(
          "http://localhost:8080/api-sysstock/equipos/",
          formData
        );

        console.log("Respuesta del servidor:", response);

        if (response.statusCode === 200) {
          // Registro exitoso
          // Puedes manejar la respuesta del servidor según tus necesidades
          console.log("Equipo registrado exitosamente");
          resetForm();

          // Puedes agregar aquí lógica adicional después del registro exitoso
        } else {
          // Error en el registro
          console.error("Hubo un problema al registrar el equipo");
        }
      } catch (error) {
        // Manejo de errores
        console.error("Error al registrar el equipo:", error);

        if (error.response) {
          console.error("Error de servidor:", error.response.data);
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor");
        } else {
          console.error(
            "Error de configuración de la solicitud:",
            error.message
          );
        }
        console.log(values);
        // Puedes agregar aquí lógica adicional para manejar errores según tus necesidades
      }
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue("ProfilePhoto", file);
  };

  const handleDateChange = (date) => {
    console.log("Fecha seleccionada:", date);

    // Asegúrate de que 'date' sea un objeto Date válido
    if (!(date instanceof Date)) {
      // Intenta crear un nuevo objeto Date si es necesario
      date = new Date(date);
    }

    formik.setFieldValue("fecha", date); // Pasa el objeto Date directamente
  };

  

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Añadir equipo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={formik.isValid}
          onSubmit={formik.handleSubmit}
        >
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Seleccionar imagen (.png, .jpg)</Form.Label>
            <Form.Control
              type="file"
              accept=".png, .jpg"
              onChange={handleFileChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Laptop"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="categoria">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Informática"
              name="categoria"
              value={formik.values.categoria}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.categoria}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="..."
              required
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="fecha">
            <Form.Label>Fecha</Form.Label>
            <DatePicker
              placeholderText="MM-DD-YYYY"
              selected={formik.values.fecha}
              onChange={handleDateChange}
              onBlur={formik.handleBlur} // Mantén esto si es necesario
              isInvalid={!!formik.errors.fecha}
              required
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.fecha}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="success" type="submit">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EquiposModalButton;
