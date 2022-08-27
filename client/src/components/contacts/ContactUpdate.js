import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateContact } from "../../actions/contactAction";
import { getContactObj } from "../../services/ contactServices";
import validate from "../../validations/contactValidations";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ShowToastr } from "../../common/Toastr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export const UpdateContact = (props) => {
  const intialContactState = {
    name: "",
    phone: "",
    email: "",
    address: "",
    image: "",
    fav: false,
  };

  const [contact, setContact] = useState(intialContactState);
  const [image, setImage] = useState({});
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();

  //for handling images
  const uploadImage = () => {
    if (!image) {
      setError({
        ...error,
        image: "Couldnot upload images",
      });
      return;
    }
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        setError({
          ...error,
          image: error,
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setContact({ ...contact, image: downloadURL });
        });
      }
    );
  };

  const setImageDetail = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const getContact = (id) => {
    getContactObj(id)
      .then((res) => {
        setContact(res.data[0]);
      })
      .catch((e) => {
        return e;
      });
  };
  useEffect(() => {
    getContact(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContact({
      ...contact,
      [name]: name === "fav" ? !contact.fav : value,
    });
  };

  const saveContact = (e) => {
    e.preventDefault();
    setError(validate(contact));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      const data = {
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        address: contact.address,
        fav: contact.fav,
        image: contact.image,
      };
      dispatch(updateContact(contact.id, data))
        .then((response) => {
          ShowToastr("Contact has been successfully Updated!");
          props.history.push("/");
        })
        .catch((err) => {
          const resMessage =
            (err.response && err.response.data && err.response.data.err) ||
            err.message ||
            err.toString();
          setError(resMessage);
        });
    }
  }, [error]);

  return (
    <div className="contactAdd">
      <div className="container">
        <br></br>
        <form className="contact-form">
          <h1 id="contact-title" className="text-center">
            <FontAwesomeIcon icon={faUserPlus} />
            Update Contact
          </h1>

          <div className="contact-form-group">
            <label className="contact-label" for="name">
              Name<span className="text-dark">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              value={contact.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="text-danger mt-1 ps-2">{error.name}</div>

          <div className="form-group">
            <label className="contact-label" for="email">
              Email<span className="text-dark">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Enter your Email"
              value={contact.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="text-danger mt-1 ps-2">{error.email}</div>
          <div className="form-group">
            <label className="contact-label" for="phone">
                Phone<span className="text-dark">*</span>
            </label>
            <input
            type="text"
            name="phone"
            id="phone"
            className="form-control"
            placeholder="Phone Number"
            value={contact.phone}
            onChange={handleInputChange}
            required
            />
            <div className="text-danger mt-1 ps-3">{error.phone}</div>
          </div>
          <div className="form-group">
            <label className="contact-label" for="email">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="email"
              className="form-control"
              placeholder="Enter your address"
              value={contact.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="contact-label">
              Image<span className="text-dark">*</span>
            </label>
            {contact.image ? (
              <img
                src={contact.image}
                alt="firebase"
                height={"80px"}
                width={"80px"}
              />
            ) : (
              <p></p>
            )}
            <br></br>

            <input
              type="file"
              name="image"
              id="image"
              className="form-control"
              onChange={setImageDetail}
            />
            <div className="text-danger mt-1 ps-2">{error.image}</div>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={uploadImage}
            >
              Update
            </button>
          </div>
          <div class="form-group">
            <label className="contact-label" for="email">
              Favourite
            </label>
            <input
              type="checkbox"
              name="fav"
              value={contact.fav}
              checked={contact.fav}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            {contact.image ? (
              <button
                onClick={saveContact}
                type="submit"
                id="submit"
                className="submit-button"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={saveContact}
                type="submit"
                id="submit"
                className="submit-button"
                disabled="true"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
