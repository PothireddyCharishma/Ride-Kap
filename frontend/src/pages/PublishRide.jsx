// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "../css/PublishRide.css";

// const PublishRide = () => {
//   const [rideDetails, setRideDetails] = useState({
//     from: "",
//     to: "",
//     seats: 1,
//     price: "",
//     departureDate: new Date(),
//     arrivalDate: new Date(),
//     carDetails: "",
//   });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setRideDetails((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleDateChange = (name, date) => {
//     setRideDetails((prevState) => ({
//       ...prevState,
//       [name]: date,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log("Ride details:", rideDetails);

//     let errors = {};
//     if (!rideDetails.from.trim())
//       errors.from = "Departure location is required";
//     if (!rideDetails.to.trim()) errors.to = "Destination location is required";
//     if (rideDetails.seats <= 0)
//       errors.seats = "Number of available seats is required";
//     if (!rideDetails.price || rideDetails.price <= 0)
//       errors.price = "Price is required";
//     if (!rideDetails.departureDate)
//       errors.departureDate = "Departure date and time are required";
//     if (!rideDetails.arrivalDate)
//       errors.arrivalDate = "Arrival date and time are required";
//     if (!rideDetails.carDetails.trim())
//       errors.carDetails = "Car details are required";

//     setErrors(errors);

//     if (Object.keys(errors).length === 0) {
//       try {
//         const response = await axios.post("/myrides", rideDetails);
//         console.log(response.data);
//         alert("Ride published successfully!");
//         navigate("/account/myrides");
//       } catch (error) {
//         console.error(error);
//         alert("Error publishing ride. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="publish-ride-container">
//       <h1 className="text-3xl text-center p-5 font-bold">
//         {" "}
//         <span className="text-primary"> Publish </span> a{" "}
//         <span className="text-primary"> Ride </span> in Just{" "}
//         <span className="text-primary">Minutes</span>
//       </h1>
//       <div className="publish-ride-form">
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="from">From:</label>
//             <input
//               type="text"
//               id="from"
//               name="from"
//               value={rideDetails.from}
//               onChange={handleChange}
//               className={`form-control ${errors.from ? "is-invalid" : ""}`}
//             />
//             {errors.from && (
//               <div className="invalid-feedback">{errors.from}</div>
//             )}
//           </div>
//           <div className="form-group">
//             <label htmlFor="to">To:</label>
//             <input
//               type="text"
//               id="to"
//               name="to"
//               value={rideDetails.to}
//               onChange={handleChange}
//               className={`form-control ${errors.to ? "is-invalid" : ""}`}
//             />
//             {errors.to && <div className="invalid-feedback">{errors.to}</div>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="seats">Available seats:</label>
//             <input
//               type="number"
//               id="seats"
//               name="seats"
//               value={rideDetails.seats}
//               onChange={handleChange}
//               min="1"
//               className={`form-control ${errors.seats ? "is-invalid" : ""}`}
//             />
//             {errors.seats && (
//               <div className="invalid-feedback">{errors.seats}</div>
//             )}
//           </div>
//           <div className="form-group">
//             <label htmlFor="price">Price:</label>
//             <input
//               type="number"
//               id="price"
//               name="price"
//               value={rideDetails.price}
//               onChange={handleChange}
//               min="0"
//               className={`form-control ${errors.price ? "is-invalid" : ""}`}
//             />
//             {errors.price && (
//               <div className="invalid-feedback">{errors.price}</div>
//             )}
//           </div>
//           <div className="form-group">
//             <label htmlFor="departureDate">Departure Date and Time:</label>
//             <DatePicker
//               selected={rideDetails.departureDate}
//               onChange={(date) => handleDateChange("departureDate", date)}
//               showTimeSelect
//               timeIntervals={15}
//               timeCaption="Time"
//               dateFormat="MMMM d, yyyy h:mm aa"
//               className={`form-control ${
//                 errors.departureDate ? "is-invalid" : ""
//               }`}
//             />
//             {errors.departureDate && (
//               <div className="invalid-feedback">{errors.departureDate}</div>
//             )}
//           </div>
//           <div className="form-group">
//             <label htmlFor="arrivalDate">Arrival Date and Time:</label>
//             <DatePicker
//               selected={rideDetails.arrivalDate}
//               onChange={(date) => handleDateChange("arrivalDate", date)}
//               showTimeSelect
//               timeIntervals={15}
//               timeCaption="Time"
//               dateFormat="MMMM d, yyyy h:mm aa"
//               className={`form-control ${
//                 errors.arrivalDate ? "is-invalid" : ""
//               }`}
//             />
//             {errors.arrivalDate && (
//               <div className="invalid-feedback">{errors.arrivalDate}</div>
//             )}
//           </div>
//           <div className="form-group">
//             <label htmlFor="carDetails">Car Details:</label>
//             <textarea
//               id="carDetails"
//               name="carDetails"
//               rows="2"
//               value={rideDetails.carDetails}
//               onChange={handleChange}
//               className={`form-control ${
//                 errors.carDetails ? "is-invalid" : ""
//               }`}
//             ></textarea>
//             {errors.carDetails && (
//               <div className="invalid-feedback">{errors.carDetails}</div>
//             )}
//           </div>
//           <button type="submit" className="btn btn-primary">
//             Publish Ride
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PublishRide;

