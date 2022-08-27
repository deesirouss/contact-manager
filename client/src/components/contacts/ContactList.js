import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../../src/App.css";
import { deleteContacts, retrieveContacts } from "../../actions/contactAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faEye,
  faTrash,
  faHeart,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export const ContactListNew = (props) => {
  const contacts = useSelector((state) => state.contactReducer);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [detail, setDetail] = useState(null);

  const checkLogin = () => {
    const getToken = JSON.parse(localStorage.getItem("user_data"));
    setIsLogin(getToken ? true : false);
  };

  useEffect(() => {
    checkLogin();
    dispatch(retrieveContacts());
  }, []);

  const contactPage = (value) => {
    setDetail(value);
  };
  const removeContact = (value) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this contact",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteContacts(value.id))
          .then(() => {
            props.history.push("/");
            window.location.reload(true);
          })
          .catch((e) => {
            return e;
          });
      }
    });
  };

  //render header
  const renderHeader = () => {
    let headerElement = ["Sn", "name", "email", "phone", "fav", "Action"];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };
  //render body
  
  
  const renderBody = () => {
    console.log(contacts.retreieve_data)
    if (contacts.retreieve_data.length > 0) {
      return (
        contacts.retreieve_data &&
        contacts.retreieve_data.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              
              {item.fav? (
                <td>
                  {" "}
                  <FontAwesomeIcon
                    className="faHeart"
                    icon={faHeart}
                  ></FontAwesomeIcon>
                </td>
              ) : (
                <td></td>
              )}

              <td className="action">
                <button className="button" onClick={() => contactPage(item)}>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="hover:text-red-300"
                  ></FontAwesomeIcon>
                </button>
                <Link to={"/update-contact/" + item.id}>
                  <button className="button">
                    <FontAwesomeIcon
                      icon={faPen}
                      className="hover:text-black-300"
                    >
                      edit
                    </FontAwesomeIcon>
                  </button>
                </Link>
                <button className="button">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="hover:text-black-300"
                    onClick={() => removeContact(item)}
                  ></FontAwesomeIcon>
                </button>
              </td>
            </tr>
          );
        })
      );
    } else {
      return (
        <tr>
          <td colSpan={6} className="text-danger text-center">
            No data available in table
          </td>
        </tr>
      );
    }
  };

  console.log(detail);
  return (
    <div className="d-flex flex-column mt-5">
      <div class="d-flex flex-column">
        {!!contacts.retreieve_data.length ? (
          <Link to="/add-contact">
            <h3 className="contact-add-data ml-5 ps-5 ">
              {" "}
              <button className="btn btn-success">
                <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon>Add
              </button>
            </h3>
          </Link>
        ) : (
          <Link to="/add-contact">
            <h3 className="ml-5 ps-5">
              {" "}
              <button className="contact-add-nodata btn btn-success">
                <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon>Add
              </button>
            </h3>
          </Link>
        )}
      </div>
      <div className="d-flex flex-row">
        <div className="contact-table">
          <div class="d-flex flex-column w-50">
            <table id="contact-list">
              <thead>
                <tr>{renderHeader()}</tr>
              </thead>
              <tbody>{renderBody()}</tbody>
            </table>
          </div>
        </div>

        <div className="detail-page w-25">
          {detail ? (
            <div className="contact-detail">
              <h1 className="text-black">
                Detail
                {detail.fav ? (
                  <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                ) : (
                  <p></p>
                )}
              </h1>

              <hr></hr>
              <p>
                {detail.image ? (
                  <img
                    src={detail.image}
                    alt=""
                    height={"100px"}
                    width={"100px"}
                  />
                ) : (
                  <p></p>
                )}
              </p>
              <p>
                <p>Phone:{detail.phone}</p>
              </p>
              <p>Email:{detail.email}</p>
              <p>Name:{detail.name}</p>
              <p>Address:{detail.address}</p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
