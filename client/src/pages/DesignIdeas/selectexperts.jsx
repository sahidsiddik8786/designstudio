import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductCard.css"; // Ensure you have this CSS file created with the necessary styles
import GoBackButton from "../../components/layout/goback";

const ExpertInList = () => {
  const [expertIns, setExpertIns] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [staffDetails, setStaffDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Fetch expertin values from the API
    const fetchExpertIns = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/staff/expertise/all"
        ); // Adjust the API endpoint as per your setup
        setExpertIns(response.data.data);
      } catch (error) {
        console.error("Error fetching expertin values:", error);
      }
    };

    fetchExpertIns(); // Call the fetch function
  }, []);

  // Fetch staff details when an expertin card is clicked
  const handleClickExpertCard = async (expert) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/staff/expertise/${expert}`
      ); // Adjust the API endpoint as per your setup
      setStaffDetails(response.data.data);
      setSelectedExpert(expert);
    } catch (error) {
      console.error("Error fetching staff details:", error);
    }
    setIsModalVisible(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedExpert(null);
  };
  return (
    <div className="bg-color">
      <GoBackButton />
      <div className="heading">
        Find your needs, Let's chat with our experts
      </div>
      <div className="product-card-row">
        {expertIns.map((expert, index) => (
          <div key={index} className="product-card-column">
            <div
              className={`product-card ${
                selectedExpert === expert ? "selected" : ""
              }`}
              onClick={() => handleClickExpertCard(expert)}
            >
              <div className="product-card-header">
                <h1 className="product-card-title">{expert}</h1>
              </div>
              <div className="product-card-body">
                <p className="product-card-text">{expert.expertin}</p>
                {/* You can add more specific content related to this expertise */}
                <div className="product-card-price">
                  {/* Add specific price or details related to this expertise */}
                </div>
                <button className="product-card-btn">Chat</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedExpert && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => setSelectedExpert(null)}>
              X
            </button>
            <h2 className="staff-details-heading">Chat</h2>
            {staffDetails.map((staff) => (
              <div key={staff._id} className="staff-list-item">
                <img
                  src={
                    staff.avatarUrl ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs3PpQwcNUkQPCzYydPjyCAX3nCKTf6H0L8g&usqp=CAU"
                  }
                  alt=""
                  className="staff-avatar"
                />
                <div>
                  <a
                    href={`/chat/${staff._id}`}
                    className="staff-name"
                  >{`${staff.firstname} ${staff.lastname}`}</a>
                  <div className="staff-message-preview">
                    {staff.lastMessage}
                  </div>
                </div>
                <div className="staff-time">{staff.lastMessageTime}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertInList;