import axios from "axios";
import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../UserContext";

const PublishRide = () => {
  const [rideDetails, setRideDetails] = useState({
    from: "",
    to: "",
    seats: 1,
    price: "",
    departure: "",
    arrival: "",
    carDetails: "",
  });
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRideDetails((prevState) => ({
      ...prevState,
      [name]:
        name === "departure" || name === "arrival" ? value.toString() : value,
    }));
  };
  const handleDateChange = (name, date) => {
    setRideDetails((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    let errors = [];
    if (!rideDetails.from.trim()) errors.push("departure location");
    if (!rideDetails.to.trim()) errors.push("destination location");
    if (rideDetails.seats <= 0) errors.push("number of available seats");
    if (!rideDetails.price || rideDetails.price <= 0) errors.push("price");
    const departtime = rideDetails.departure.toString();
    const arrivaltime = rideDetails.arrival.toString();
    if (!departtime.trim()) errors.push("departure time");
    if (!arrivaltime.trim()) errors.push("arrival time");
    if (!rideDetails.carDetails.trim()) errors.push("car details");

    if (errors.length > 0) {
      alert(
        "Please complete the following field(s): " + errors.join(", ") + "."
      );
      return;
    }
    const submitRideDetails = {
      ...rideDetails,
      creator: user._id,
      creatorName: user.name,
      departure: rideDetails.departure.toString(),
      arrival: rideDetails.arrival.toString(),
    };
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    // If all fields are valid, process the form submission
    const { data } = await axios.post("/myrides", submitRideDetails,config);
    // console.log(rideDetails);
    alert("Ride published successfully!");
    setRedirect("/account/myrides");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="flex flex-col items-center p-2">
      <h1 className="text-2xl text-sky font-bold mb-4">
        Publish a Ride in Just Minutes
      </h1>
      <div className="flex flex-col md:flex-row w-full justify-center p-5 border">
        {/* <div className="w-full md:w-1/3 p-4 border mb-4 md:mb-0">
          <div className="border-b pb-4 mb-4">
            <h1>1</h1>
            <h2 className="text-xl font-semibold mb-2">Create your account</h2>
            <p>
              Add your profile picture, a few words about you and your phone
              number to increase trust between members.
            </p>
          </div>
          <div className="border-b pb-4 mb-4">
            <h1 className="text-black text-bold">2</h1>
            <h2 className="text-xl font-semibold mb-2">Publish a ride</h2>
            <p>
              Indicate departure and arrival points, the date of the ride and
              check our recommended price to increase your chances of getting
              your first passengers and ratings.
            </p>
          </div>
          <div>
            <h1 className="text-bold">3</h1>
            <h2 className="text-xl font-semibold mb-2">Enjoy the ride</h2>
            <p>That's how easy it is to start saving on travel costs!</p>
          </div>
        </div> */}
        <div className="w-full md:w-1/3 p-4 border ml-0 md:ml-3">
          <h2 className="text-xl font-semibold mb-2">Create a Ride</h2>
          <form className="space-y-1" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="w-full md:w-1/2">
                <label className="block mb-1" htmlFor="from">
                  From:
                </label>
                <input
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  type="text"
                  id="from"
                  name="from"
                  value={rideDetails.from}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block mb-1" htmlFor="to">
                  To:
                </label>
                <input
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  type="text"
                  id="to"
                  name="to"
                  value={rideDetails.to}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-full md:w-1/2">
                <label className="block mb-1" htmlFor="seats">
                  Available seats:
                </label>
                <input
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  type="number"
                  id="seats"
                  name="seats"
                  value={rideDetails.seats}
                  onChange={handleChange}
                  min="1"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block mb-1" htmlFor="price">
                  Price:
                </label>
                <input
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  type="number"
                  id="price"
                  name="price"
                  value={rideDetails.price}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1" htmlFor="departure">
                Departure Time:
              </label>
              <DatePicker
                selected={rideDetails.departure}
                onChange={(date) => handleDateChange("departure", date)}
                showTimeSelect
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className={`form-control 
                }`}
              />
            </div>
            <div>
              <label className="block mb-1" htmlFor="arrival">
                Arrival Time:
              </label>

              <DatePicker
                selected={rideDetails.arrival}
                onChange={(date) => handleDateChange("arrival", date)}
                showTimeSelect
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className={`form-control 
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="carDetails"
                className="block text-gray-700 font-bold mb-2"
              >
                Car Details
              </label>
              <textarea
                id="carDetails"
                name="carDetails"
                rows="2"
                className="form-textarea w-full border rounded-md px-4 py-2"
                placeholder="Ex: 2020 Silver Toyota Camry, license plate XYZ-1234"
                value={rideDetails.carDetails}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              type="submit"
            >
              Publish Ride
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublishRide;
